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
            userPage: 1
        };
        this.createUsersComponents = this.createUsersComponents.bind(this);
    }

    componentWillMount() {
        if (!this.props.users)
            this.props.getUsers()
    }

    createUsersComponents(users) {
        debugger;
        let result = [];
        for (let i = 0; i < this.props.itemsInPage * this.props.currentPage; i++)
            result.push(<User {...users[i]}/>);

        return result
    }

    render() {
        return <div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.users_wrapper}>
                    <img className={style.profile_img} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    {this.props.users ?
                        <div className={style.users}>
                            {this.createUsersComponents(this.props.users)}
                        </div> : 'downloading users'}
                    <button onClick={this.props.getUsers}>more users</button>
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
        users: state.usersPage.users,
        totalPages: state.usersPage.totalPages,
        itemsInPage: state.usersPage.itemsInPage,
        currentPage: state.usersPage.currentPage - 1
    }
};


const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users);

export default isLoggedInHOC(ConnectedUsers);
