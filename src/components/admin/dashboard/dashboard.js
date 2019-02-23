import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getTasks} from '../../store/Thunks/thunks';
import Dashcards from './DashCard';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : []
        }
    }
    
    componentDidMount() {
        this.props.getTasks();
    }
    // componentWillReceiveProps(nextProps) {
    //     if(nextProps !== this.props) {
    //         console.log("Hey");
    //         this.setState({
    //             tasks : nextProps.tasks
    //         });
    //     }
    // }
    render() {
        console.log(this.props.tasks);
        let jsx = this.props.tasks ? (this.props.tasks.map((order) => {
            return (
                <Dashcards order = {order} />
            );
        })) : "";
        return (
            <div className = "container">
                <h5>Tasks for today</h5>
                <p>Check notifications for new orders</p>
                <div className = "row">
                    {jsx}     
                </div>
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