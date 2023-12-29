import specialPlayers from '../bills_bengals_players.json'
import {useEffect} from "react";
function DraftOrder(props) {


    const {users, matchups} = props;
    console.log("specialPlayer ids", specialPlayers.ids);
    console.log("matchups", matchups);

    return (
        <div className="draft-container">
            <h1>2023 Draft order</h1>
            <ol>
                <li>Trevor</li>
            </ol>
        </div>
    );
}

export default DraftOrder;
