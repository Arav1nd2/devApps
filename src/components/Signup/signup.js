import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {signup} from '../store/Thunks/thunks';
import {app} from '../../firebase';

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
            <div className="login-wrapper container">
                <h2>Signup</h2>
                
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input  type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Enter email" 
                                value = {this.state.email}
                                onChange = {this.handleEmailChange}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input  type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password" 
                                value = {this.state.password}
                                onChange = {this.handlePasswordChange}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label for="password">Re-type Password</label>
                        <input  type="password" 
                                className="form-control" 
                                id="retype-password" 
                                placeholder="Re-type password" 
                                value = {this.state.retypePassword}
                                onChange = {this.handleRetypePasswordChange}
                                required
                                />
                    <small>{this.state.message}</small>
                    </div>
                    <button type="submit" 
                            className="btn btn-secondary btn-block"
                            disabled = {this.state.disableSubmit}
                            onClick = {this.handleSubmit}
                            >Signup</button>
                
                <div className="signup-msg">
                    Already have an account? <Link to = "/login">Login here</Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {user : state.reducer.user}
}
export default connect(mapStateToProps,{signup})(Signup);