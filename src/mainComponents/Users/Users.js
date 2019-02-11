import React, {Component} from 'react';
import style from './Users.module.css';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import connect from "react-redux/es/connect/connect";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";
import {getUsersFromServer} from "../../Reducers/usersPageReducer";
import User from "./User/User";


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: undefined,
            page: undefined
        };
        this.createUsersComponents = this.createUsersComponents.bind(this);
    }

    componentWillMount() {
        if (!this.props.users)
            this.props.getUsers(this.state.count, this.state.page)
    }

    createUsersComponents(users) {
        return users.map(el => <User {...el}/>)
    }

    render() {
        return <div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.news_wrapper}>
                    <img className={style.profile_img} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    {this.props.users ?
                        <div className={style.users}>
                            {this.createUsersComponents(this.props.users)}
                        </div> : 'downloading users'}
                </div>
            </div>
        </div>
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers(count, page) {
            dispatch(getUsersFromServer(count, page))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
};


const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users);

export default isLoggedInHOC(ConnectedUsers);
