import specialPlayers from '../bills_bengals_players.json'
import {useEffect} from "react";
function DraftOrder(props) {


    const {users, matchups} = props;
    console.log("specialPlayer ids", specialPlayers.ids);
    console.log("matchups", matchups);
    const preAdjustmentMatchups = matchups;
    const postAdjustmentMatchups = matchups;

    useEffect(() => {
        if(preAdjustmentMatchups.length > 0) {
            findAllBillsAndBengals();
        }
    }, [preAdjustmentMatchups]);
    const findAllBillsAndBengals = () => {
        //Find all specialPlayers in week 17
        const specialPlayersInWeek17 = [];
        const week17 = preAdjustmentMatchups[16];
        const week18 = preAdjustmentMatchups[17];
        for (const matchup17 of week17) {
            for (const [index, starterId] of matchup17.starters.entries()) {
                if(specialPlayers.ids.includes(starterId)) {
                    // Replace the week 17 score with the week 18 score.
                    for (const matchup18 of week18) {
                        if(matchup18.starters.includes(starterId)) {
                            matchup17.starters_points[index] = matchup18.players_points[starterId];
                        }
                    }
                }

            }
        }
        console.log("week17", week17);
        //calculate new points

        //calculate playoff winners

        //calculate loser winners

        //calculate draft order

    }

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
