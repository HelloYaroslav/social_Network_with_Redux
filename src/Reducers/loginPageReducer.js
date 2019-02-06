import {captchaRequest, loginRequest} from "../axios";
import {setUserInfo} from "./authReducer";

const initialState = {
    email: undefined,
    password: undefined,
    rememberMe: false,
    submittingStatus: false,
    submittingIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibHqAP3FwWKHm8nxlWUk9aYsbyMveL69OM3Zu_s4Re5HFa7P-',
    serverResponse: {
        messageToUser: undefined,
        captchaImg: undefined
    },
    captchaValue: null,
    showDataResponse: null
};

const ON_EMAIL_CHANGE = '/NETWORK/LOGIN/ON_EMAIL_CHANGE';
const ON_PASSWORD_CHANGE = '/NETWORK/LOGIN/ON_PASSWORD_CHANGE';
const SEND_IS_SAVED = '/NETWORK/LOGIN/SEND_IS_SAVED';
const CHANGE_SUBMITTING_STATUS = '/NETWORK/LOGIN/CHANGE_SUBMITTING_STATUS';
const SET_CAPTCHA_TO_PAGE = '/NETWORK/LOGIN/SET_RESULT_FROM_SERVER';
const SET_DATA_FROM_CAPTCHA = '/NETWORK/LOGIN/SET_DATA_FROM_CAPTCHA';
const SHOW_DATA_RESPONSE = '/NETWORK/LOGIN/SHOW_DATA_RESPONSE';
const SET_MESSAGE_TO_USER = '/NETWORK/LOGIN/SET_MESSAGE_TO_USER';
const RESET_SESSION = '/NETWORK/LOGIN/RESET_SESSION ';

export const setEmail = (email) => {
    return {
        type: ON_EMAIL_CHANGE,
        email
    }
};

export const setIsSave = (isRememberd) => {
    return {
        type: SEND_IS_SAVED,
        isRemembered: isRememberd
    }
};

export const setPassword = (password) => {
    return {
        type: ON_PASSWORD_CHANGE,
        password
    }
};

const changeSubmittingStatus = () => {
    return {
        type: CHANGE_SUBMITTING_STATUS
    }
};

const setCaptchaImg = (url) => {
    return {
        type: SET_CAPTCHA_TO_PAGE,
        url
    }
};

export const setDataFromCaptcha = (value) => {
    return {
        type: SET_DATA_FROM_CAPTCHA,
        value
    }
};

export const showDataResponse = (value) => {
    return {
        type: SHOW_DATA_RESPONSE,
        value
    }
};

const setMessageToUser = (message) => {
    return {
        type: SET_MESSAGE_TO_USER,
        message
    }
};

const resetSession = () => {
    return {
        type: RESET_SESSION
    }
};

export const getCaptcha = () => (dispatch, getState) => {
    captchaRequest().then(response => {
        let state = getState();
        if (response.status === 200) {
            dispatch(setCaptchaImg(response.data.url));
            dispatch(setMessageToUser('enter a captcha'));
            if (!state.loginPage.serverResponse.captchaImg) {
                dispatch(showDataResponse(true));
            }
        }

    })
};


export const login = () => (dispatch, getstate) => {
    let state = getstate();
    let {email = 'yaroslav.klimenkovv@gmail.com', password = '111', rememberMe = true, captchaValue} = state.loginPage; //default values
    dispatch(changeSubmittingStatus());

    loginRequest(email, password, rememberMe, captchaValue).then(response => {
        //debugger;
        if (response.status === 200) {
            switch (response.data.resultCode) {
                case 0 : {
                    dispatch(setUserInfo(response.data.data.id));
                    dispatch(resetSession());
                    break
                }
                case 1 : {
                    dispatch(setMessageToUser(response.data.messages.join(' ')));
                    captchaRequest().then(response => {
                        dispatch(setCaptchaImg(response.data.url));
                    });
                    break
                }
                case 10: {
                    dispatch(setMessageToUser(response.data.messages.join(' ')));
                    captchaRequest().then(response => {
                        dispatch(setCaptchaImg(response.data.url));
                    });
                    break
                }
                default : {
                }
            }
            dispatch(changeSubmittingStatus());
        }
    })

};

const loginPageReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case ON_EMAIL_CHANGE : {
            stateCopy = {...state, email: action.email};
            return stateCopy
        }
        case ON_PASSWORD_CHANGE : {
            stateCopy = {...state, password: action.password};
            return stateCopy
        }
        case CHANGE_SUBMITTING_STATUS : {
            stateCopy = {...state, submittingStatus: !state.submittingStatus};
            return stateCopy
        }
        case SEND_IS_SAVED : {
            stateCopy = {...state, rememberMe: action.isRemembered};
            return stateCopy;
        }
        case SET_CAPTCHA_TO_PAGE : {
            stateCopy = {...state, serverResponse: {...state.serverResponse, captchaImg: action.url}};
            return stateCopy
        }
        case SET_DATA_FROM_CAPTCHA : {
            stateCopy = {...state, captchaValue: action.value};
            return stateCopy;
        }
        case SHOW_DATA_RESPONSE : {
            stateCopy = {...state, showDataResponse: action.value};
            return stateCopy;
        }
        case SET_MESSAGE_TO_USER: {
            stateCopy = {...state, serverResponse: {...state.serverResponse, messageToUser: action.message}};
            return stateCopy;
        }
        case RESET_SESSION: {
            stateCopy = {...initialState, submittingStatus: true};
            return stateCopy;
        }
        default : {
            return state
        }
    }
};

export default loginPageReducer