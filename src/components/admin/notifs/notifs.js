import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getNotifs} from '../../store/Thunks/thunks';
import Cards from './cards';

class Notifs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifs : []
        }
    }
    
    
    componentDidMount() {
        this.props.getNotifs();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            console.log("hello1");
            if(nextProps.notifs) {
                if(nextProps.notifs.length !== this.state.notifs.length) {
                    console.log("Hey");
                    this.setState({
                        notifs : nextProps.notifs
                    });
                }
            }
            
        }
    }
    
    render() {
        let i=0;
        let jsx = this.state.notifs.length ? (this.props.notifs.map((order) => {
            i++;
            return (
                <Cards order = {order} len= {this.props.notifs.length} i={i}/>
            );
        })) : "";
        return (
            <div className = "container">
                <h5>Notifications</h5> 
                <div className = "row black-text">
                    {jsx}     
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.reducer);
    return ({
        notifs : state.reducer.notifs 
    });
}

export default connect(mapStateToProps,{getNotifs})(Notifs);          