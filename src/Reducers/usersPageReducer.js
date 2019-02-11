import React from 'react'
import {getUsers} from "../axios";

const initialState = {
    users: null
};

const FILL_USERS = '/SN/USERSPAGE/FILL_USERS';

const fillUsers = (users) => {
    return {
        type: FILL_USERS,
        users
    }
};

export const getUsersFromServer = (count, page) => (dispatch) => {
    getUsers(count, page).then(response => {
        debugger;
        if (response.status === 200) {
            dispatch(fillUsers(response.data.items));
        }
    })
};

const usersPageReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case FILL_USERS : {
            debugger;
            stateCopy = {...state, users: [...action.users]};
            return stateCopy;
        }
        default: {
            return state;
        }
    }
};

export default usersPageReducer;