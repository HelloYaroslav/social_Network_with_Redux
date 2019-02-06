import React from 'react';
import style from './Profile.module.css';
import Post from './Wallpost/Post';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {connect} from "react-redux";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";


const Profile = (props) => {

    let user = props.profilePage.user;
    let PostList = props.profilePage.posts.map((item, key) => {
        return <Post key={key} img={item.img} text={item.text}/>
    });


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
                        <h3>Мои записи</h3>
                        <textarea className={style.add_note_area} onChange={(e) => {
                            props.onPostWriting(e.currentTarget.value)
                        }}></textarea>
                        <button onClick={() => {
                            props.addPost()
                        }}>отправить
                        </button>
                    </div>

                    <div className={style.notes}>
                        {PostList}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost() {
            dispatch({type: 'addPost'})
        },
        onPostWriting(text) {
            dispatch({
                type: 'onPostWriting',
                text
            })
        }
    }
};

let ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default isLoggedInHOC(ConnectedProfile);
