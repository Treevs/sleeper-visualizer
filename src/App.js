import './App.css';
import {useEffect, useState} from "react";
import User from "./User";
const axios = require('axios');
// const store = require('store');



function App() {

  const [mappedUsers, setMappedUsers] = useState([]);
  const [week, setWeek] = useState(0);

  const handleWeekChange = (week) => {
    setWeek(week.target.value)
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

  useEffect( async () => {
    console.log("Render")
    const {users, rosters} = await getUsersAndRosters("735219808769003520");
    const matchups = await getMatchups("735219808769003520");
    setMappedUsers(mapUsers({users, rosters, matchups}));

  }, [])
  return (
    <div className="App">
      <div>
        <div>Points scored after week</div>
        <input type="text" value={week} onChange={handleWeekChange}/>
      </div>
      {mappedUsers.map((user) => {
        return <User key={user.userId} user={user} week={week}></User>
      })}
    </div>
  );
}

export default App;
