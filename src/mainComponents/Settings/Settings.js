import React from 'react';
import style from './Settings.module.css';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";

const Settings = () => {
    return (
        <div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.news_wrapper}>
                    <img className={style.profile_img} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    <h1>настройки</h1>
                    <ul>
                        <li>фон</li>
                        <li>Приватность</li>
                        <li>Автологин</li>
                        <li>Фильтр цензуры</li>
                        <li>Выход из профиля</li>
                    </ul>
                    <label htmlFor="">save</label>
                    <input type="checkbox"/>
                </div>
            </div>
        </div>
    );
};
export default isLoggedInHOC(Settings);
