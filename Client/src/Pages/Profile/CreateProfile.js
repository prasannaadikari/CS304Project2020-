import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {Offline,Online} from "react-detect-offline";

import { auth } from '../../services/firebase';
import * as ROUTES from '../../helpers/routes';
import Db from "../../helpers/Db";
import Header from "../../components/Header";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    
        this.state = {
          title: null,
          lastname: null,
          email: null,
          address: null,
          phone: null,
          user:auth().currentUser,
          error:null,
          msg: null,
        };
      }

      onChangeTitle(e) {
        this.setState({
          title: e.target.value,
        });
      }
      onChangeLastname(e) {
        this.setState({
          lastname: e.target.value,
        });
      }
      onChangeEmail(e) {
        this.setState({
          email: e.target.value,
        });
      }
      onChangeAddress(e) {
        this.setState({
          address: e.target.value,
        });
      }
      onChangePhone(e) {
        this.setState({
          phone: e.target.value,
        });
      }

    saveProfile() { const {title,lastname,email,address,phone} = this.state;
      
      if(lastname === null ) {
        this.setState({error:'Last name cannot be empty'});
        return;
      }else if(!lastname.match(/^[a-zA-Z]+$/)) {
          this.setState({error:'Last name can only contain letters'}); 
          return;
      }else if((lastname === null && title === null) || (lastname !== null && title !== null)) {
        this.setState({error:null});
      }
      
      if(title === null){
          this.setState({error:'Title cannot be empty'});
          return;
      }

      if(address === null){
        this.setState({error:'Address cannot be empty'});
        return;
      }

      if(email === null){
        this.setState({error:'email cannot be empty'});
        return;
      }else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { 
          this.setState({error:'Invalid email'});
          return;
      }
      
      if(phone === null){
        this.setState({error:'Phone No cannot be empty'});
        return;
      }else if(!phone.match(/^[0-9]{10}$/)) {
          this.setState({error:'Phone number cannot contain letters or space and should be ten digits'}); 
          return;
      }

      if (auth().currentUser.uid===null) {
        this.props.history.push(ROUTES.HOME);
      }
       let data = {
            title:title,
            lastname:lastname,
            email:email,
            address:address,
            phone:phone,
            uid:auth().currentUser.uid,
        };
        Db.createProfile(data)
        this.setState({msg: 'Created a new profile successfully!' });
        this.props.history.push(ROUTES.HOME);
      
  }

  ifOffline= () =>{
    this.setState({msg:null,warning:null,error:'Unable to connect. Please review your network settings...'});
  }

    render() {  const {error,msg } = this.state;
        
        return ( 
          <div><Header/>
            <div className="container col-lg-5 my-3 min-vh-100 d-flex flex-column justify-content-center">
              
                <Form className="p-5" >
                    <h3 className="text-center">Account Settings</h3>
                    <h6 className="lead text-primary" >Fill in the form below to create your profile.</h6>
                    <Button href={ROUTES.HOME} className="btn" color="info">SKIP</Button>
                    <hr className="mb-5" />

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="select" name="title" id="title"  value={this.state.title} onChange={this.onChangeTitle} >
                                    <option className="d-none">Select your title</option>
                                    <option>Mr</option>
                                    <option>Ms</option>
                                    <option>Mrs</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text" name="lastname" id="lastname"  placeholder="Entered your last name"  value={this.state.lastname} onChange={this.onChangeLastname} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="email">Contact email</Label>
                        <Input type="text" name="email" id="email"  placeholder="Entered your email"   value={this.state.email} onChange={this.onChangeEmail} />
                    </FormGroup>
            
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address"  placeholder="Entered your address"   value={this.state.address} onChange={this.onChangeAddress} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input type="tel" name="phone" id="phone"  placeholder="Entered your phone number"  value={this.state.phone} onChange={this.onChangePhone} />
                    </FormGroup>

                    {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                    {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                    <FormGroup className="mt-5">
                    <Online>
                                <Button onClick={this.saveAppointment} className="btn-block" color="primary">Submit</Button>
                              </Online>
                              <Offline>
                                <Button onClick={this.ifOffline} className="btn-block" color="primary">Submit</Button>
                              </Offline> 
                    </FormGroup>
                </Form>

                </div>
            </div>
        )
    }
}

export default Profile;