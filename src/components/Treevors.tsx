import React from 'react';

function Treevors(props: { treevors: any[]; }) {
    return (
        <div className="treevors-container">
            <h1>Treevors</h1>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Week</th>
                        <th>Season</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {props.treevors.map((treevor, index) => {
                        return (
                            <tr key={index}>
                                <td>{treevor.playerName}</td>
                                <td>{treevor.week}</td>
                                <td>{treevor.year}</td>
                                <td>{treevor.points}</td>
                            </tr>
                        );
                    }
                    )}
                </tbody>
            </table>


        </div>
    )
}

export default Treevors
