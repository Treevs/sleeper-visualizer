import React, {useState, useEffect} from 'react';


function User(props) {
    const [pointsScored, setPointsScored] = useState(0)



    useEffect(() => {
        // const calculatePointsScored = () => {
        //     let points = 0;
        //     const weeklyPointsScored = props.user.weeklyPointsScored;
        //     // console.log("weeklyPointsScored", weeklyPointsScored)
        //     for (let i=0; i<props.week; i++) {
        //         // console.log("Week", weeklyPointsScored[i])
        //         points += weeklyPointsScored[i]
        //         setPointsScored(points.toFixed(2));
        //     }
        // }
        const calculatePointsScoredAfter = () => {
            let points = 0;
            const weeklyPointsScored = props.user.weeklyPointsScored;
            // console.log("weeklyPointsScored", weeklyPointsScored)
            for (let i=props.week; i<18; i++) {
                // console.log("Week", weeklyPointsScored[i])
                points += weeklyPointsScored[i]
                setPointsScored(points.toFixed(2));
            }
        }
        calculatePointsScoredAfter();
    }, [props])
    return (
        <div>
            <div>{props.user.teamName} (@{props.user.userName}) {pointsScored} points</div>
        </div>
    )
}

export default User;