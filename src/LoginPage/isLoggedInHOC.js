import React, {Component} from "react";
import {isLogged} from "../axios";
import {connect} from "react-redux";
import {setUserInfo} from "../Reducers/authReducer";
import {Redirect, withRouter} from "react-router-dom";


const isLoggedInHOC = (ComponentToHOC) => {
    class isLoggedIn extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLogged: this.props.isLoggedIn,
                processing: false
            }
        }

        componentWillMount() {
            if (!this.props.isLoggedIn) {
                this.setState({processing: true});
                isLogged().then(response => {
                    if (response.status === 200) {
                        switch (response.data.resultCode) {
                            case 0 : {
                                this.setState({isLogged: true, processing: false});
                                this.props.setUser(response.data.data.userId);
                                break
                            }
                            case 1: {
                                this.setState({isLogged: false, processing: false})
                            }
                        }
                    }
                }).catch(response => {
                })
            } else {
                this.setState({isLogged: true})
            }
        }

        componentWillReceiveProps(nextProps) {
            this.setState({isLogged: nextProps.isLoggedIn})
        }

        render() {
            console.log('Hoc render');
            if (this.state.processing)
                return 'processing';
            else
                return this.state.isLogged
                    ? (this.props.location.pathname !== `/`)
                        ? <ComponentToHOC  {...this.props}/>
                        : <Redirect to='/profile'/>
                    : (this.props.location.pathname === `/`)
                        ? <ComponentToHOC  {...this.props}/>
                        : <Redirect to='/'/>
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            setUser(id) {
                dispatch(setUserInfo(id))
            }
        }
    };

    const mapStateToProps = (state) => {
        return {
            isLoggedIn: state.authData.isLoggedIn,
            authData: state.authData
        }
    };

    isLoggedIn = withRouter(isLoggedIn);
    return (connect(mapStateToProps, mapDispatchToProps)(isLoggedIn))
};


export default isLoggedInHOC