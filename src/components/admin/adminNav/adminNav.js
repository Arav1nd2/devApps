import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-materialize';

class AdminNav extends Component {
    render() {
        return (
            <div >
                <nav>
                    <Navbar brand = "&nbsp;ProdPrint" className = "navBar" right>
                    <div> 
                        <ul>
                        {                  
                        (this.props.authState ?
                            <div>
                            <li><NavLink to = '/admin/daksh2k19/dashboard'>Home</NavLink></li>
                            <li><NavLink to='/admin/daksh2k19/notifs'>Notifications</NavLink></li>
                            <li><NavLink to = '/admin/daksh2k19/login' onClick = {() => this.props.logout()}>Logout</NavLink></li>
                            </div> :
                            <div>
                            <li><NavLink to = '/admin/daksh2k19/login'>Login</NavLink></li>
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

export default AdminNav;   