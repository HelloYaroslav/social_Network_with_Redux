import React, {Component} from 'react';
import style from './LoginPage.module.css';
import {connect} from "react-redux";
import {getCaptcha, login, setDataFromCaptcha, setEmail, setIsSave, setPassword} from "../Reducers/loginPageReducer";
import {Redirect} from "react-router-dom";

// const LoginPage = (props) => {
//     debugger
//     if (!props.captchaImg && !props.submittingStatus) {
//             props.showCaptcha();
//             return null
//     }
//
//     return (
//         <div className={style.login_page}>
//             <div className={style.login_or_registration}>
//                 <div className={style.action}>Log in</div>
//                 <div className={style.action}>Registration</div>
//             </div>
//             <div className={style.inputs}>
//                 <label>Email</label>
//                 <input type="text" onChange={(e) => props.onEmailChange(e.currentTarget.value)}
//                        defaultValue='yaroslav.klimenkovv@gmail.com'/>
//                 <label>Password</label>
//                 <input type="text" onChange={(e) => props.onPasswordChange(e.currentTarget.value)}
//                        defaultValue='111'/>
//             </div>
//             <div className={style.last_buttons}>
//                 <input type="checkbox" onChange={e => props.setIsSaved(e.currentTarget.checked)}/>
//                 <span>Remember me</span>
//                 {!props.isLoggedIn ? <button onClick={props.submitData} disabled={props.submittingStatus}
//                                              className={props.submittingStatus ? style.disabled : style.enable}>submit
//                 </button> : <Redirect to='/profile'/>}
//             </div>
//             <img src="" alt=""/>
//             {
//                 props.submittingStatus ?
//                     <img className={style.loadigImg} src={props.submittingIcon} alt='there is no img'/> : ''
//             }
//             <div className={!props.showDataResponse ? style.disableResponseData : style.enableResponseData}>
//                 <br/>
//                 <span>{props.messageToUser}</span>
//                 <img src={props.captchaImg} alt=''/>
//                 <input type="text" onChange={e => props.setDataFromCaptcha(e.currentTarget.value)}/>
//             </div>
//
//         </div>
//     );
// };

class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.showCaptcha();
    }

    render() {
        let f = this.props;
        return <div className={style.login_page}>
            <div className={style.login_or_registration}>
                <div className={style.action}>Log in</div>
                <div className={style.action}>Registration</div>
            </div>
            <div className={style.inputs}>
                <label>Email</label>
                <input type="text" onChange={(e) => this.props.onEmailChange(e.currentTarget.value)}
                       defaultValue='yaroslav.klimenkovv@gmail.com'/>
                <label>Password</label>
                <input type="text" onChange={(e) => this.props.onPasswordChange(e.currentTarget.value)}
                       defaultValue='111'/>
            </div>
            <div className={style.last_buttons}>
                <input type="checkbox" onChange={e => this.props.setIsSaved(e.currentTarget.checked)}/>
                <span>Remember me</span>
                {!this.props.isLoggedIn ? <button onClick={this.props.submitData} disabled={this.props.submittingStatus}
                                                  className={this.props.submittingStatus ? style.disabled : style.enable}>submit
                </button> : <Redirect to='/profile'/>}
            </div>
            <img src="" alt=""/>
            {
                this.props.submittingStatus ?
                    <img className={style.loadigImg} src={this.props.submittingIcon} alt='there is no img'/> : ''
            }
            <div className={!this.props.showDataResponse ? style.disableResponseData : style.enableResponseData}>
                <br/>
                <span>{this.props.messageToUser}</span>
                <img src={this.props.captchaImg} alt=''/>
                <input type="text" onChange={e => this.props.setDataFromCaptcha(e.currentTarget.value)}/>
            </div>

        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        submittingStatus: state.loginPage.submittingStatus,
        submittingIcon: state.loginPage.submittingIcon,
        isLoggedIn: state.authData.isLoggedIn,
        messageToUser: state.loginPage.serverResponse.messageToUser,
        captchaImg: state.loginPage.serverResponse.captchaImg,
        showDataResponse: state.loginPage.showDataResponse
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onEmailChange(email) {
            dispatch(setEmail(email))
        },
        onPasswordChange(password) {
            dispatch(setPassword(password))
        },
        submitData() {
            dispatch(login())
        },
        setIsSaved(isRemembered) {
            dispatch(setIsSave(isRemembered))
        },
        setDataFromCaptcha(value) {
            dispatch(setDataFromCaptcha(value))
        },
        showCaptcha() {
            dispatch(getCaptcha())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
