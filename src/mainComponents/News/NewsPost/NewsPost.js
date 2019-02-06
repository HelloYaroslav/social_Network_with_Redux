import React from 'react';
import style from './NewsPost.module.css'

const NewsPost = (props) => {
    let {caption, text, img} = props;
    return (
        <div className={style.item}>
            <img
                src={img}
                alt=""/>
            <a href='#'>{caption} </a>
            <p>{text}
            </p>
        </div>);
};

export default NewsPost;