import React, { Component } from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
    render() {
        return (
            <div className = "container">
                <h5>Tasks for today</h5>
                <p>Check notifications for new orders</p>
            </div>
        );
    }
}

export default Dashboard;