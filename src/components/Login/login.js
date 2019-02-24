import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../store/Thunks/thunks';
import {app} from '../../firebase';
import './login.css';
import {Input,Button} from 'react-materialize';

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            disableSubmit: true,
            error : "",
            forgotPass : false
        }
        this.handleSubmit = () => {
            this.props.login(this.state.email,this.state.password);
        }
        this.handleForgotPassword = () => {
            this.setState({
                forgotPass : !this.state.forgotPass
            });
            console.log("Stupid guy!"); 
        }
        this.handleResetPassword = () => {
            app.auth().sendPasswordResetEmail(this.state.email).then(() => console.log("email sent")).catch((err) => {
                this.setState({
                    error : err.message
                });
            });
        }
    }

    handleEmailChange = e => this.setState({ 
        email: e.target.value,
        disableSubmit: !((this.state.password !== '') && (e.target.value !== ''))
    })

    handlePasswordChange = e => this.setState({ 
            password: e.target.value,
            disableSubmit: !(( e.target.value !== '') && (this.state.email !== ''))
        })
    componentWillReceiveProps(nextProp) {
        if(nextProp !== this.props) {
            console.log(nextProp.loginDetails);
            if(nextProp.loginDetails.error !== null) {
                this.setState({
                    error : nextProp.loginDetails.error
                });
            }
            if(nextProp.loginDetails.user !== undefined && nextProp.loginDetails.user !== null) {
                this.props.history.push("/");
            }
        }
    }

    render() {
        return (
            <div className="container"> 
                <div className = "card black-text">
                <div className = "login-area">
                <h4>Login</h4>
                    <div className="form-group">
                        <Input  type="email" 
                                label = "Email" 
                                id="email"  
                                value = {this.state.email}
                                onChange = {this.handleEmailChange}
                                required
                                />
                    </div>
                    {this.state.forgotPass ? 
                    <div>
                         <small className = "errorMessage">{this.state.error}</small>
                        <Button type="submit" className = "login-btn" onClick = {this.handleResetPassword} disabled = {this.state.email === ""}>Send Password reset Link</Button>
                    </div>
                    :
                    <div>
                    <div>
                            <Input  type="password" 
                                id="password" 
                                label = "Password"
                                value = {this.state.password}
                                onChange = {this.handlePasswordChange}
                                required
                                />
                     <small className = "errorMessage">{this.state.error}</small>
                    </div>
                   
                    <Button type="submit" className = 'login-btn' disabled={this.state.disableSubmit}onClick = {this.handleSubmit}>Login</Button>
                <div className="signup-msg">
                    Don't have an account? <Link to = "/signup">Signup here</Link>
                </div>
                </div>
            }
                <small><a onClick = {this.handleForgotPassword} href = "#">Forgot Password?</a></small>
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {loginDetails : state.reducer}
}
export default connect(mapStateToProps,{login})(Login);