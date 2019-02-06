import React from 'react';
import style from './Messages.module.css'
import Message from './Message/Message';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addMessage, setCurrentDialogById} from "../../../Reducers/dialogPageReducer";


const Messages = (props) => {
    if (!props.currentDialog) {
        props.setCurrentDialogById(props.match.params.id);
        return null;
    }
    let userImg = props.userImg;
    let MessagesList = props.currentDialog.masseges.map(el => <Message
        myMessage={el.myMassege} oponentImg={props.currentDialog.oponentImg} text={el.text} userImg={userImg}/>);
    let message = React.createRef();

    const add = () => {
        props.addMessage(message.current.value, props.currentDialog.id)
    };


    return (
        <>
            {MessagesList}
            <div className={style.sendMassege}>
                <textarea ref={message} className={style.send}></textarea>
                <input onClick={add} type="submit"/>
            </div>
        </>
    );
};


const mapStateToProps = (state) => {
    return {
        currentDialog: state.dialogPage.currentDialog,
        userImg: state.profilePage.user.img,
        state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentDialogById(id) {
            dispatch(setCurrentDialogById(id))
        },
        addMessage(text, id) {
            dispatch(addMessage(text, id))
        }
    }
};


const ConnectedMessages = withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));

export default ConnectedMessages