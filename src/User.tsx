import React from 'react';
import { UserType } from './App';


function User(props: { user: UserType; }) {
    return (
        <div className="row">
            <div className="team"><span className="team-name">{props.user.teamName}</span> <span className="user-name">@{props.user.userName}</span></div>
            <div className="points"> {parseFloat(props.user.points || "0").toFixed(2)} points</div>
        </div>
    )
}

export default User;