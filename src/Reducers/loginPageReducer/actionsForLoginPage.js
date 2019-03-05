import {createActions} from "redux-actions";

export const CHANGE_SUBMITTING_STATUS = 'CHANGE_SUBMITTING_STATUS';
export const SET_CAPTCHA_TO_PAGE = 'SET_CAPTCHA_TO_PAGE';
export const SHOW_DATA_RESPONSE = 'SHOW_DATA_RESPONSE';
export const SET_MESSAGE_TO_USER = 'SET_MESSAGE_TO_USER';
export const RESET_SESSION = 'RESET_SESSION ';

export const {changeSubmittingStatus, setCaptchaToPage, showDataResponse, setMessageToUser, resetSession} = createActions({
    [CHANGE_SUBMITTING_STATUS]: null,
    [SET_CAPTCHA_TO_PAGE]: (url) => ({url}),
    [SHOW_DATA_RESPONSE]:(value) => ({value}),
    [SET_MESSAGE_TO_USER]:(message) => ({message}),
    [RESET_SESSION]:null

});