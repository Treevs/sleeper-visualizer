import './App.css';
import {useEffect, useState, useRef} from "react";
import User from "./User";
// import mock from "./mockData.json"
const axios = require('axios');

// const store = require('store');



function App() {

  const [mappedUsers, setMappedUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [operation, setOperation] = useState("after")
  const [week, setWeek] = useState(0);
  const textInput = useRef(null);

  const handleWeekChange = (event) => {
    let value = parseInt(event.target.value);
    if(value === "" || isNaN(value)) {
      value = 0;
    }
    if(value > 18) {
      value = value%10;
    }
    if(value < 0) {
      value = 0
    }
    setWeek(value)
  }

  const updateOperation = (event) => {
    setOperation(event.target.dataset.operation)
  }


  const calculate = async () => {
    switch(operation) {
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
    for(let i = 1; i<=18; i++) {
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
      mappedUsers[rosterId-1] = userObj;

    }

    for (const week of matchups) {
      for (let i=0; i<mappedUsers.length; i++) {
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
      for (let i=week; i<17; i++) {
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

  const sortUsers = () => {
    const users = [...mappedUsers];
    users.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
    setSortedUsers(users);
  }

  const mapData = async () => {
    const {users, rosters} = await getUsersAndRosters("735219808769003520");
    const matchups = await getMatchups("735219808769003520");
    await setMappedUsers(mapUsers({users, rosters, matchups}));
  }


  useEffect( () => {
    mapData();

  }, [])

  useEffect(() => {
    textInput.current?.focus();
    calculate();
  }, [mappedUsers, week, operation])


  return (
    <div className="App">
      <div className="content">
        <div className="form-group">
          <div className="left">
            {operation==="after" && <span>Points scored after week</span>}
            {operation==="before" && <span>Points scored before (and including) week</span>}
            <input type="text" ref={textInput} value={week} onChange={handleWeekChange}/>
          </div>
          <div className="right">
            {operation==="after" && <span className="fake-link" data-operation="before" onClick={updateOperation}>Switch to before</span>}
            {operation==="before" && <span className="fake-link" data-operation="after" onClick={updateOperation}>Switch to after</span>}
          </div>
        </div>
        {sortedUsers.map((user) => {
          return <User key={user.userId} user={user} week={week}></User>
        })}
      </div>
    </div>
  );
}

export default App;
