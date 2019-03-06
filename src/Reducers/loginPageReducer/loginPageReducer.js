import {captchaRequest, loginRequest} from "../../axios";
import {setUserInfo} from "../authReducer";
import {handleActions} from "redux-actions";
import {all, call, put, select, takeEvery, fork} from 'redux-saga/effects'
import {
    CHANGE_SUBMITTING_STATUS,
    changeSubmittingStatus,
    FETCH_CAPTCHA,
    LOG_IN,
    RESET_SESSION,
    resetSession,
    SET_CAPTCHA_TO_PAGE,
    SET_MESSAGE_TO_USER,
    setCaptchaToPage,
    setMessageToUser,
    SHOW_DATA_RESPONSE,
    showDataResponse
} from "./actionsForLoginPage";

const initialState = {
    email: null,
    password: null,
    rememberMe: false,
    initialValues: {
        email: 'yaroslav.klimenkovv@gmail.com',
        password: 111,
        rememberMe: false
    },
    submittingStatus: false,
    submittingIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibHqAP3FwWKHm8nxlWUk9aYsbyMveL69OM3Zu_s4Re5HFa7P-',
    serverResponse: {
        messageToUser: null,
        captchaImg: null
    },
    captchaValue: null,
    showDataResponse: false
};


export const getSubmittingStatus = (state) => state.loginPage.submittingStatus;
export const getSubmittingIcon = (state) => state.loginPage.submittingIcon;
export const getMessageToUser = (state) => state.loginPage.serverResponse.messageToUser;
export const getCaptchaImg = (state) => state.loginPage.serverResponse.captchaImg;
export const getShowDataResponse = (state) => state.loginPage.showDataResponse;
const selectLoginData = (state) => state.form.loginForm.values;

const sagaWatchers = [
    takeEvery(FETCH_CAPTCHA, fetchCaptcha),
    takeEvery(LOG_IN, login)
];

function* fetchCaptcha(action) {
    try {
        const response = yield call(captchaRequest, null);
        yield put(setCaptchaToPage(response.data.url));
        yield put(showDataResponse(true));
    } catch (e) {
        console.log('captcha request failed')
    }
}

export function* rootSaga() {
    yield all( [
        takeEvery(FETCH_CAPTCHA, fetchCaptcha),
        takeEvery(LOG_IN, login)
    ]);
}

function* login() {
    yield  put(changeSubmittingStatus());
    const {email, password, rememberMe, captchaValue} = yield select(selectLoginData);
    try {
        const response = yield call(loginRequest,email, password, rememberMe, captchaValue);
        yield call(processLoginResponse, response)
    } catch (e) {
        console.log('something get wrong in *login()',e)
    }
    yield  put(changeSubmittingStatus());
}


function* processLoginResponse(response) {
    if (response.status === 200) {
        switch (response.data.resultCode) {
            case 0 : {
                yield put(setUserInfo(response.data.data.id));
                yield put(resetSession());
                break
            }
            case 1 : {
                yield put(setMessageToUser(response.data.messages.join(' ')));
                yield fork(fetchCaptcha);
                break
            }
            case 10: {
                yield put(setMessageToUser(response.data.messages.join(' ')));
                yield fork(fetchCaptcha);
                break
            }
            default : {
            }
        }
    }
}


let loginPageReducer = handleActions({
        [CHANGE_SUBMITTING_STATUS](state) {
            return {...state, submittingStatus: !state.submittingStatus};
        },
        [SET_CAPTCHA_TO_PAGE](state, {payload: {url}}) {

            return {...state, serverResponse: {...state.serverResponse, captchaImg: url}};
        },
        [SHOW_DATA_RESPONSE](state, {payload: {value}}) {

            return {...state, showDataResponse: value};
        },
        [SET_MESSAGE_TO_USER](state, {payload: {message}}) {
            return {...state, serverResponse: {...state.serverResponse, messageToUser: message}};
        },
        [RESET_SESSION](state, action) {
            return {...initialState, submittingStatus: true};
        }
    },
    initialState);

export default loginPageReducer