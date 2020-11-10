import { instance } from "../api/api";

let initialState = {
    initialize: false,
    isAuth: false,
    user: null,
    loading: false,
    error: '',
    message: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE: return { ...state, initialize: action.payload }
        case IS_AUTH:return { ...state, isAuth: action.payload }
        case LOGOUT:return { ...state, isAuth: false, user: null }
        case ERROR: return { ...state, error: action.payload }
        case USER_INFO: return {  ...state, user: action.payload }
        case MESSAGE: return { ...state, message: action.payload }

        default: return state;
    }
}

const INITIALIZE = 'authReducer/INITIALIZE'
const IS_AUTH = 'authReducer/IS_AUTH'
const LOGOUT = 'authReducer/LOGOUT'
const USER_INFO = 'authReducer/USER_INFO'
const LOADING = 'authReducer/LOADING'
const ERROR = 'authReducer/ERROR'
const MESSAGE = 'authReducer/MESSAGE'

export const setIsAuth = bool => ({ type: IS_AUTH, payload: bool })
export const setUserInfo = data => ({ type: USER_INFO, payload: data })
export const setLoading = bool => ({ type: LOADING, payload: bool })
export const setLogout = () => ({ type: LOGOUT })
export const setError = err => ({ type: ERROR, payload: err })
export const setMessage = message => ({ type: MESSAGE, payload: message })
export const setInitialize = bool => ({ type: INITIALIZE, payload: bool })

export const checkAuth = () => async dispatch => {
    dispatch(setInitialize(false))
    const token = getToken()
    console.log('token', token)
    // await dispatch(refreshToken(token)) 
    dispatch(setInitialize(true))
}

// export const refreshToken = token => async dispatch => {
//     try {
//         instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         let response = await instance.post('auth/refresh').then(res => res.data)
//         if (response?.access_token) {
//             setToken(response.access_token)
//             dispatch(setIsAuth(true))
//             console.log('refresh \ntoken: ', response.access_token)
//         } else {
//             dispatch(setIsAuth(false))
//         }
//     } catch (e) {
//         console.log(e.response?.data)
//         dispatch(setIsAuth(false))
//     }
// }

export const registrate = (formData) => async dispatch => {
    try {
        let response = await instance.post('auth/register', formData).then(res => res.data)

        if (response?.status === 'ok') {
            setToken(response.token)
            dispatch(setIsAuth(true))
            console.log('token', response.token)
            return true
        }
        return false
    } catch (e) {
        console.log(e.response.data)
        dispatch(setError('Ошибка регистрации!'))
    }
}

export const login = (formData) => async dispatch => {
    try {
        let response = await instance.post('auth/login', formData).then(res => res.data)

        if (response?.access_token) {
            setToken(response.access_token)
            dispatch(setIsAuth(true))
            console.log('token', response.access_token)
            return true
        }
        return false
    } catch (e) {
        console.log(e.response?.data)
        dispatch(setError('Введены неверные данные!'))
    }
}

export const logout = () => async dispatch => {
    try {
        const token = getToken()
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await instance.get('auth/logout').then(res => res.data)
    } catch (e) { console.log(e.response) }
    
    removeToken()
    dispatch(setLogout())
}

export const getUserInfo = () => async dispatch => {
    try {
        const token = getToken()
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

//         if (response?.access_token) {
//             setToken(response.access_token)
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

//         if (response?.access_token) {
//             setToken(response.access_token)
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

export const getToken = () => {
    return localStorage.getItem('token')
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}