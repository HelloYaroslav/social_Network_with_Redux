const ADD_MESSAGE = 'NETWORK/DIALOGS/ADD_MESSAGE';
const SET_CURRENT_DIALOG_BY_ID = 'NETWORK/DIALOGS/SET_CURRENT_DIALOG_BY_ID';

//ActionCreators
export function addMessage(text, id) {
    return {
        type: ADD_MESSAGE,
        text,
        id
    }
}

export function setCurrentDialogById(id) {
    return {
        type: SET_CURRENT_DIALOG_BY_ID,
        id
    }
}

const initialStateForDialogPage = {
    currentDialog: null,
    dialogsList:
        [
            {
                id: 1,
                oponent: 'Eugene',
                oponentImg: 'https://imgur.com/I80W1Q0.png',
                masseges: [
                    {
                        myMassege: true,
                        text: `Привет, дорогой Женя`
                    },
                    {
                        myMassege: false,
                        text: `Привет, дорогой Ярослав`
                    },
                    {
                        myMassege: false,
                        text: `Как твои дела`
                    },
                    {
                        myMassege: false,
                        text: `как жизнь`
                    },
                    {
                        myMassege: true,
                        text: `норм`
                    },
                    {
                        myMassege: true,
                        text: `чо`
                    }
                ]
            },
            {
                id: 2,
                oponent: 'Andrey',
                oponentImg: 'http://hotsone.wapath.com/images/ASH3.JPG',
                masseges: [
                    {
                        myMassege: true,
                        text: `my massege 1`
                    }, {
                        myMassege: false,
                        text: `to me massege 1`
                    }, {
                        myMassege: false,
                        text: `to me massege 1`
                    }, {
                        myMassege: false,
                        text: `to me massege 1`
                    }, {
                        myMassege: true,
                        text: `my massege 1`
                    },
                    {
                        myMassege: true,
                        text: `my massege 1 haaaai`
                    }
                ]
            },
            {
                id: 3,
                oponent: 'Sveta',
                oponentImg: 'http://hotsone.wapath.com/images/ASH3.JPG',
                masseges: [
                    {
                        myMassege: false,
                        text: `to me massege 2`
                    }, {
                        myMassege: false,
                        text: `to me massege 2`
                    }, {
                        myMassege: true,
                        text: `my massege 2`
                    }, {
                        myMassege: false,
                        text: `to me massege 2`
                    }, {
                        myMassege: false,
                        text: `to me massege 2`
                    }
                ]
            },
            {
                id: 4,
                oponent: 'Sasha',
                oponentImg: 'http://hotsone.wapath.com/images/ASH3.JPG',
                masseges: [
                    {
                        myMassege: false,
                        text: `to me massege 3`
                    }, {
                        myMassege: false,
                        text: `to me massege 3`
                    }, {
                        myMassege: false,
                        text: `to me massege 3`
                    }
                ]
            }
        ]
};

const dialogPageReducer = (state = initialStateForDialogPage, action) => {
    let stateCopy = {
        ...state,
        dialogsList: state.dialogsList.map(el => {
            return {
                ...el,
                masseges: el.masseges.map(el => {
                    return {...el}
                })
            };
        })
    };

    const setCurrentDialogById = (id) => {
        let ind;
        let dialog = stateCopy.dialogsList.find((el, index) => {
            ind = index;
            return el.id == id
        });

        stateCopy.currentDialog = dialog;
        return ind;
    };

    const addMessage = (text, id) => {
        stateCopy.dialogsList[setCurrentDialogById(id)].masseges.push({
            myMassege: true,
            text
        })
    };


    switch (action.type) {
        case ADD_MESSAGE: {
            addMessage(action.text, action.id);
            return stateCopy;
        }
        case SET_CURRENT_DIALOG_BY_ID: {
            setCurrentDialogById(action.id);
            return stateCopy;
        }
        default: {
            return state;
        }

    }
};

export default dialogPageReducer;