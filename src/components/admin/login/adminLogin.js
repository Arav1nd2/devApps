import React, { Component } from 'react';
import Input from 'react-materialize/lib/Input';
import Button from 'react-materialize/lib/Button';
import { Icon } from 'react-materialize';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid : "",
            password : '',
            error : ''
        }
        this.handleChange = (e) => {
            this.setState({
                [e.target.name] : e.target.value 
            });
        }
        this.handleSubmit = () => {
            if((this.state.userid === 'AryaDaksh19')&&(this.state.password === "test@admin")) {
                this.setState({
                    userid : "",
                    password : '',
                    error : ''
                });
                this.props.login();
            }
            else {
                this.setState({
                    error : "Invalid credentials!"
                });
            }
        }
    }
    
    render() {
        let btnState = (this.state.userid !== "")&&(this.state.password !== "");
        return (
            <div className = "container">
                <h4>Admin Login Portal</h4>
                <Input type = "text" label = "UserID" name = "userid" value = {this.state.userid} onChange = {this.handleChange}><Icon>account_circle</Icon></Input>
                <Input type = "password" label = "Password" name = "password" value = {this.state.password} onChange = {this.handleChange}><Icon>lock</Icon></Input>
                {(this.state.error !== "") && <p className = "text-red">{this.state.error}</p> }
                <Button waves = "light" onClick = {() => {setTimeout(this.handleSubmit,70)}} disabled = {!btnState}>Dive In..</Button>
            </div>
        );
    }
}

export default AdminLogin;              