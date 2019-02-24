import React, { Component } from 'react';
import './home.css'
import small from '../../assets/steps_small.PNG';
import large from '../../assets/steps_large.PNG';
import res50 from '../../assets/res50.png';
import res100 from '../../assets/res100.png';
import res200 from '../../assets/res200.png';
import res300 from '../../assets/res300.png';
import Magnifier from "react-magnifier";
import {Icon} from 'react-materialize';

class Home extends Component {
    render() {
        return (
            <div>
                <div className ="container">
                <br/>
                <h3 className = "center-align">Your 3D printing service</h3>  
                <h6 className = "center-align slogan">PropPrint is your online 3D printing service. Upload your 3D model, choose from 100+ different finishes and materials, select the size of your print, receive a price quote instantly and let us take care of printing and shipping your products.</h6>
                </div>
                <div className = "steps">
                    <h4 className = "center-align">How to order a 3D print</h4>
                    <img className = "small-step" src = {small} alt = "..."/>
                    <img className = "large-step" src = {large} alt = "..."/>
                </div>    
                <div className = 'container'>
                <h4 className = "center-align">Know the Print quality</h4>
                <br/>
                <p className = "center-align">Hover your cursor to magnify</p>
                <br/>
                <div className = "row">
                <div className = "col s12 m6 l3 img">
                    <p className = "center-align">Layer height 50 microns</p>
                    <Magnifier src = {res50} zoomFactor = '2' mgShape = 'circle' />
                </div>
                <div className = "col s12 m6 l3 img">
                    <p className = "center-align">Layer height 100 microns</p>
                    <Magnifier src = {res100} zoomFactor = '2' mgShape = 'circle' />
                </div>
                <div className = "col s12 m6 l3 img">
                    <p className = "center-align">Layer height 200 microns</p>
                    <Magnifier src = {res200} zoomFactor = '2' mgShape = 'circle' />
                </div>
                <div className = "col s12 m6 l3 img">
                    <p className = "center-align">Layer height 300 microns</p>
                    <Magnifier src = {res300} zoomFactor = '2' mgShape = 'circle' />
                </div>
                </div>
                <h5 className = "center-align alt-img">Please view in desktop to enable this feature</h5>
                </div>
                <div className = "steps">
                    <div className = "container">
                        <h5 className = "left-align">Contact Us</h5>
                        <h6 className = "left-align"><Icon>phone</Icon> +91-1234567890</h6>
                        <h6 className = "left-align"><Icon>mail</Icon> example@email.com</h6>
                        <h6 className = "left-align"><Icon>location_on</Icon> No. 22, North Usman Road, Chennai - 600001</h6>
                        <p className = "left-align">Having trouble? Call us at our toll-free number : 800-867-890</p>
                    </div>                
                </div>
                <p className = "center-align"><small><Icon className = "tiny">copyright</Icon> Rights Reserved.</small></p>
            </div>
        );
    }
}

export default Home;