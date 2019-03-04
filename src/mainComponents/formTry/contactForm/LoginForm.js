import React, {Component} from 'react';
import {Field, Form, reduxForm} from "redux-form";
import style from './loginForm.module.css';
import {connect} from "react-redux";


const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    }

    return errors
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this)
    }

    renderField(component) {
        let {
            input,
            label,
            type,
            meta: {touched, error, warning}
        } = component;
        return <>
            <label htmlFor="">{label}</label>
            <div>
                <input type={type} {...input} placeholder={label}/>
                {error && <span>{error}</span>}
            </div>
        </>
    }

    render() {
        let {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <Form onSubmit={handleSubmit} className={style.login_page}>
                <div className={style.login_or_registration}>
                    <div className={style.action}>Log in</div>
                    <div className={style.action}>Registration</div>
                </div>
                <div className={style.inputs}>
                    <Field name="email" component={this.renderField} label='Email'/>
                    <Field name="password" component={this.renderField} label='Password'/>
                </div>
                <div className={style.last_buttons}>
                    <Field name="rememberMe" component="input" type="checkbox" label='Remember me'/>

                    <button type="submit">Submit</button>
                </div>
                <div className={this.props.showDataResponse ? style.enableResponseData  : style.disableResponseData}>
                    <br/>
                    <span>{this.props.messageToUser}</span>
                    <img src={this.props.captchaImg} alt=''/>
                    <Field name="captchaValue" component={this.renderField} type="text"/>
                </div>
                {this.props.submittingStatus &&
                <img className={style.loadingImg} src={this.props.submittingIcon} alt='there is no img'/>}
            </Form>
        )
    }
}

LoginForm = reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);

const mapStateToProps = (state) => {
    return {
        initialValues: state.loginPage.initialValues
    }
};
LoginForm = connect(mapStateToProps, null)(LoginForm);
export default LoginForm;

//<div className={style.login_page}>
//         <div className={style.login_or_registration}>
//             <div className={style.action}>Log in</div>
//             <div className={style.action}>Registration</div>
//         </div>
//         <div className={style.inputs}>
//             <label>Email</label>
//              onChange={(e) => this.props.onEmailChange(e.currentTarget.value)}
//                    defaultValue='yaroslav.klimenkovv@gmail.com'/>
//             <label>Password</label>
//             <input type="text" onChange={(e) => this.props.onPasswordChange(e.currentTarget.value)}
//                    defaultValue='111'/>
//         </div>
//         <div className={style.last_buttons}>
//             <input type="checkbox" onChange={e => this.props.setIsSaved(e.currentTarget.checked)}/>
//             <span>Remember me</span>
//             {!this.props.isLoggedIn ? <button onClick={this.props.submitData} disabled={this.props.submittingStatus}
//                                               className={this.props.submittingStatus ? style.disabled : style.enable}>submit
//             </button> : <Redirect to='/profile'/>}
//         </div>
//         <img src="" alt=""/>
//
//         <div className={!this.props.showDataResponse ? style.disableResponseData : style.enableResponseData}>
//             <br/>
//             <span>{this.props.messageToUser}</span>
//             <img src={this.props.captchaImg} alt=''/>
//             <input type="text" onChange={e => this.props.setDataFromCaptcha(e.currentTarget.value)}/>
//         </div>
//     </div>