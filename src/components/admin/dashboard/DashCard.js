import React, { Component } from 'react';
import {Card,CardTitle,Input} from 'react-materialize';
import Button from 'react-materialize/lib/Button';
import {connect} from 'react-redux';
import './dash.css';
import {sendMail} from '../../store/Thunks/thunks';

class Dashcards extends Component {
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
    handleDeliver = () => {
        let data = {
            status : "Deliver",
            userEmail : this.props.order.contactEmail,
            id : this.props.order.orderId
        }
        this.props.sendMail(data);
        console.log("Send Deliver email");
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
        console.log(order);
        return (
            <div>
               <div className = "col s12 m6 black-text" key = {order.userid}>
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
                            <h6>Deliver : <Button className = "deliver-btn" onClick = {this.handleDeliver}>Deliver</Button></h6>
                        </Card>
                    </div> 
            </div>
        );
    }
}

export default connect(null,{sendMail})(Dashcards);