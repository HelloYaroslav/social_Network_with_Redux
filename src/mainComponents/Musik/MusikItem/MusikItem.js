import React from 'react'
import style from './MusikItem.module.css'

const MusikItem = (props) => {
    let {img, name, song} = props;
    return (
        <div className={style.song}>
            <span>{name}</span>
        </div>);
};

export default MusikItem;