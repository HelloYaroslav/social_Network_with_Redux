import {applyMiddleware, combineReducers, createStore} from "redux";
import profilePageReducer from './Reducers/profilePageReducer'
import dialogPageReducer from './Reducers/dialogPageReducer'
import newsPageReducer from './Reducers/newsPageReducer'
import musicPageReducer from './Reducers/musikPageReducer'
import loginPageReducer, {rootSaga} from "./Reducers/loginPageReducer/loginPageReducer";
import authReducer from "./Reducers/authReducer";
import thunk from 'redux-thunk';
import usersPageReducer from "./Reducers/usersPageReducer";
import {reducer as formReducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';

let superReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogPage: dialogPageReducer,
    newsPage: newsPageReducer,
    musicPage: musicPageReducer,
    loginPage: loginPageReducer,
    authData: authReducer,
    usersPage: usersPageReducer,
    form: formReducer
});

const sagaMidleware = createSagaMiddleware();
let store = createStore(superReducer, applyMiddleware(thunk, sagaMidleware));

sagaMidleware.run(rootSaga);

export default store;