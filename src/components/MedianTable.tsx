import React from 'react';

function MedianTable(props: { medians2021: any; medians2022: any; medians2023: any; }) {
    const {medians2021, medians2022, medians2023} = props;

    return (
        <div className="median-container">
            <table>
                <thead>
                <tr>
                    <th>Week</th>
                    <th>Median 2021</th>
                    <th>Median 2022</th>
                    <th>Median 2023</th>
                    <th>Change since last year</th>
                </tr>
                </thead>
                <tbody>
                {medians2023.map((median: number, index: number) => {
                        const change = parseFloat((median - medians2022[index]).toFixed(2));
                        let changeJSX;
                        if (median === 0) {
                            changeJSX = <td>N/A</td>
                        } else if (change > 0) {
                            changeJSX = <td className="positive">+{change}</td>
                        } else {
                            changeJSX = <td className="negative">{change}</td>
                        }
                        
                        console.log({median, medians2021, medians2022, medians2023})
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{medians2021[index]?.toFixed(2)}</td>
                                <td>{medians2022[index]?.toFixed(2)}</td>
                                <td>{medians2023[index]?.toFixed(2)}</td>
                                {changeJSX}
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
        </div>
    );
}

export default MedianTable;
