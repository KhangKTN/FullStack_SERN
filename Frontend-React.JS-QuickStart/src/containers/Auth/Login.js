import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import {handleLoginApi} from '../../services/userService';
// import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessage: '',
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({errMessage: ''})
        this.setState({username: event.target.value}, () => {
            console.log('This is state: ', this.state.username);
        })
        // console.log(event.target.value);
        
    }

    handleOnChangePassword = (event) => {
        this.setState({errMessage: ''})
        this.setState({password: event.target.value})
        console.log(event.target.value);
    }

    handleLogin = async() => {
        this.setState({errMessage: ''})
        console.log('Username: ', this.state.username, 'pw:', this.state.password);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            console.log(data);
            if(data && data.errCode !== 0){
                this.setState({errMessage: data.message})
            } else{
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if(error.response){
                if(error.response.data)
                this.setState({errMessage: error.response.data.message})
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({isShowPassword: !this.state.isShowPassword});
    }

    handleKeyEnter = (event) => {
        if(event.key === "Enter"){
            this.handleLogin();
        }
    }

    render() {
        // console.log('check render');
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='text-center my-3'><h2>Login</h2></div>
                        <div className='col-10 form-group mx-auto input-login'>
                            <label>Username:</label>
                            <input type='text' value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} className='form-control' placeholder='Enter your username'/>
                            <label>Password:</label>
                            <div className='input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} value={this.state.password} 
                                    onChange={(event) => this.handleOnChangePassword(event)} 
                                    className='form-control' placeholder='Enter your password'
                                    onKeyDown={(event) => this.handleKeyEnter(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-10 mx-auto my-3'>
                            <span className='text-danger'>{this.state.errMessage}</span>
                            <button onClick={() => this.handleLogin()} className='btn btn-primary col-12 mt-3'>Login</button>
                        </div>
                        <div className='col-12 text-center'>
                            <span>Forgot your password?</span> <br/>
                            <span>or Login with:</span>
                        </div>
                        <div className='col-12 mt-3 social-login row d-flex m-0 justify-content-center'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
