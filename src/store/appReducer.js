

let initialState = {
    initialize: false,
    error: '',
    message: ''
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE: return { ...state, initialize: action.payload }
        case ERROR: return { ...state, error: action.payload }
        case MESSAGE: return { ...state, message: action.payload }

        default: return state;
    }
}


const INITIALIZE = 'authReducer/INITIALIZE'
const ERROR = 'authReducer/ERROR'
const MESSAGE = 'authReducer/MESSAGE'

export const setInitialize = bool => ({ type: INITIALIZE, payload: bool })
export const setError = err => ({ type: ERROR, payload: err })
export const setMessage = message => ({ type: MESSAGE, payload: message })
