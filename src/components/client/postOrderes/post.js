import React, { Component } from 'react';   
import {Row,Input,Button} from 'react-materialize';
import Uploader from '../uploader/uploader';
import {connect} from 'react-redux';
import {postOrder} from '../../store/Thunks/thunks';
import {storage} from '../../../firebase';
import './post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : "",
            material : 0,
            height : 0,
            width : 0,
            len : 0,
            layerHeight : 100,
            color : "",
            price : "",
            accept : false,
            orderPlaced : false,
            file : ""
        }
        this.handleUrl = (URL,filename) => {
            this.setState({
                url : URL,
                file: filename
            });
        }
        this.handleChange = (e) => {
            
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        this.calcPrice = () => {
            let materialVal = [70,90,140];
            let volume = parseFloat(this.state.height)*parseFloat(this.state.width)*parseFloat(this.state.len);
            let estimatedPrice = (volume*(materialVal[this.state.material]))/(this.state.layerHeight * 0.1);
            this.setState({
                price : estimatedPrice.toFixed(2)
            });
        }
        this.handleAccept = () => {
            var chk = document.getElementById("acceptChk");
            this.setState({
                accept : chk.checked
            });
            }
        this.handleSubmit = () => {
            console.log("Inside submit");
            let data = {
                url : this.state.url,
                len : this.state.len,
                width : this.state.width,
                height : this.state.height,
                material : this.state.material,
                layerHeight : this.state.layerHeight,
                color : this.state.color,
                price : this.state.price,
                status : "pending"
            };
            this.props.postOrder(data);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            console.log('Help me please');  
            if(nextProps.status) {
                this.setState({
                    url : "",
                    material : 0,
                    height : 0,
                    width : 0,
                    len : 0,
                    layerHeight : 100,
                    color : "",
                    price : "",
                    accept : false,
                    orderPlaced : false,
                    file : ""
                });
            }
        }
    }
    componentWillUnmount() {
        console.log("Unmounting soon....");
        if(this.props.status === undefined || this.props.status === false) {
            if(this.state.file !== "") {
                storage.child(`images/${this.filename}`).delete().then(() => {
                    console.log("File deleted");
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
    
    render() {
        let priceBtn =  ((this.state.height !== 0)&&(this.state.width !== 0)&&(this.state.len !== 0)&&(this.state.color !== "" )&&(this.state.url !== ""));
        return (
            <div>
                <Row>
                    
                    <Input type = "select"  label = "Material Type"  s={12} name = "material"  value = {this.state.material} onChange = {this.handleChange}>
                        <option value = "0">Plastic</option>
                        <option value = "1">Resins</option>
                        <option value = "2">PolyAmide(SLS)</option>
                    </Input>
                    <p>Please Enter the size in mm : </p>
                    <Row>
                        <Input type="number" label = 'Height(mm)' s = {4} name = "height"  value = {this.state.height}  onChange = {this.handleChange}></Input>
                        <Input type="number" label = 'Width(mm)' s = {4} name = "width" value = {this.state.width} onChange = {this.handleChange}></Input>
                        <Input type="number" label = 'Length(mm)' s = {4} name = "len" value = {this.state.len} onChange = {this.handleChange}></Input>
                    </Row>
                    <Input type = "select"  label = "Layer Height (in microns)" defaultValue = "100" s={12} name = "layerHeight"  onChange = {this.handleChange}>
                        <option value = "50">50</option>
                        <option value = "100">100</option>
                        <option value = "200">200</option>
                        <option value = "300">300</option>
                    </Input>
                    <p>Color : (hex code)</p>
                    <Input type = "text" label = "Color" s = {12} name = "color" value = {this.state.color} onChange = {this.handleChange}/>
                    <p>Please upload an Image/3D Image</p>
                    <Uploader setURL = {this.handleUrl}/>
                    <p className = "red-text text-darken-2"> * Note all fields are mandatory</p>
                    <Button waves = "light" disabled = {!priceBtn} onClick = {this.calcPrice} className = "calc-btn">Calculate price</Button>
                    {this.state.price !== "" ? <div>
                        <h5 className = "green-text text-darken-2">{"Estimated cost : Rs."+this.state.price}</h5>
                        <small className = "red-text text-darken-2">**Note these prices are only estimate, actual prices may vary</small>
                        <Input name="accept" type="checkbox" value ="true" label = "I accept the terms and conditions" onChange = {this.handleAccept} id = 'acceptChk' s = {12}/>
                    </div> : ""}
                    {this.state.accept && <Button waves = "light" onClick = {this.handleSubmit} className = "calc-btn">Place Order</Button>}
                    <br/><br/>
                    {this.props.status && <p>Your order has been placed! We'll reach out to you soon.</p>}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.reducer.uploadState);
    return ({
        status : state.reducer.uploadState
    })
}
export default connect(mapStateToProps,{postOrder})(Post);