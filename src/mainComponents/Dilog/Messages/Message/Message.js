import React from 'react';
import style from './Message.module.css';

const Message = (props) => {
    let {myMessage, text, userImg, oponentImg} = props;

    if (myMessage === true)
        return (
            <div className={style.my_massege}>
                <img src={userImg} alt=""/>
                <span>{text}</span>
            </div>
        );
    else
        return (
            <div className={style.to_me_massege}>
                <span>{text}</span>
                <img src={oponentImg} alt="ho"/>
            </div>
        );
};

export default Message;

//style.my_massege or style.to_me_massege

