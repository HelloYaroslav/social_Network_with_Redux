import React from 'react'

const User = (props) => {
    return (
        <div>
            <img src={props.photo} alt=""/>
            <span>name: {props.name}</span>
            <span> status: {props.status}</span>
        </div>);
};

export default User