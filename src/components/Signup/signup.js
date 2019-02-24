import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {signup} from '../store/Thunks/thunks';
import {app} from '../../firebase';
import {Input,Button} from 'react-materialize';
import '../Login/login.css';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            retypePassword: '',
            disableSubmit: true,
            passwordsDontMatch: false,
            message : ''
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.signup(this.state.email,this.state.password);
        }
    }

    handleEmailChange = e => this.setState({ 
        email: e.target.value,
        disableSubmit: !( this.state.passwordsDontMatch && (this.state.password !== '') && (this.state.retypePassword !== '') && (e.target.value !== '') )
    })

    handlePasswordChange = e => this.setState({ 
            password: e.target.value,
            passwordsDontMatch: (e.target.value !== this.state.retypePassword),
            disableSubmit: !( (e.target.value === this.state.retypePassword) && ( e.target.value !== '') && (this.state.email !== ''))
        })

    handleRetypePasswordChange = e => this.setState({ 
            retypePassword: e.target.value,
            passwordsDontMatch: (this.state.password !== e.target.value),
            disableSubmit: !((this.state.password === e.target.value) && ( this.state.password !== '') && (this.state.email !== ''))
        })

    componentWillReceiveProps(nextProp) {
        if(this.props !== nextProp) {
            let user = nextProp.user;
            if(user.emailVerified === false) {
                let user2 = app.auth().currentUser;
                user2.sendEmailVerification().then(() => {
                    this.setState({
                        message : "An Email has been sent to your mail. Please verify it soon"
                    });
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className = "card black-text">
                <div className = "login-area">
                <h4>Signup</h4>
                
                    <div className="form-group">
                        <Input  type="email" 
                                id="email" 
                                label = "Email"
                                value = {this.state.email}
                                onChange = {this.handleEmailChange}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <Input  type="password" 
                                id="password" 
                                label = "Password"
                                value = {this.state.password}
                                onChange = {this.handlePasswordChange}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <Input  type="password" 
                                className="form-control" 
                                id="retype-password" 
                                label = "Retype password"
                                value = {this.state.retypePassword}
                                onChange = {this.handleRetypePasswordChange}
                                required
                                />
                    <small>{this.state.message}</small>
                    </div>
                    <Button type="submit" 
                            className="login-btn"
                            disabled = {this.state.disableSubmit}
                            onClick = {this.handleSubmit}
                            >Signup</Button>
                
                <div className="signup-msg">
                    Already have an account? <Link to = "/login">Login here</Link>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {user : state.reducer.user}
}
export default connect(mapStateToProps,{signup})(Signup);