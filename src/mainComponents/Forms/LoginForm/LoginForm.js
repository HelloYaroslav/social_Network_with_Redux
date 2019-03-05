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

    renderField = (component) => {
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
    };

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
                <div className={this.props.showDataResponse ? style.enableResponseData : style.disableResponseData}>
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

export default connect(mapStateToProps, null)(LoginForm);
