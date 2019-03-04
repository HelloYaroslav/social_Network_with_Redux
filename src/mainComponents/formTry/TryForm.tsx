import React from 'react';

import style from './Profile.module.css';
import LoginForm from './contactForm/LoginForm';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// @ts-ignore
import {connect} from "react-redux";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";
import {addPost, onPostWriting} from '../../Reducers/profilePageReducer';

interface User {
    birthday: string;
    city: string;
    education: string;
    img: string;
    name: string;
    webPage: string;
}

interface ProfilePage {
    currentPostText: string | null;
    posts: Array<{}>;
    user: User
}

interface Props {
    profilePage: ProfilePage;
    isLoggedIn?: boolean;
    onPostWriting: Function;
    addPost: Function;
}

const showData = (data: Object) => {
    console.log(data)
};

const TryForm = ({profilePage: {user}, ...props}: Props) => {

    return (
        <div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.profile}>
                    <img className={style.profileImg} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    <div className={style.user_information}>
                        <img
                            src={user.img}
                            alt=""/>
                        <div className="description">
                            <h2>{user.name}</h2>
                            <p>День рождения: {user.birthday}<br/>
                                Город: {user.city} <br/>
                                Образование: {user.education} <br/>
                                Web-page: <a href="#">{user.webPage}</a>
                            </p>
                        </div>
                    </div>
                    <div className={style.add_notes}>
                        <h3>отправить настройки</h3>
                        <LoginForm onSubmit={showData}/>

                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        profilePage: state.profilePage
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost() {
            dispatch(addPost())
        },
        onPostWriting(text: string) {
            dispatch(onPostWriting(text))
        }
    }
};

let ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(TryForm);

export default isLoggedInHOC(ConnectedProfile);
