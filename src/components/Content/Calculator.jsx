import { useState } from "react"
import { getResultsArray } from "./Calculate"
import { controlFields, mainInputFields, specialInputFields, outputFields } from "./fields"
import Results from "./Results"
import Charts from './Chart'
import { addUserHistory } from "../../store/historyReducer"
import { connect } from "react-redux"
import { isPositiveNumber, validateInput } from "../../utils/validation"
import { setError, setMessage } from "../../store/appReducer"
import { tabs } from "../../constants"

const CalculationContainer = props => {

    const [activeTab, setActiveTab] = useState(null)
    const [isOpenedSpecialsInputs, setIsOpenedSpecialInputs] = useState(false)

    const [mainData, setMainData] = useState({
        n: 100,
        Hp: 0.001,
        b: 1.05,
        h0: 0.00076,
        h1: 0.0005,
        f: 0.06,
        V1: 7.3,
        Sigma0: 137,
        Sigma1: 40,
    })

    const [specialData, setSpecialData] = useState({
        R0: 0.25,
        ah: 2,
        Sigmat0: 149.9,
        e: 0.0001,
        Sigmamax: 645,
        a1: 1295.8,
        a2: -1257.3,
        a3: 548.8,
        En: 100000,
        Eb: 210000,
        wb: 0.3,
        rm: 0.0008,
        af: 0.5,
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
            lenOfPlasticDef: '',
            sumOfLenDef: '',
            anticipation: '',
            speedOfWorkingRolls: '',
            mediumPressure: '',
            rollingForce: '',
            rollingMoment: '',
            rollingCapacity: '',
            setedVoltage: '',
            calculatedVoltage: '',
            percentageOfDiscrepancy: '',
            mistake: '',
        },
        array: ''
    })

    const handleMainDataInputChange = e => {
        const field = e.currentTarget
        setMainData({ ...mainData, [field.name]: +field.value })
    }

    const handleSpecialDataInputChange = e => {
        const field = e.currentTarget
        setSpecialData({ ...specialData, [field.name]: +field.value })
    }

    const getResults = async () => {

        let validatedMainData = Object.entries(mainData).every(([key, value]) => isPositiveNumber(value))
        let validatedSpecialData = Object.entries(specialData).every(([key, value]) =>{
            if (key === 'a1' || key === 'a2' || key === 'a3' ) {
                return true
            } else {
                return isPositiveNumber(value)
            }
        })
     
        if (validatedMainData && validatedSpecialData){
            let result = await getResultsArray({ ...mainData, ...specialData })
            setResult(result)
            setActiveTab(result.data.x2.length ? tabs[0] : null)
        } else {
            props.setError("Усі значення повинні бути додатними")
        }
    }


    let [title, setTitle] = useState('')
    let [comment, setComment] = useState('')
    let [isVisibleSaveModal, setIsVisibleSaveModal] = useState(false)

    const openSaveModal = () => setIsVisibleSaveModal(true)
    const closeSaveModal = () => setIsVisibleSaveModal(false)

    const changeTitle = e => setTitle(e.currentTarget.value)
    const changeComment = e => setComment(e.currentTarget.value)

    const saveData = async () => {
        if (!validateInput(title)) {
            props.setError("Треба заповнити заголовок")
        } else if (!validateInput(comment)) {
            props.setError("Треба заповнити коментар")
        } else {
            const allData = {
                inputData: { ...mainData, ...specialData },
                resultData: result.data,
                resultParams: result.params,
            }
            props.addUserHistory(+props.user.id, title, JSON.stringify(allData), comment, result.array)

            setIsVisibleSaveModal(false)
        }
    }

    return (
        <>
            <div className='calculator_block'>
                <div className='title_wrapper'>
                    <h1>Розрахунок процесів холодної тонколистової прокатки</h1>
                </div>

                <div className='input_data'>
                    <div className='block_title'>
                        <h2>Основні вхідні параметри</h2>
                    </div>

                    <div className='fields_container'>
                        <div className='fields_block'>
                            {
                                mainInputFields.map(field => {
                                    return (
                                        <label key={field.key} className='field_wrapper'>
                                            <span>{field.desc}</span>
                                            <div className='symbol'>{field.key} =</div>
                                            <input type="number" onChange={handleMainDataInputChange} name={field.key} value={mainData[field.key]} />
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='block_title' onClick={()=> setIsOpenedSpecialInputs(!isOpenedSpecialsInputs)}>
                        <h2>Спеціальні вхідні параметри <span className={isOpenedSpecialsInputs ? 'arrow arrow_down' : 'arrow arrow_up'}>&#10148;</span></h2>
                    </div>

                    {isOpenedSpecialsInputs &&
                        <div className='fields_container'>
                            <div className='fields_block'>
                                {
                                    specialInputFields.map(field => {
                                        return (
                                            <label key={field.key} className='field_wrapper'>
                                                <span>{field.desc}</span>
                                                <div className='symbol'>{field.key} =</div>
                                                <input type="number" onChange={handleSpecialDataInputChange} name={field.key} value={specialData[field.key]} />
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>

                <div className='calculate_btn_wrapper'>
                    <input type="button" value='Розрахувати' onClick={getResults} />
                </div>

                {activeTab &&
                    <div className='result_wrapper'>

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
                                        })
                                        }
                                        {controlFields.map(field => {
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
                        }

                        {activeTab === tabs[1] &&
                            <div className='data_wrapper'>
                                <Charts data={result.data} />
                            </div>
                        }
                        {activeTab === tabs[2] &&
                            <div className='data_wrapper'>
                                <Results data={result.data} length={result.data.x2.length} />
                            </div>
                        }

                        <div className='calculate_btn_wrapper'>
                            <input type="button" value='Зберегти результати' onClick={openSaveModal} />
                        </div>
                    </div>
                }

            </div>

            { isVisibleSaveModal &&
                <div className='update_user_modal'>
                    <div className='auth-block'>
                        <span className='close_modal' onClick={closeSaveModal}>&times;</span>
                        <h3 className='auth-title'>Зберегти результати в історію</h3>

                        <input type="text" value={title} onChange={changeTitle} className='auth-input' placeholder='Заголовок' />
                        <input type="text" value={comment} onChange={changeComment} className='auth-input' placeholder='Опис' />

                        <input type="button" value='Зберегти' onClick={saveData} className='auth-btn' />
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = {
    addUserHistory,
    setError,
    setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculationContainer)