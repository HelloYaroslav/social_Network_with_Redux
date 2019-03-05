import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    getCaptchaImg,
    getMessageToUser,
    getShowDataResponse,
    getSubmittingIcon,
    getSubmittingStatus,
    login
} from "../Reducers/loginPageReducer/loginPageReducer";
import LoginForm from "../mainComponents/Forms/LoginForm/LoginForm";
import isLoggedInHOC from "./isLoggedInHOC";
import {createStructuredSelector} from "reselect";
import {fetchCaptcha, logIn} from "../Reducers/loginPageReducer/actionsForLoginPage";

class LoginPage extends Component {

    componentWillMount() {
        this.props.showCaptcha();
    }

    render() {
        console.log('render', this.props);
        return <LoginForm onSubmit={this.props.submitData} {...this.props}/>
    }
}


const mapStateToProps = createStructuredSelector({
    submittingStatus: getSubmittingStatus,
    submittingIcon: getSubmittingIcon,
    messageToUser: getMessageToUser,
    captchaImg: getCaptchaImg,
    showDataResponse: getShowDataResponse
});


let mapDispatchToProps = (dispatch) => {
    return {
        submitData() {
            dispatch(logIn())
        },
        showCaptcha() {
            dispatch(fetchCaptcha())
        }
    }
};
export default isLoggedInHOC(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
