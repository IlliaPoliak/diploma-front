import { instance } from "../api/api";
import { getToken } from "./authReducer";

let initialState = {
    users: [],
    usersPagination: null
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_LIST: return { ...state, users: action.payload }
        case USERS_PAGINATION: return { ...state, usersPagination: action.payload }
        
        default: return state;
    }
}

const USERS_LIST = 'adminReducer/USERS_LIST'
const USERS_PAGINATION = 'adminReducer/USERS_PAGINATION'

const setAllUsers = array => ({ type: USERS_LIST, payload: array })
const setUserPaginationInfo = obj => ({ type: USERS_PAGINATION, payload: obj })

export const getUsersList = (search = '', page = 1, perPage = 10) => async dispatch => {
    try {
        let response = await instance.get(`users/all?page=${page}&perPage=${perPage}&search=${search}`).then(res => res.data)

        if (response?.data) {
            dispatch(setAllUsers(response.data))
            dispatch(setUserPaginationInfo(response))

            return true
        }
        return false
    } catch(e){
        console.log(e.response)
    }
}

export const deleteUserById = (id) => async dispatch => {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        let response = await instance.delete(`users/${id}`).then(res => res.data)

        if (response?.status === 'success') {
            dispatch(getUsersList())
            return true
        }
        return false
    } catch(e){
        console.log(e.response)
    }
}

export const updateUserById = (id, name, email) => async dispatch => {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        let response = await instance.put(`users/${id}?name=${name}&email=${email}`).then(res => res.data)

        if (response?.status === 'success') {
            dispatch(getUsersList())
            return true
        }
        return false
    } catch(e){
        console.log(e.response)
    }
}