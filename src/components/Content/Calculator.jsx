import { useState } from "react"
import { getResultsArray } from "./Calculate"
import { controlFields, defaultData, inputFields, outputFields } from "./fields"
import Results from "./Results"
import Charts from './Chart'
import { addUserHistory } from "../../store/historyReducer"
import { connect } from "react-redux"
import { validateInput } from "../../utils/validation"
import { setError, setMessage } from "../../store/appReducer"


const Main = props => {

    const [data, setData] = useState({
        n: 100,
        Hp: 0.001,
        b: 1.05,
        R0: 0.25,
        ah: 2,
        Sigmat0: 149.9,
        e: 0.0001,
        h0: 0.00076,
        h1: 0.0005,
        Sigmamax: 645,
        a1: 1295.8,
        a2: -1257.3,
        a3: 548.8,
        En: 100000,
        Eb: 210000,
        wb: 0.3,
        rm: 0.0008,
        f: 0.06,
        af: 0.5,
        V1: 7.3,
        Sigma0: 137,
        Sigma1: 40,
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

    const handleInputChange = e => {
        const field = e.currentTarget
        setData({ ...data, [field.name]: +field.value })
    }

    const getResults = async () => {
        let result = await getResultsArray(data)
        setResult(result)
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
                inputData: data,
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
                        <h2>Вхідні параметри</h2>
                    </div>

                    <div className='fields_container'>
                        <div className='fields_block'>
                            {
                                inputFields.map(field => {
                                    return (
                                        <label key={field.key} className='field_wrapper'>
                                            <span>{field.desc}</span>
                                            <input type="number" onChange={handleInputChange} name={field.key} value={data[field.key]} />
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='calculate_btn_wrapper'>
                    <input type="button" value='Розрахувати' onClick={getResults} />
                </div>

                {
                    result.data.x2.length ?
                        <>
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
                                                        <input type="number" onChange={handleInputChange} name={field.key} value={result.params?.[field.key] || ''} readOnly />
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
                                                        <input type="number" onChange={handleInputChange} name={field.key} value={result.params?.[field.key] || ''} readOnly />
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div style={{ width: '100%' }}>
                                <Charts data={result.data} />

                                <Results data={result.data} length={result.data.x2.length} />
                            </div>

                            <div className='calculate_btn_wrapper'>
                                <input type="button" value='Зберегти результати' onClick={openSaveModal} />
                            </div>
                        </>
                        : null
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)