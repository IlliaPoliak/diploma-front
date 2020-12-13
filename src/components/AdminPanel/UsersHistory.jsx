import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Spinner } from '../common/Spinner'
import { getHistories, deleteHistoryById, setHistoryData } from '../../store/historyReducer'
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Pagination from "../common/Pagination/Pagination";
import { setError, setMessage } from "../../store/appReducer";
import { Link } from "react-router-dom";

const UsersList = props => {

    let [loading, setLoading] = useState(false)
    let [page, setPage] = useState(1)
    let [historyId, setHistoryId] = useState(null)
    let [isVisibleModal, setIsVisibleModal] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await props.getHistories(+page)
            setLoading(false)
        }

        loadData()
    }, [page])

    const confirmDelete = async () => {
        props.deleteHistoryById(historyId)
        closeDeleteModal()
    }
    
    const openDeleteModal = (id) => {
        setHistoryId(id)
        setIsVisibleModal(true)
    }
    const closeDeleteModal = () => setIsVisibleModal(false)

    return (
        <>
            <div className='admin_header'>
                <div className='admin_title'>Список історій користувачів</div>
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
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.histories?.data?.map(history => (
                                <tr key={history.id}>
                                    <td>{history.id}</td>
                                    <td>{history.title}</td>
                                    <td>{history.comment}</td>
                                    <td className='actions_wrapper'>
                                        <Link to={'/content/history/' + history.id}>
                                            <AiOutlineEye className='action' onClick={() => props.setHistoryData(history)} />
                                        </Link>
                                        <AiOutlineDelete className='action' onClick={() => openDeleteModal(history.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <Pagination
                    currentPage={page}
                    handlePageNumberClick={page => setPage(page)}
                    pageSize={10}
                    totalItemsCount={props.histories?.total}
                />
            </div>

            { isVisibleModal &&
                <div className='update_user_modal'>
                    <div className='auth-block'>
                        <span className='close_modal' onClick={closeDeleteModal}>&times;</span>
                        <h3 className='auth-title'>Видалити історію</h3>
                    
                        <input type="button" value='Підтвердити' onClick={confirmDelete} className='auth-btn' />
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    userHistory: state.history.userHistory,
    histories: state.history.histories,
})

const mapDispatchToProps = {
    getHistories,
    setHistoryData,
    deleteHistoryById,
    setError,
    setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)