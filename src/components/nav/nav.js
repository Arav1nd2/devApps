import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logout} from '../store/Thunks/thunks';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-materialize';
import './nav.css';

class Navigation extends Component {
    render() {
        return (
            <div >
                <nav>
                    <Navbar brand = "&nbsp;ProdPrint" className = "grey darken-4" right>
                    <div> 
                        <ul>
                        {                  
                        (this.props.authState ?
                            <div>
                            <li><NavLink to = '/'>Home</NavLink></li>
                            <li><NavLink to='/orders'>Your orders</NavLink></li>
                            <li><NavLink to = '/login' onClick = {() => this.props.logout()}>Logout</NavLink></li>
                            </div> :
                            <div>
                            <li><NavLink to = '/'>Home</NavLink></li>
                            <li><NavLink to='/signUp'>Signup</NavLink></li>
                            <li><NavLink to = '/login'>Login</NavLink></li>
                            </div>)
                        }
                        
                        </ul>
                    </div>
                    </Navbar>
                </nav>    
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.reducer)
    return ({
        authState : state.reducer.user
    })
}
export default connect(mapStateToProps,{logout})(Navigation);