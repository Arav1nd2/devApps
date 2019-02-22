import React, { Component } from 'react';
import {Navbar,NavItem} from 'react-materialize';
import {connect} from 'react-redux';
import {logout} from '../store/Thunks/thunks'
import './nav.css';

class Navigation extends Component {
    render() {
        return (
            <div >
                <Navbar brand = "ProdPrint" right className = "brown">
                    {this.props.authState ? <div>
                    <NavItem href='/orders'>Your orders</NavItem>
                    <NavItem onClick = {() => this.props.logout()}> Logout </NavItem>
                    </div> :
                    <NavItem href='/SignUp'>Signup</NavItem>}
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        authState : state.reducer.user
    })
}
export default connect(mapStateToProps,{logout})(Navigation);