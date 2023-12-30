import React from "react";
function DraftOrder(props: { users: any; matchups: any; }) {


    const {users, matchups} = props;
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
