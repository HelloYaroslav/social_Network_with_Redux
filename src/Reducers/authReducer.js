import {logOutRequest} from "../axios";

const initialState = {
    userId: '',
    userImg: '',
    isLoggedIn: false,
    logoutProcessingStatus: false,
    logoutImg: 'https://img02.rl0.ru/b44d3865b62115f36f6c123137605b1f/c615x400/news.rambler.ru/img/weekend/2017/12/25190647.233841.8567.jpg'
};

const SET_USER_INFO = 'NETWORK/AUTH/SET_USER_INFO';
const LOGOUT = 'NETWORK/AUTH/LOGOUT';
const RESET_DATA = 'NETWORK/AUTH/RESET_DATA';
const CHANGE_LOGOUT_STATUS = 'NETWORK/AUTH/CHANGE_LOGOUT_STATUS';

export const setUserInfo = (id) => {
    return {
        type: SET_USER_INFO,
        id
    }
};


const resetData = () => {
    return {
        type: RESET_DATA
    }
};

const changeLogoutStatus = () => {
    return {
        type: CHANGE_LOGOUT_STATUS
    }
};

// export const logout = () => (dispatch) => {
//     dispatch(changeLogoutStatus());
//     setTimeout(() => {
//         dispatch(resetData());
//         dispatch(changeLogoutStatus())
//     },2000)
//
// };

export const logout = () => (dispatch) => {
    dispatch(changeLogoutStatus());
    logOutRequest().then(response => {
        if (response.status === 200) {
            switch (response.data.resultCode) {
                case 0 : {
                    dispatch(resetData());
                    dispatch(changeLogoutStatus());
                    break
                }
                case 1 : {
                    debugger
                }

            }
        }
    })
};

const authReducer = (state = initialState, action) => {
    let stateCopy;
    const setUserInfo = (id) => {
        stateCopy.userId = id;
        stateCopy.userImg = 'https://wefiwewef.png';
        stateCopy.isLoggedIn = true;
    };
    const clearUserData = () => {
        stateCopy.userId = '';
        stateCopy.userImg = '';
        stateCopy.isLoggedIn = false;
    };


    switch (action.type) {
        case SET_USER_INFO : {
            stateCopy = {...state};
            setUserInfo(action.id);
            return stateCopy
        }
        case RESET_DATA : {
            stateCopy = {...state};
            clearUserData();
            return stateCopy
        }
        case CHANGE_LOGOUT_STATUS : {
            stateCopy = {...state, logoutProcessingStatus: !state.logoutProcessingStatus};
            return stateCopy
        }
        default : {
            return state
        }
    }
};

export default authReducer