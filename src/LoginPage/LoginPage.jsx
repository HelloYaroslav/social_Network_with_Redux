import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    getCaptcha,
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
            dispatch(login())
        },
        showCaptcha() {
            dispatch(getCaptcha())
        }
    }
};
export default isLoggedInHOC(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
