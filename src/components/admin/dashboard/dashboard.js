import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getTasks} from '../../store/Thunks/thunks';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getTasks();
    }
    render() {
        return (
            <div className = "container">
                <h5>Tasks for today</h5>
                <p>Check notifications for new orders</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.reducer);
    return ({
        tasks : state.reducer.tasks
    });
}

export default connect(mapStateToProps,{getTasks})(Dashboard);