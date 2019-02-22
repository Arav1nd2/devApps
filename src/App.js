import React, { Component } from 'react';
import {Router,Route,Redirect} from 'react-router-dom';
import './App.css';
import {history} from './components/store/store';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Verification from './components/Verification/verification';
import {connect} from 'react-redux';
import {setUser,logout} from './components/store/Thunks/thunks';
import {app} from './firebase';
import Navigation from './components/nav/nav';

class App extends Component {
  componentDidMount() {
    app.auth().onAuthStateChanged(authUser => {
      if(authUser) {
        console.log(authUser);
        this.props.setUser(authUser.uid);
      }
    });
  }
  
  render() {
    return (
      <div>
        <Router history = {history}>
          <div>
                 <Navigation />
                 <Route exact path = '/login' component = {Login} />
                 <Route exact path = '/signup' component = {Signup} />
                 <Route path = '/verify' component = {Verification} />
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user : state.reducer.user}
}

export default connect(mapStateToProps,{setUser,logout})(App);
