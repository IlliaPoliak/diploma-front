import { useEffect, useState } from "react"
import { controlFields, inputFields, outputFields } from "./fields"
import Results from "./Results"
import Charts from './Chart'
import { connect } from "react-redux"
import { tabs } from "../../constants"


const HistoryData = props => {

    const inputData = props.historyData.data.inputData
    const resultParams = props.historyData.data.resultParams
    const resultData = props.historyData.data.resultData

    const [activeTab, setActiveTab] = useState(tabs[0])

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

                {activeTab &&
                    <div className='result_wrapper result_page_margin'>

                        <div className='tabs_container'>
                            <h2 className='resultTab'>
                                Результати:
                        </h2>

                            <div className='tabs_wrapper'>
                                {tabs.map((tab, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveTab(tab)}
                                        className={activeTab === tab ? 'tab active_tab' : 'tab'}
                                    >
                                        {tab}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {activeTab === tabs[0] &&
                            <div className='input_data'>
                                <div className='block_title'>
                                    <h2>Інтегральні характеристики напружено-деформованого стану</h2>
                                </div>

                                <div className='fields_container'>
                                    <div className='fields_block'>
                                        {outputFields.map(field => {
                                            return (
                                                <label key={field.key} className='field_wrapper'>
                                                    <span>{field.desc}</span>
                                                    <input type="number" name={field.key} value={result.params?.[field.key] || ''} readOnly />
                                                </label>
                                            )
                                        })}
                                        {controlFields.map(field => {
                                            return (
                                                <label key={field.key} className='field_wrapper'>
                                                    <span>{field.desc}</span>
                                                    <input type="number" name={field.key} value={result.params?.[field.key] || ''} readOnly />
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }

                        {activeTab === tabs[1] &&
                            <div className='data_wrapper'>
                                <Charts data={resultData} />
                            </div>
                        }
                        {activeTab === tabs[2] &&
                            <div className='data_wrapper'>
                                <Results data={resultData} length={resultData.x2.length} />
                            </div>
                        }
                    </div>
                }
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