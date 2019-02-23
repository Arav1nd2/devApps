import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getNotifs} from '../../store/Thunks/thunks';
import {Card,CardTitle,Badge} from 'react-materialize';
import Button from 'react-materialize/lib/Button';

class Notifs extends Component {
    
    componentDidMount() {
        this.props.getNotifs();
    }
    handleAccept = () => {
        console.log("Send Accepted email");
    }
    handleReject = () => {
        console.log("Send rejection mail");
    }
    getMaterial(m) {
        switch(m) {
            case 0 : 
                return "Plastic";
            case 1 :
                return "Resins";
            case 2 : 
                return "PolyAmide(SlS)";
            default :
                return  "Plastic";
        }
    }
    render() {
        let jsx = this.props.notifs ? (this.props.notifs.map((order) => {
            let i =1;
            return (
                <div className = "col s12 m6" key = {order.userid}>
                        <Card header={<CardTitle reveal image={order.url} waves='light'/>}
                            title={i +""}
                            reveal={<div>
                                        <p><b>Dimensions</b> : {order.len} X {order.width} X {order.height}</p>
                                        <p><b>Color </b> : {order.color}</p>
                                        <p><b>Layer Height </b>: {order.layerHeight} </p>
                                        <p><b>Price </b> : {order.price}</p>
                                        <p><b>Material </b>: {this.getMaterial(order.material)}</p>
                                    </div>
                                    }>
                            <p>Status : <Button onClick = {this.handleAccept}>Accept</Button>  <Button onClick = {this.handleReject}>Reject</Button></p>
                        </Card>
                    </div>
            );
        })) : "";
        return (
            <div className = "container">
                <h5>Notifications</h5> 
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
        notifs : state.reducer.notifs 
    });
}

export default connect(mapStateToProps,{getNotifs})(Notifs);          