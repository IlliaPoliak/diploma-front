
const Results = ({ data, length }) => {

    const renderResultRows = () => {
        let trs = []

        for(let i = 1; i < length; i++){
            trs.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{data.x2[i]}</td>
                    <td>{data.Dvakx2[i]}</td>
                    <td>{data.Sigmax2[i]}</td>
                    <td>{data.px2[i]}</td>
                    <td>{data.taux2[i]}</td>
                </tr>
            )
        }
        
        return trs
    }

    return (
        <div className='fields_block'>
            <div className='block_title'>
                <h2>Результати</h2>
            </div>

            <div id="table_wrapper">
                <table className='results_table'>
                    <thead>
                        <tr>
                            <th>i</th>
                            <th>x, м</th>
                            <th>Dvarkx, МПа</th>
                            <th>Sigmax, MПа</th>
                            <th>рх, МПа</th>
                            <th>taux, МПа</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            renderResultRows()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Results