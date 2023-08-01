import './App.css';
import {useEffect, useState, useRef} from "react";
import User from "./User";
import MedianTable from "./components/MedianTable";
import Treevors from "./components/Treevors";
import DraftOrder from "./components/DraftOrder";
const axios = require('axios');

// const store = require('store');


function App() {

    const LEAGUE_ID_2021 = "735219808769003520";
    const LEAGUE_ID_2022 = "846861408397283328";
    const [mappedUsers, setMappedUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [medians2021, setMedians2021] = useState([]);
    const [medians2022, setMedians2022] = useState([]);
    const [matchups2021, setMatchups2021] = useState([]);
    const [matchups2022, setMatchups2022] = useState([]);
    const [treevors, setTreevors] = useState([]);
    const [users, setUsers] = useState([]);
    const [rosters, setRosters] = useState([]);
    const [operation, setOperation] = useState("after")
    const [week, setWeek] = useState(0);
    const textInput = useRef(null);

    const handleWeekChange = (event) => {
        let value = parseInt(event.target.value);
        if (value === "" || isNaN(value)) {
            value = 0;
        }
        if (value > 18) {
            value = value % 10;
        }
        if (value < 0) {
            value = 0
        }
        setWeek(value)
    }

    const updateOperation = (event) => {
        setOperation(event.target.dataset.operation)
    }


    const calculate = async () => {
        switch (operation) {
            case "after":
                calculatePointsScoredAfter();
                break;
            case "before":
                calculatePointsScoredUpToAndIncluding();
                break;
            default:
                console.log("Unknown operation, defaulting to 'after'");
                calculatePointsScoredAfter();
        }
        sortUsers();
    }
    const getUsersAndRosters = async (leagueId) => {
        const users = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/users`);
        const rosters = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
        return {users: users.data, rosters: rosters.data};
    }

    const getMatchups = async (leagueId) => {
        const matchups = []
        for (let i = 1; i <= 18; i++) {
            const matchup = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`);
            matchups.push(matchup.data);
        }
        return matchups;
    }

    const mapUsers = ({users, rosters, matchups}) => {
        const mappedUsers = [];
        for (const user of users) {
            const userId = user.user_id;
            const weeklyPointsScored = [];
            const roster = rosters.find((roster) => {
                return roster.owner_id === userId;
            })
            const rosterId = roster.roster_id
            const userObj = {
                userId,
                userName: user?.display_name,
                teamName: user?.metadata?.team_name,
                weeklyPointsScored,
                rosterId
            }

            //Roster IDs start at 1
            mappedUsers[rosterId - 1] = userObj;

        }

        for (const week of matchups) {
            for (let i = 0; i < mappedUsers.length; i++) {
                mappedUsers[i].weeklyPointsScored.push(week[i].points);
            }
        }
        return mappedUsers;
    }

    const calculatePointsScoredAfter = () => {
        const newMappedUsers = mappedUsers;

        for (const user of newMappedUsers) {
            let points = 0;
            const weeklyPointsScored = user.weeklyPointsScored;
            for (let i = week; i < 17; i++) {
                points += weeklyPointsScored[i]
                user.points = points;
            }
        }
    }

    const calculatePointsScoredUpToAndIncluding = () => {
        const newMappedUsers = mappedUsers;

        for (const user of newMappedUsers) {
            let points = 0;
            user.points = 0;
            const weeklyPointsScored = user.weeklyPointsScored;
            for (let i = 0; i < week; i++) {
                points += weeklyPointsScored[i]
                user.points = points;
            }
        }
    }


    const calculateMedians = (matchups) => {
        const medians = [];
        for (const week of matchups) {
            // find two middle scores
            const sortedWeek = week.sort((a, b) => {
                return a.points - b.points;
            });
            const justBelow = sortedWeek.length / 2;
            const justAbove = sortedWeek.length / 2 - 1;
            const median = (sortedWeek[justBelow].points + sortedWeek[justAbove].points) / 2;
            medians.push(median);
        }
        return medians;
    }


    const sortUsers = () => {
        const users = [...mappedUsers];
        users.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
        setSortedUsers(users);
    }

    const mapData = async () => {
        const {users, rosters} = await getUsersAndRosters(LEAGUE_ID_2022);
        await setUsers(users);
        await setRosters(rosters);
        await setMatchups2021(await getMatchups(LEAGUE_ID_2021));
        await setMatchups2022(await getMatchups(LEAGUE_ID_2022));
        setMappedUsers(mapUsers({users, rosters, matchups: matchups2022}));
    }

    const calculateTreevors = () => {
        //find second highest score
        const matchups = matchups2021.concat(matchups2022)
        const treevors = matchups.map((week, index) => {
            let year = Math.floor(2021 + index/17);
            let weekNumber = index % 18 + 1;
            const sortedWeek = week.sort((a, b) => {
                return b.points - a.points;
            });
            if(weekNumber < 18 && sortedWeek[0].points !==0 && sortedWeek[0].matchup_id === sortedWeek[1].matchup_id) {
                const playerName = mappedUsers.find((user) => {
                    return user.rosterId === sortedWeek[1].roster_id;
                }).userName;
                return {
                    playerName,
                    roster_id: sortedWeek[1].roster_id,
                    points: sortedWeek[1].points,
                    year,
                    week: weekNumber,
                    index
                }
            }
            return false;
        }).filter(Boolean)
        setTreevors(treevors);
    }


    useEffect(() => {
        mapData();

    }, [])

    useEffect(() => {
        textInput.current?.focus();
        calculate();
    }, [mappedUsers, week, operation])
    useEffect(() => {
        if(users.length > 0 && rosters.length > 0 && matchups2022.length > 0) {
            setMappedUsers(mapUsers({users, rosters, matchups: matchups2022}));
        }
    }, [matchups2022])
    useEffect(() => {
        setMedians2021(calculateMedians(matchups2021));
        setMedians2022(calculateMedians(matchups2022));
        if(mappedUsers.length > 0) {
            calculateTreevors()
        }
    }, [mappedUsers, matchups2021, matchups2022])


    return (
        <div className="App">
            <div className="content">
                <div className="points-scored-container">
                    <div className="form-group">
                        <div className="left">
                            {operation === "after" && <span>Points scored after week</span>}
                            {operation === "before" && <span>Points scored before (and including) week</span>}
                            <input type="text" ref={textInput} value={week} onChange={handleWeekChange}/>
                        </div>
                        <div className="right">
                            {operation === "after" &&
                                <span className="fake-link" data-operation="before" onClick={updateOperation}>Switch to before</span>}
                            {operation === "before" && <span className="fake-link" data-operation="after"
                                                             onClick={updateOperation}>Switch to after</span>}
                        </div>
                    </div>
                    {sortedUsers.map((user) => {
                        return <User key={user.userId} user={user} week={week}></User>
                    })}
                </div>
                {/*<DraftOrder users={mappedUsers} matchups={matchups2022}/>*/}
                {/*<MedianTable medians2021={medians2021} medians2022={medians2022}/>*/}
                {/*<Treevors treevors={treevors}/>*/}


            </div>
        </div>
    );
}

export default App;
