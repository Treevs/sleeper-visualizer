import React from 'react';


function User(props) {
    return (
        <div className="row">
            <div className="team">{props.user.teamName} (@{props.user.userName})</div>
            <div className="points"> {props.user.points.toFixed(2)} points</div>
        </div>
    )
}

export default User;