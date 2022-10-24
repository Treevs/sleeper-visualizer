function MedianTable(props) {
    const {medians2021, medians2022} = props;

    return (
        <div className="median-container">
            <table>
                <thead>
                <tr>
                    <th>Week</th>
                    <th>Median 2021</th>
                    <th>Median 2022</th>
                    <th>Change</th>
                </tr>
                </thead>
                <tbody>
                {medians2022.map((median, index) => {
                        const change = (median - medians2021[index]).toFixed(2);
                        let changeJSX;
                        if (median === 0) {
                            changeJSX = <td>N/A</td>
                        } else if (change > 0) {
                            changeJSX = <td className="positive">+{change}</td>
                        } else {
                            changeJSX = <td className="negative">{change}</td>
                        }
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{medians2021[index].toFixed(2)}</td>
                                <td>{median.toFixed(2)}</td>
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
