import { useEffect, useState } from "react"
import { controlFields, inputFields, outputFields } from "./fields"
import Results from "./Results"
import Charts from './Chart'
import { connect } from "react-redux"


const HistoryData = props => {

    const inputData = props.historyData.data.inputData
    const resultParams = props.historyData.data.resultParams
    const resultData = props.historyData.data.resultData

    const [data, setData] = useState({
        n: inputData.n,
        Hp: inputData.Hp,
        b: inputData.b,
        R0: inputData.R0,
        ah: inputData.ah,
        Sigmat0: inputData.Sigmat0,
        e: inputData.e,
        h0: inputData.h0,
        h1: inputData.h1,
        Sigmamax: inputData.Sigmamax,
        a1: inputData.a1,
        a2: inputData.a2,
        a3: inputData.a3,
        En: inputData.En,
        Eb: inputData.Eb,
        wb: inputData.wb,
        rm: inputData.rm,
        f: inputData.f,
        af: inputData.af,
        V1: inputData.V1,
        Sigma0: inputData.Sigma0,
        Sigma1: inputData.Sigma1,
    })

    const [result, setResult] = useState({
        data: {
            x2: [],
            Dvakx2: [],
            Sigmax2: [],
            px2: [],
            taux2: [],
        },
        params: {
            lenOfPlasticDef: resultParams.lenOfPlasticDef,
            sumOfLenDef: resultParams.sumOfLenDef,
            anticipation: resultParams.anticipation,
            speedOfWorkingRolls: resultParams.speedOfWorkingRolls,
            mediumPressure: resultParams.mediumPressure,
            rollingForce: resultParams.rollingForce,
            rollingMoment: resultParams.rollingMoment,
            rollingCapacity: resultParams.rollingCapacity,
            setedVoltage: resultParams.setedVoltage,
            calculatedVoltage: resultParams.calculatedVoltage,
            percentageOfDiscrepancy: resultParams.percentageOfDiscrepancy,
            mistake: resultParams.mistake,
        }
    })


    return (
        <div className='calculator_block'>
            <div className='title_wrapper'>
                <h1>Розрахунок процесів холодної тонколистової прокатки</h1>
            </div>

            <div className='input_data'>
                <div className='block_title'>
                    <h2>Вхідні параметри</h2>
                </div>

                <div className='fields_container'>
                    <div className='fields_block'>
                        {
                            inputFields.map(field => {
                                return (
                                    <label key={field.key} className='field_wrapper'>
                                        <span>{field.desc}</span>
                                        <input type="number" name={field.key} value={data[field.key]} readOnly />
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='input_data'>
                <div className='block_title'>
                    <h2>Інтегральні характеристики напружено-деформованого стану (вихідні дані)</h2>
                </div>

                <div className='fields_container'>
                    <div className='fields_block'>
                        {
                            outputFields.map(field => {
                                return (
                                    <label key={field.key} className='field_wrapper'>
                                        <span>{field.desc}</span>
                                        <input type="number" name={field.key} value={result.params?.[field.key] || ''} readOnly />
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='input_data'>
                <div className='block_title'>
                    <h2>Контроль</h2>
                </div>

                <div className='fields_container'>
                    <div className='fields_block'>
                        {
                            controlFields.map(field => {
                                return (
                                    <label key={field.key} className='field_wrapper'>
                                        <span>{field.desc}</span>
                                        <input type="number" name={field.key} value={result.params?.[field.key] || ''} readOnly />
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div style={{ width: '100%' }}>
                <Charts data={resultData} />

                <Results data={resultData} length={resultData.x2.length} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    historyData: state.history.historyData
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryData)