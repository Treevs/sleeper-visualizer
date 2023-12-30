import React, {MouseEventHandler, useEffect, useRef, useState} from "react";
import User from "./User";
import MedianTable from "./components/MedianTable";
import Treevors from "./components/Treevors";

import axios from 'axios';

// const store = require('store');
export type UserType = {
    userId: string,
    userName: string,
    teamName: string,
    weeklyPointsScored: number[],
    points?: string,
    rosterId: number
}

export type SleeperUsers = {
    user_id: string,
    display_name: string,
    metadata: {
        team_name: string
    }
}

export type Roster = {
    owner_id: string,
    roster_id: number
}

export type Matchup = {
    matchup_id: number,
    points: number,
    roster_id: number
}[];

export type Treevor = {
    playerName: string,
    roster_id: number,
    points: number,
    year: number,
    week: number,
    index: number
}

function App() {

    const LEAGUE_ID_2021 = "735219808769003520";
    const LEAGUE_ID_2022 = "846861408397283328";
    const LEAGUE_ID_2023 = "985407521559023616";
    const [mappedUsers, setMappedUsers] = useState<UserType[]>([]);
    const [sortedUsers, setSortedUsers] = useState<UserType[]>([]);
    const [medians2021, setMedians2021] = useState<number[]>([]);
    const [medians2022, setMedians2022] = useState<number[]>([]);
    const [medians2023, setMedians2023] = useState<number[]>([]);
    const [matchups2021, setMatchups2021] = useState<Matchup[]>([]);
    const [matchups2022, setMatchups2022] = useState<Matchup[]>([]);
    const [matchups2023, setMatchups2023] = useState<Matchup[]>([]);
    const [treevors, setTreevors] = useState<Treevor[]>([]);
    const [users, setUsers] = useState<SleeperUsers[]>([]);
    const [rosters, setRosters] = useState([]);
    const [isAfter, setIsAfter] = useState(true)
    const [week, setWeek] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleWeekChange = (event: { target: { value: string; }; }) => {
        let value = parseInt(event.target.value);
        if (isNaN(value)) {
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

    const handleClick: MouseEventHandler<HTMLSpanElement> = () => {
        setIsAfter(!isAfter);
    }


    const calculate = async () => {
        const operation = isAfter ? "after" : "before";
        switch (operation) {
            case "after":
                calculatePointsScoredAfter(mappedUsers);
                break;
            case "before":
                calculatePointsScoredUpToAndIncluding(mappedUsers);
                break;
        }
        sortUsers(mappedUsers);
    }
    const getUsersAndRosters = async (leagueId: string) => {
        const users = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/users`);
        const rosters = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
        return {users: users.data, rosters: rosters.data};
    }

    const getMatchups = async (leagueId: string) => {
        const matchups = []
        for (let i = 1; i <= 18; i++) {
            const matchup = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${i}`);
            matchups.push(matchup.data);
        }
        return matchups;
    }
    const mapUsers = ({users, rosters, matchups}:{
        users: SleeperUsers[];
        rosters: Roster[];
        matchups: Matchup[];
      }) => {
        const mappedUsers = [];
        for (const user of users) {
            const userId = user.user_id;
            const weeklyPointsScored: number[] = [];
            const roster = rosters.find((roster: { owner_id: any; }) => {
                return roster.owner_id === userId;
            })
            const rosterId = roster?.roster_id ?? 0;
            //Roster IDs start at 1
            mappedUsers[rosterId - 1] = {
                userId,
                userName: user?.display_name,
                teamName: user?.metadata?.team_name,
                weeklyPointsScored,
                rosterId
            };

        }

        for (const week of matchups) {
            for (let i = 0; i < mappedUsers.length; i++) {
                mappedUsers[i].weeklyPointsScored.push(week[i].points);
            }
        }
        return mappedUsers;
    }

    const calculatePointsScoredAfter = (mappedUsers: any) => {
        for (const user of mappedUsers) {
            let points = 0;
            const weeklyPointsScored = user.weeklyPointsScored;
            for (let i = week; i < 17; i++) {
                points += weeklyPointsScored[i]
                user.points = points;
            }
        }
    }

    const calculatePointsScoredUpToAndIncluding = (mappedUsers: any) => {
        for (const user of mappedUsers) {
            let points = 0;
            user.points = 0;
            const weeklyPointsScored = user.weeklyPointsScored;
            for (let i = 0; i < week; i++) {
                points += weeklyPointsScored[i]
                user.points = points;
            }
        }
    }


    const calculateMedians = (matchups: Matchup[]) => {
        const medians = [];
        for (const week of matchups) {
            // find two middle scores
            const sortedWeek = week.sort((a: { points: number; }, b: { points: number; }) => {
                return a.points - b.points;
            });
            const justBelow = sortedWeek.length / 2;
            const justAbove = sortedWeek.length / 2 - 1;
            const median = (sortedWeek[justBelow].points + sortedWeek[justAbove].points) / 2;
            medians.push(median);
        }
        return medians;
    }


    const sortUsers = (mappedUsers: UserType[]) => {
        const users = [...mappedUsers];
        users.sort((a, b) => parseFloat(b.points || "0") - parseFloat(a.points || "0"));
        setSortedUsers(users);
    }

    const mapData = async () => {
        const {users, rosters} = await getUsersAndRosters(LEAGUE_ID_2023);
        setUsers(users);
        setRosters(rosters);
        setMatchups2021(await getMatchups(LEAGUE_ID_2021));
        setMatchups2022(await getMatchups(LEAGUE_ID_2022));
        setMatchups2023(await getMatchups(LEAGUE_ID_2023));
        setMappedUsers(mapUsers({users, rosters, matchups: matchups2023}));
    }

    const calculateTreevors = () => {
        const combinedMatchups = [...matchups2021, ...matchups2022, ...matchups2023];

        const treevors = combinedMatchups.flatMap((week, index) => {
            const year = Math.floor(2021 + index / 17);
            const weekNumber = index % 18 + 1;
            const sortedWeek = week.sort((a, b) => b.points - a.points);

            if (
                weekNumber < 18 &&
                sortedWeek[0].points !== 0 &&
                sortedWeek[0].matchup_id === sortedWeek[1].matchup_id
            ) {
                const {roster_id, points} = sortedWeek[1];
                const playerName = mappedUsers.find((user) => user.rosterId === roster_id)?.userName ?? "";

                return {
                    playerName,
                    roster_id,
                    points,
                    year,
                    week: weekNumber,
                    index,
                };
            }

            return [];
        });

        setTreevors(treevors);
    }


    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
        mapData();

    }, [])

    useEffect(() => {
        calculate();
    }, [mappedUsers, week, isAfter])
    useEffect(() => {
        if (users.length > 0 && rosters.length > 0 && matchups2023.length > 0) {
            setMappedUsers(mapUsers({users, rosters, matchups: matchups2023}));
        }
    }, [matchups2023])
    useEffect(() => {
        setMedians2021(calculateMedians(matchups2021));
        setMedians2022(calculateMedians(matchups2022));
        setMedians2023(calculateMedians(matchups2023));
        if (mappedUsers.length > 0) {
            calculateTreevors()
        }
    }, [mappedUsers, matchups2021, matchups2022, matchups2023])


    return (
        <div className="App">
            <div className="content">
                <div className="points-scored-container">
                    <div className="form-group">
                        <div className="left">
                            {isAfter ? <span>Points scored after week</span> :
                                <span>Points scored before (and including) week</span>}
                            <input type="text" ref={inputRef} value={week} onChange={handleWeekChange}/>
                        </div>
                        <div className="right">
                            {isAfter ?
                                <span className="fake-link" data-operation="before" onClick={handleClick}>Switch to before</span> :
                                <span className="fake-link" data-operation="after"
                                      onClick={handleClick}>Switch to after</span>}
                        </div>
                    </div>
                    {sortedUsers.map((user) => {
                        return <User key={user.userId} user={user}></User>
                    })}
                </div>
                {/*<DraftOrder users={mappedUsers} matchups={matchups2022}/>*/}
                <MedianTable medians2021={medians2021} medians2022={medians2022} medians2023={medians2023}/>
                <Treevors treevors={treevors}/>


            </div>
        </div>
    );
}

export default App;
        