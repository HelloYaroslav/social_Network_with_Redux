import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCaptcha, login, makeGetStatusStateInstans} from "../Reducers/loginPageReducer";
import LoginForm from "../mainComponents/formTry/contactForm/LoginForm";
import isLoggedInHOC from "./isLoggedInHOC";

class LoginPage extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        this.props.showCaptcha();
    }

    render() {
        console.log('render', this.props);
        return <LoginForm onSubmit={this.props.submitData} {...this.props}/>
    }
}

const makeMapStateToProps = () => {
    const getStatusState = makeGetStatusStateInstans();
    return (state) => {
        return {
            submittingStatus: getStatusState(state),
            submittingIcon: state.loginPage.submittingIcon,
            messageToUser: state.loginPage.serverResponse.messageToUser,
            captchaImg: state.loginPage.serverResponse.captchaImg,
            showDataResponse: state.loginPage.showDataResponse
        }
    };
};


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
export default isLoggedInHOC(connect(makeMapStateToProps, mapDispatchToProps)(LoginPage));
