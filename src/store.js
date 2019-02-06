import {applyMiddleware, combineReducers, createStore} from "redux";
import profilePageReducer from './Reducers/profilePageReducer'
import dialogPageReducer from './Reducers/dialogPageReducer'
import newsPageReducer from './Reducers/newsPageReducer'
import musicPageReducer from './Reducers/musikPageReducer'
import loginPageReducer from "./Reducers/loginPageReducer";
import authReducer from "./Reducers/authReducer";
import thunk from 'redux-thunk';

let superReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer,
    newsPage: newsPageReducer,
    musicPage: musicPageReducer,
    loginPage: loginPageReducer,
    authData: authReducer,
});

let store = createStore(superReducer, applyMiddleware(thunk));


export default store;