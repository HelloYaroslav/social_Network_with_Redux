import React from 'react';
import style from './Sidebar.module.css';
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <div className={style.menu}>
                <NavLink to='/profile' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="profile_button">Профиль</div>
                </NavLink>
                <NavLink to='/dialogs' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="message_button">Сообщения</div>
                </NavLink>
                <NavLink to='/news' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="news_button">Новости</div>
                </NavLink>
                <NavLink to='/music' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="musik_button">Музыка</div>
                </NavLink>
                <NavLink to='/users' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="users_button">Пользователи</div>
                </NavLink>
                <br/>
                <NavLink to='/settings' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="settings_button">Настройки</div>
                </NavLink>
                <NavLink to='/form' activeClassName={style.active} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="settings_button">fORM</div>
                </NavLink>
            </div>
        </div>
    );
};
export default Sidebar;
