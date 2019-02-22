import React, { Component } from 'react';
import {Button,Modal, Badge} from 'react-materialize';
import {connect} from 'react-redux';
import './order.css';
import Post from '../postOrderes/post';
import {getOrder} from '../../store/Thunks/thunks';
import {Card,CardTitle} from 'react-materialize';


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state= {
            orders : []
        }
    }
    componentDidMount() {
        this.props.getOrder(this.props.user.orders);
    }

    static getDerivedStateFromProps( nextProps, prevState) {
        if( nextProps.orders !== prevState.orders )
        {
            return {
                orders: nextProps.orders
            }
        }
        else
            return null;    
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
    jobsPosted = () => {
        console.log("jobsPosted(): ");
        if(this.state.orders === undefined)
            return;
        console.log("Jobs posted is not undefined");
        var i=1;
        let jsx = this.state.orders.map( (order) => 
            {
                let badgeColor;
                if(order.status === "pending") {
                    badgeColor = "yellow";
                }
                else if(order.status === "accepted") {
                    badgeColor = "green";
                }
                else if(order.status === "rejected") {
                    badgeColor = "red";
                }
                return (
                    <div className = "col s12 m4" key = {i}>
                        <Card header={<CardTitle reveal image={order.url} waves='light'/>}
                            title={i++ +""}
                            reveal={<div>
                                        <p><b>Dimensions</b> : {order.len} X {order.width} X {order.height}</p>
                                        <p><b>Color </b> : {order.color}</p>
                                        <p><b>Layer Height </b>: {order.layerHeight} </p>
                                        <p><b>Price </b> : {order.price}</p>
                                        <p><b>Material </b>: {this.getMaterial(order.material)}</p>
                                    </div>
                                    }>
                            <p>Status : <Badge className = {badgeColor}>{order.status}</Badge></p>
                        </Card>
                    </div>
                );}
        );
        return jsx;
    }
    
    render() {
      
        return (
            <div className = "container">
                <h5>Your orders...</h5>
                <div className = "row" >
                    {this.jobsPosted()}
                </div>
                <Modal  header = "Order something else"
                        trigger = {<Button floating large className='red addButton' waves='light' icon='add' />}>
                        <Post />
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.reducer);
    return ({
        user : state.reducer.user,
        orders : state.reducer.orders   
    });
}

export default connect(mapStateToProps,{getOrder})(Orders);