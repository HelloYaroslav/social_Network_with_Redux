import React from 'react'

let initialStateForMusicPage = {
    musicList: [{
        img: '',
        name: 'i want u to tern back',
        song: ''
    }]
};

const musicPageReducer = (state = initialStateForMusicPage, action) => {
    let stateCopy = {
        ...state, musicList: state.musicList.map(el => {
            return {...el}
        })
    };

    switch (state, action) {
        default : {
            return state
        }
    }
};

export default musicPageReducer;