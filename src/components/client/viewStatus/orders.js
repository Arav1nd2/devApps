import React, { Component } from 'react';
import {Button,Modal} from 'react-materialize';
import {connect} from 'react-redux';
import './order.css';
import Post from '../postOrderes/post';


class Orders extends Component {
    
    render() {
        let displayValue = this.props.user ? (
            this.props.user.orders.map((order) => {
                return (
                    <div className="row">
                        <div className="col s12 m12">
                        <div className="card">
                            <div className="card-content">
                            <span className="card-title">Card Title</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                            <Button>This is a link</Button>
                            <Button>This is a link</Button>
                            </div>
                        </div>
                        </div>
                    </div>
                )
            })
        ) : "";
        return (
            <div className = "container">
                <h5>Your orders...</h5>
                {displayValue}
                <Modal  header = "Order something else"
                        trigger = {<Button floating large className='red addButton' waves='light' icon='add' />}>
                        <Post />
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        user : state.reducer.user
    });
}

export default connect(mapStateToProps)(Orders);