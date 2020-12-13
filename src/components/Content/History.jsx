import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Spinner } from '../common/Spinner'
import { getUserHistory, deleteHistoryById, clearUserHistory, setHistoryData } from '../../store/historyReducer'
import { AiOutlineDelete, AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { setError, setMessage } from "../../store/appReducer";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";


const History = props => {

    let [loading, setLoading] = useState(false)
    let [historyId, setHistoryId] = useState(null)
    let [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false)
    let [isVisibleClearModal, setIsVisibleClearModal] = useState(false)

    const loadData = async () => {
        setLoading(true)
        await props.getUserHistory(props.user?.id)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])


    const confirmDelete = async () => {
        closeDeleteModal()
        await props.deleteHistoryById(historyId)
        loadData()
    }
    
    const openDeleteModal = (id) => {
        setHistoryId(id)
        setIsVisibleDeleteModal(true)
    }
    const closeDeleteModal = () => setIsVisibleDeleteModal(false)


    const confirmClear = async () => {
        closeClearModal()
        await props.clearUserHistory(props.user?.id)
        loadData()
    }
    
    const openClearModal = (id) => setIsVisibleClearModal(true)
    const closeClearModal = () => setIsVisibleClearModal(false)


    const goToHistoryData = (history) => {
        props.setHistoryData(history)
    }

    return (
        <>
            <div className='admin_header'>
                <div className='admin_title'>Історія розрахунків</div>

                <div className='clear_history_btn' onClick={openClearModal}>Очистити історію</div>
            </div>

            <div className='admin_list'>
                {loading ?
                    <Spinner /> :
                    <table className='admin_table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Заголовок</th>
                                <th>Коментар</th>
                                <th>Збережено</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.userHistory?.map(history => (
                                <tr key={history.id}>
                                    <td>{history.id}</td>
                                    <td>{history.title}</td>
                                    <td>{history.comment}</td>
                                    <td>{history.created_at}</td>
                                    <td className='actions_wrapper'>
                                        <Link to={'history/' + history.id}>
                                            <AiOutlineEye className='action' onClick={() => goToHistoryData(history)} />
                                        </Link>

                                        <a href={BASE_URL + history.array_url} target='_blank'>
                                            <AiOutlineDownload className='action' />
                                        </a>

                                        {/* <a href={BASE_URL + history.array_url}>d</a> */}
                                        
                                        <AiOutlineDelete className='action' onClick={() => openDeleteModal(history.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            { isVisibleDeleteModal &&
                <div className='update_user_modal'>
                    <div className='auth-block'>
                        <span className='close_modal' onClick={closeDeleteModal}>&times;</span>
                        <h3 className='auth-title'>Видалити запис із історії</h3>
                    
                        <input type="button" value='Підтвердити' onClick={confirmDelete} className='auth-btn' />
                    </div>
                </div>
            }

            { isVisibleClearModal &&
                <div className='update_user_modal'>
                    <div className='auth-block'>
                        <span className='close_modal' onClick={closeClearModal}>&times;</span>
                        <h3 className='auth-title'>Очистити історію</h3>
                    
                        <input type="button" value='Підтвердити' onClick={confirmClear} className='auth-btn' />
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    userHistory: state.history.userHistory
})

const mapDispatchToProps = {
    getUserHistory,
    deleteHistoryById,
    clearUserHistory,
    setError,
    setMessage,
    setHistoryData
}

export default connect(mapStateToProps, mapDispatchToProps)(History)