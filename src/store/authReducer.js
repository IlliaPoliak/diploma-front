import { instance } from "../api/api";
import { setError, setInitialize } from "./appReducer";

let initialState = {
    isAuth: false,
    user: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH:return { ...state, isAuth: action.payload }
        case LOGOUT:return { ...state, isAuth: false, user: null }
        case USER_INFO: return {  ...state, user: action.payload }

        default: return state;
    }
}

const IS_AUTH = 'authReducer/IS_AUTH'
const LOGOUT = 'authReducer/LOGOUT'
const USER_INFO = 'authReducer/USER_INFO'

export const setIsAuth = bool => ({ type: IS_AUTH, payload: bool })
export const setUserInfo = data => ({ type: USER_INFO, payload: data })
export const setLogout = () => ({ type: LOGOUT })


export const checkAuth = () => async dispatch => {
    dispatch(setInitialize(false))
    await dispatch(refreshToken()) 
    dispatch(setInitialize(true))
}

export const refreshToken = token => async dispatch => {
    try {
        const token = getToken()
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let response = await instance.post('auth/refresh').then(res => res.data)
        if (response?.token) {
            setToken(response.token)
            dispatch(setIsAuth(true))
            console.log('refresh token: ', response.token)
        } else {
            dispatch(setIsAuth(false))
        }
    } catch (e) {
        console.log(e.response?.data)
        dispatch(setIsAuth(false))
    }
}

export const registrate = (name, email, password) => async dispatch => {
    try {
        const formData = {
            name,
            email,
            password
        }
        let response = await instance.post('auth/register', formData).then(res => res.data)

        if (response?.token) {
            setToken(response.token)
            dispatch(setIsAuth(true))
            console.log('register token', response.token)
            return true
        }
        return false
    } catch (e) {
        console.log(e.response.data)
        dispatch(setError('Ошибка регистрации!'))
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const formData = {
            email,
            password
        }
        let response = await instance.post('auth/login', formData).then(res => res.data)

        if (response?.token) {
            setToken(response.token)
            dispatch(setIsAuth(true))
            console.log('login token', response.token)
            return true
        }
        return false
    } catch (e) {
        console.log(e.response?.data)
        dispatch(setError('Введены неверные данные!'))
    }
}

export const logout = () => async dispatch => {
    // try {
    //     const token = getToken()
    //     instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     await instance.get('auth/logout').then(res => res.data)
    // } catch (e) { console.log(e.response) }
    
    removeToken()
    dispatch(setLogout())
}

export const getUserInfo = () => async dispatch => {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        let response = await instance.get('auth/me').then(res => res.data)

        if (response) {
            dispatch(setUserInfo(response))
            console.log('user', response)
            return true
        }
        return false
    } catch (e) {
        console.log(e.response)
    }
}

// export const sendCodeToEmail = email => async dispatch => {
//     try {
//         let response = await instance.post('auth/email/reset-password', { email }).then(res => res.data)

//         if (response) {
//             return true
//         }
//         return false
//     } catch (e) {
//         console.log(e.response?.data)
//         dispatch(setError('Произошла ошибка!'))
//     }
// }

// export const restorePassword = (key, password, password_confirmation) => async dispatch => {
//     try {
//         const formData = {
//             key,
//             password,
//             password_confirmation
//         }

//         let response = await instance.post('auth/email/change-password', formData).then(res => res.data)

//         if (response?.token) {
//             setToken(response.token)
//             dispatch(setIsAuth(true))
//             return true
//         }
//         return false
//     } catch (e) {
//         console.log(e.response?.data)
//         dispatch(setError('Произошла ошибка!'))
//     }
// }

// export const updatePassword = (password, newPassword, confirmNewPassword) => async dispatch => {
//     try {
//         const formData = {
//             password: password,
//             password_new: newPassword,
//             password_new_confirmation: confirmNewPassword
//         }

//         const token = getToken()
//         instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         let response = await instance.post('auth/update-password', formData).then(res => res.data)

//         if (response?.token) {
//             setToken(response.token)
//             dispatch(setIsAuth(true))
//             return true
//         }
//         return false
//     } catch (e) {
//         console.log(e.response?.data)
//         dispatch(setError('Произошла ошибка!'))
//     }
// }

// export const updateUserInfo = formData => async dispatch => {
//     try {
//         let response = await instance.post('auth/update', formData).then(res => res.data)

//         if (response) {
//             dispatch(getUserInfo())
//             return true
//         }
//         return false
//     } catch (e) {
//         console.log(e.response?.data)
//         dispatch(setError('Произошла ошибка!'))
//     }
// }

export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token) {
    localStorage.setItem('token', token)
}

export function removeToken() {
    localStorage.removeItem('token')
}