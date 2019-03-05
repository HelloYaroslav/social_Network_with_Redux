import {captchaRequest, loginRequest} from "../../axios";
import {setUserInfo} from "../authReducer";
import {handleActions} from "redux-actions";
import {
    CHANGE_SUBMITTING_STATUS,
    changeSubmittingStatus,
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
    showDataResponse: null
};


export const getSubmittingStatus = (state) => state.loginPage.submittingStatus;
export const getSubmittingIcon = (state) => state.loginPage.submittingIcon;
export const getMessageToUser = (state) => state.loginPage.serverResponse.messageToUser;
export const getCaptchaImg = (state) => state.loginPage.serverResponse.captchaImg;
export const getShowDataResponse = (state) => state.loginPage.showDataResponse;


export const getCaptcha = () => (dispatch, getState) => {
    captchaRequest().then(response => {
        let state = getState();
        if (response.status === 200) {
            dispatch(setCaptchaToPage(response.data.url, 'ewf'));
            dispatch(setMessageToUser('enter a captcha'));
            if (!state.loginPage.serverResponse.captchaImg) {
                dispatch(showDataResponse(true));
            }
        }

    })
};


export const login = () => (dispatch, getstate) => {
    let state = getstate();
    let {email, password, rememberMe, captchaValue} = state.form.loginForm.values;
    dispatch(changeSubmittingStatus());
    return loginRequest(email, password, rememberMe, captchaValue).then(response => {
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
                        dispatch(setCaptchaToPage(response.data.url));
                    });
                    break
                }
                case 10: {
                    dispatch(setMessageToUser(response.data.messages.join(' ')));
                    captchaRequest().then(response => {
                        dispatch(setCaptchaToPage(response.data.url));
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