import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
    let {img, text} = props;
    return (
        <div className={style.note}>
            <img
                src={img}
                alt="unknown"/>
            <p>
                {text}
            </p>
        </div>
    );
};

export default Post;