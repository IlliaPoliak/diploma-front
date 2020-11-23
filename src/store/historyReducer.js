import { instance } from "../api/api";
import { setError, setMessage } from "./appReducer";
import { getToken } from "./authReducer";

let initialState = {
    userHistory: [],
    histories: [],
    historyData: []
}

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case HISTORIES: return { ...state, histories: action.payload }
        case USER_HISTORY: return { ...state, userHistory: action.payload }
        case HISTORY_DATA: return { ...state, historyData: {...action.payload, data: JSON.parse(action.payload.data) } }
        
        default: return state;
    }
}

const HISTORIES = 'historyReducer/HISTORIES'
const USER_HISTORY = 'historyReducer/USER_HISTORY'
const HISTORY_DATA = 'historyReducer/HISTORY_DATA'

const setHistories = array => ({ type: HISTORIES, payload: array })
const setUserHistory = array => ({ type: USER_HISTORY, payload: array })
export const setHistoryData = array => ({ type: HISTORY_DATA, payload: array })

export const getHistories = (page = 1, perPage = 10) => async dispatch => {
    try {
        let response = await instance.get(`history/all?page=${page}&perPage=${perPage}`).then(res => res.data)

        if (response?.data) {
            dispatch(setHistories(response))

            return true
        }
        return false
    } catch(e){
        console.log(e.response)
    }
}

export const getUserHistory = (user_id) => async dispatch => {
    try {
        let response = await instance.get(`history/${user_id}`).then(res => res.data)

        if (response) {
            dispatch(setUserHistory(response))

            return true
        }
        return false
    } catch(e){
        console.log(e.response)
    }
}

export const deleteHistoryById = (id) => async dispatch => {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        let response = await instance.delete(`history/${id}`).then(res => res.data)

        if (response?.status === 'success') {
            dispatch(getHistories())
            dispatch(setMessage('Історія видалена'))
            return true
        }
        return false
    } catch(e){
        console.log(e.response)
        dispatch(setError('Сталася помилка'))
    }
}

export const addUserHistory = (user_id, title, data, comment, array) => async dispatch => {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        const formData = {
            user_id,
            title,
            comment,
            data,
            array
        }
        let response = await instance.post(`history/add`, formData).then(res => res.data)

        if (response?.status === 'success') {
            console.log(response)
            dispatch(setMessage('Дані збережено'))
            // dispatch(getHistories())
            return true
        }
        return false
    } catch(e){
        console.log(e.response)
    }
}

export const clearUserHistory = (user_id) => async dispatch => {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        let response = await instance.post(`history/clear?user_id=${user_id}`).then(res => res.data)

        if (response?.status === 'success') {
            dispatch(getHistories())
            dispatch(getUserHistory(user_id))
            dispatch(setMessage('Історія очищена'))
            return true
        }
        return false
    } catch(e){
        console.log(e.response)
        dispatch(setError('Сталася помилка'))
    }
}