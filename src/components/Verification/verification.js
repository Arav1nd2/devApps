import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {app,db} from '../../firebase';
import {Button,Input} from 'react-materialize';
import './verify.css';

class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified : false,
            mode : "",
            password : "",
            actionCode : ""
        }
        this.handlePasswordChange = (e) => {
            this.setState({
                password : e.target.value
            });
        }
        this.handleSubmit = () => {
            app.auth().verifyPasswordResetCode(this.state.actionCode).then((email) => {

                app.auth().confirmPasswordReset(this.state.actionCode,this.state.password).then((resp) => {
                    console.log("Password reset success!");
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        }
        this.handleVerify = () => {
            app.auth().applyActionCode(this.state.actionCode).then((res) => {
                let user = app.auth().currentUser;
                let docData = {
                    id : user.uid,
                    orders : [],
                    email : user.email
                }
                db.collection('users').doc(user.uid).set(docData).then(()=> {
                    console.log("Document Written successfully");
                }).catch((err) => {
                    console.log(err);
                });
                this.setState({
                    verified : true
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        }
    
    
    getParameterByName(name,url) {
    if (!url) {
    url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    componentDidMount() {
        let modes = this.getParameterByName('mode');
        let actionCodes = this.getParameterByName('oobCode');
        this.setState({
            mode: modes,
            actionCode : actionCodes
        });
    }   
    
    render() {
        let displayContent;
        if(this.state.mode === "resetPassword") {
            displayContent = 
            (<div>
                <div>
                        <Input  type="password" 
                                id="password" 
                                label = "Password"
                                value = {this.state.password}
                                onChange = {this.handlePasswordChange}
                                />
                </div>
                <Button type="submit" 
                            className="verify-btn"
                            onClick = {this.handleSubmit}
                            disabled = {this.state.password===""}
                            >Reset Password</Button>
            </div>);
        } 
        else if(this.state.mode === "verifyEmail")
         {
            displayContent = this.state.verified ? (<div>
                <h3>Your Email Has been verified Successfully!!!</h3>
                <Link to = "/login" >Click here to login</Link>
            </div>) : 
            (<Button type="submit" 
            className="verify-btn"
            onClick = {this.handleVerify}
            >Verify Email</Button>);
        }
        return (
            <div className = "container">
               <br/><br/>
               <div className = "card">
                    <div className = "verify-area black-text">
                        {displayContent}                
                    </div>
               </div>
            </div>
        );
    }
}

export default Verification;