
const Results = props => {

    return (
        <div className='fields_block'>
            <div className='block_title'>
                <h2>Результати</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>x, м</th>
                        <th>Dvarkx, МПа</th>
                        <th>Sigmax, MПа</th>
                        <th>рх, МПа</th>
                        <th>taux, МПа</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>8.88</td>
                        <td>520.20</td>
                        <td>-180.22</td>
                        <td>340.32</td>
                        <td>25.99</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Results