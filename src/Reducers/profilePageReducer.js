import React from 'react'

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
    posts: [{
        img: 'https://img02.rl0.ru/b44d3865b62115f36f6c123137605b1f/c615x400/news.rambler.ru/img/weekend/2017/12/25190647.233841.8567.jpg',
        text: ` Search for the keywords to learn more about each warning.
                    Provide a valid, navigable address as the href value.
                    Line 11: The href attribute requires a valid value to be accessible. Provide a valid, navigable
                    address as the href value. If you cannot provide a valid href, but still need the element to
                    resemble a link, use a button and change it with appropriate styles. Learn more:
                    https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
                    jsx-a11y/anchor-is-valid
                    Search for the keywords to learn more about each warning.
                    To ignore, add // eslint-disable-next-line to the line before.`,
        key: 1
    }, {
        img: 'https://img02.rl0.ru/b44d3865b62115f36f6c123137605b1f/c615x400/news.rambler.ru/img/weekend/2017/12/25190647.233841.8567.jpg',
        text: `Search for the keywords to learn more about each warning.
                   Provide a valid, navigable address as the href value.
                   avigable address as the href value. If you cannot provide a valid href, but still need`,
        key: 2
    }, {
        img: 'https://img02.rl0.ru/b44d3865b62115f36f6c123137605b1f/c615x400/news.rambler.ru/img/weekend/2017/12/25190647.233841.8567.jpg',
        text: `Search for the keywords to learn more about each warning.
                   Provide a valid, navigable address as the href value.
                   avigable address as the href value. If you cannot provide a valid href, but still need`,
        key: 3
    }],


};

const profilePageReducer = (state = initialStateForProfilePage, action) => {
    let stateCopy = {
        ...state, user: {...state.user}, posts: state.posts.map(el => {
            return {...el}
        })
    };

    const addPost = () => {
        if (stateCopy.currentPostText) {
            stateCopy.posts.push(
                {
                    img: 'https://img02.rl0.ru/b44d3865b62115f36f6c123137605b1f/c615x400/news.rambler.ru/img/weekend/2017/12/25190647.233841.8567.jpg',
                    text: stateCopy.currentPostText
                });
            stateCopy.currentPostText = null
        }
    };

    const onPostWriting = (text) => {
        stateCopy.currentPostText = text;
    };

    switch (action.type) {
        case 'addPost' : {
            addPost();
            return stateCopy
        }
        case 'onPostWriting' : {
            console.log(stateCopy.currentPostText);
            onPostWriting(action.text);
            return stateCopy
        }
        default: {
            return state;
        }
    }
};

export default profilePageReducer;