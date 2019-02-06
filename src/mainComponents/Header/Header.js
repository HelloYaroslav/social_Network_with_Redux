import React from 'react';
import style from './Header.module.css';
import {connect} from "react-redux";
import {logout} from "../../Reducers/authReducer";

const Header = (props) => {
    return (<>
            {/*{!props.isLoggedIn? <Redirect to='/'/> : ''}*/}
            <header className={style.header}>
                <button className={props.logoutProcessingStatus ? `${style.logout} ${style.disabled}` : style.logout}
                        disabled={props.logoutProcessingStatus} onClick={props.logout}>
                    logout
                </button>
            </header>
            {props.logoutProcessingStatus ? <img className={style.loadigImg} src={props.logoutImg} alt=""/> : ''}
        </>
    );
};

let mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authData.isLoggedIn,
        logoutProcessingStatus: state.authData.logoutProcessingStatus,
        logoutImg: state.authData.logoutImg
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            dispatch(logout())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
