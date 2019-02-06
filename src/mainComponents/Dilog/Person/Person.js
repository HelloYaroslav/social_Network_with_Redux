import React from 'react';
import style from './Person.module.css';
import {NavLink} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {setCurrentDialogById} from "../../../Reducers/dialogPageReducer";

const Person = (props) => {
    let {name, img, id} = props;
    let setCurrentDialog = () => {
        props.setCurrentDialogById(id)
    };

    return (
        <NavLink to={`/dialogs/${id}`} activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
            <div className={style.person} onClick={setCurrentDialog}>
                <img
                    src={img}
                    alt=""/>
                <span>{name}</span>
            </div>
        </NavLink>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentDialogById(id) {
            dispatch(setCurrentDialogById(id))
        }
    }
};


const ConnectedPerson = connect(null, mapDispatchToProps)(Person);

export default ConnectedPerson;