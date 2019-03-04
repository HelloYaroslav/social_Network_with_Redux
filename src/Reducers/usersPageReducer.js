import React from 'react'
import {getUsers} from "../axios";

const initialState = {
    users: null,
    itemsInPage: 4,
    currentPage: 1,
    totalCount: null,
    totalPages: null
};

const FILL_USERS = '/SN/USERSPAGE/FILL_USERS';

const fillUsers = (users, totalCount) => {
    return {
        type: FILL_USERS,
        users,
        totalCount
    }
};

export const getUsersFromServer = () => (dispatch, getState) => {
    let state = getState();
    getUsers(state.usersPage.itemsInPage, state.usersPage.currentPage).then(response => {
        debugger;
        if (response.status === 200) {
            debugger;
            dispatch(fillUsers(response.data.items, response.data.totalCount));
        }
    })
};

const usersPageReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case FILL_USERS : {
            debugger;
            if (!state.users) {
                stateCopy = {
                    ...state,
                    users: [...action.users],
                    currentPage: state.currentPage + 1,
                    totalCount: action.totalCount,
                    totalPages: Math.ceil(action.totalCount / state.itemsInPage)
                };

            } else {
                stateCopy = {
                    ...state,
                    users: [...state.users, ...action.users],
                    currentPage: state.currentPage + 1,
                    totalCount: action.totalCount,
                    totalPages: Math.ceil(action.totalCount / state.itemsInPage)
                };

            }
            return stateCopy;
        }
        default: {
            return state;
        }
    }
};

export default usersPageReducer;