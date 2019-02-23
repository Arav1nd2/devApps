import React, { Component } from 'react';
import AdminNav from './adminNav/adminNav';
import AdminLogin from './login/adminLogin';
import {Route,Redirect} from 'react-router-dom';
import Notifs from './notifs/notifs';
import Dashboard from './dashboard/dashboard';
import {history} from '../store/store';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authState : true
        }
        this.login = () => {
            this.setState({
                authState : true
            });
            history.push('/admin/daksh2k19/dashboard');
        }
        this.logout = () => {
            this.setState({
                authState : false
            });
        }
    }
    
    render() {
        return (
            <div>
                <AdminNav authState = {this.state.authState} logout = {this.logout}/>
                <Route exact path = '/admin/daksh2k19/notifs' render = {(props) => (
                   this.state.authState ? <Notifs {...props} authState = {this.state.authState} /> : <Redirect to = '/admin/daksh2k19/login' />
                 )} />
                 <Route exact path = '/admin/daksh2k19/dashboard' render = {(props) => (
                   this.state.authState ? <Dashboard {...props} authState = {this.state.authState}/> : <Redirect to = '/admin/daksh2k19/login' />
                 )} />
                 <Route exact path = '/admin/daksh2k19/login' render = {(props) => (
                     this.state.authState ? <Redirect to ="/admin/daksh2k19/dashboar" /> : <AdminLogin {...props} login = {this.login} />
                 )}/> 
            </div>
        );
    }
}

export default Admin;