import React, { Component } from 'react';
import {Card,CardTitle,Input} from 'react-materialize';
import Button from 'react-materialize/lib/Button';
import {connect} from 'react-redux';
import {sendMail} from '../../store/Thunks/thunks';
import './notif.css';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reject : false,
            reason : ""
        }
        this.handleChange = (e) => {
            this.setState({
                reason : e.target.value
            });
        }
    }
    handleAccept = () => {
        let data = {
            status : "Accepted",
            userEmail : this.props.order.contactEmail,
            deliveryTime : this.props.len>10 ? this.props.len/10 : this.props.len,
            id : this.props.order.orderId
        }
        this.props.sendMail(data);
        console.log("Send Accepted email");
    }
    handleReject = () => {
        if(this.state.reject) {
            let data = {
                status : "Rejected",
                userEmail : this.props.order.contactEmail,
                reason : this.state.reason,
                id : this.props.order.orderId
            }
            this.props.sendMail(data);
        }
        this.setState({
            reject : true
        });
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
        let {order} = this.props;
        return (
            <div>
               <div className = "col s12 m6" key = {order.userid}>
                        <Card header={<CardTitle reveal image={order.url} waves='light'/>}
                            title={this.props.i +""}
                            reveal={<div>
                                        <p><b>Dimensions</b> : {order.len} X {order.width} X {order.height}</p>
                                        <p><b>Color </b> : {order.color}</p>
                                        <p><b>Layer Height </b>: {order.layerHeight} </p>
                                        <p><b>Price </b> : {order.price}</p>
                                        <p><b>Material </b>: {this.getMaterial(order.material)}</p>
                                    </div>
                                    }>
                            {this.state.reject && <div><Input type = "text" label = "Reason" value = {this.state.reason} onChange = {this.handleChange} /><br/><br/></div>}
                            <h6>Status : <Button className = "accept-btn" onClick = {this.handleAccept}>Accept</Button>  <Button className = 'reject-btn' onClick = {this.handleReject}>Reject</Button></h6>
                        </Card>
                    </div> 
            </div>
        );
    }
}

export default connect(null,{sendMail})(Cards);