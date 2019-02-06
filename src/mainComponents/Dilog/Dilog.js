import React from 'react';
import style from './Dilog.module.css';
import Person from './Person/Person';
import Messages from './Messages/Messages';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {connect} from "react-redux";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";


const Dialog = (props) => {
    let id = props.match.params.id;
    let dialogs = props.dialogPage.dialogsList;
    let dialogFromUrl = dialogs.find((el) => el.id == id);
    let PersonList = dialogs.map((el) => <Person key={el.id} name={el.oponent} img={el.oponentImg} id={el.id}/>);

    return (<div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.dialog_wrapper}>
                    <img className={style.profile_img} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    <div className={style.dialogs}>
                        <div className={style.people}>
                            <h2>Dialogs</h2>
                            {PersonList}
                        </div>
                        <div className={style.masseges}>

                            {!!dialogFromUrl ? <Messages/> : <h2>Please select a dialog</h2>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage
    }
};


let ConnectedDialog = connect(mapStateToProps, null)(Dialog);
export default isLoggedInHOC(ConnectedDialog);

