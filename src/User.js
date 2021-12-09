import React from 'react';


function User(props) {
    return (
        <div className="row">
            <div className="team"><span className="team-name">{props.user.teamName}</span> <span className="user-name">@{props.user.userName}</span></div>
            <div className="points"> {props.user.points.toFixed(2)} points</div>
        </div>
    )
}

export default User;