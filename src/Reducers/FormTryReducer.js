import React from 'react'
import {createActions, handleActions} from "redux-actions";

const ADD_POST = 'ADD_POST';
const ON_POST_WRITING = 'ON_POST_WRITING ';

const initialStateForProfilePage = {
    user: {
        name: 'Yaroslav Klimenkov',
        img: 'https://img02.rl0.ru/b44d3865b62115f36f6c123137605b1f/c615x400/news.rambler.ru/img/weekend/2017/12/25190647.233841.8567.jpg',
        birthday: '29 june',
        city: 'Zlobin',
        education: 'BSUIR',
        webPage: 'https://img02.rl0.ru/b44d3865 '
    },
    currentPostText: null,
};






const profilePageReducer = handleActions(null,
    initialStateForProfilePage);



export default profilePageReducer;