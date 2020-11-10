import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer';
import { authReducer } from './authReducer';

let rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})


let store = createStore(rootReducer, {}, compose(
    applyMiddleware(thunkMiddleware),
));

export default store;