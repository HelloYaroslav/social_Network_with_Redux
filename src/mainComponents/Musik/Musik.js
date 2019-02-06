import React from 'react';
import style from './Musik.module.css';
import MusikItem from './MusikItem/MusikItem'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import connect from "react-redux/es/connect/connect";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";

const Music = (props) => {
    let MusikList = props.musicList.map((el) => <MusikItem name={el.name} song={el.song} img={el.img}/>);

    return (
        <div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.musik_wrapper}>
                    <img className={style.profile_img} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    <div className={style.player}>
                        <span>Player</span>
                    </div>
                    <h1>Плейлист</h1>
                    <div className={style.musik_list}>
                        {MusikList}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        musicList: state.musicPage.musicList
    }
};


let ConnectedMusic = connect(mapStateToProps, null)(Music);

export default isLoggedInHOC(ConnectedMusic);
