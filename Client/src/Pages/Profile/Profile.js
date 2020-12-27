import React, { Component } from "react";
import {Form,Input,Container, FormGroup, Label,Button, Row, Col} from 'reactstrap';
import {Offline,Online} from "react-detect-offline";

import Db from "../../helpers/Db";
import * as ROUTES from '../../helpers/routes';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    this.updateProfile = this.updateProfile.bind(this);

    this.state = {
      currentProfile: {
        key: null,
        title: null,
        lastname: null,
        email: null,
        address: null,
        phone: null,
      },
      msg: "",
      error:''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { profile } = nextProps;
    if (prevState.currentProfile.key !== profile.key) {
      return {
        currentProfile: profile,
        msg: ""
      };
    }

    return prevState.currentProfile;
  }

  componentDidMount() {
    this.setState({
      currentProfile: this.props.profile,
    });
  }


  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          title: title,
        },
      };
    });
  }
  onChangeLastname(e) {
    const lastname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          lastname: lastname,
        },
      };
    });
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          email: email,
        },
      };
    });
  }
  onChangeAddress(e) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          address: address,
        },
      };
    });
  }
  onChangePhone(e) {
    const phone = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          phone: phone,
        },
      };
    });
  }


  updateProfile() { const {title,lastname,email,phone,address} = this.state;
  if(!lastname.match(/^[a-zA-Z]+$/)) {
      this.setState({msg:null,error:'Last name can only contain letters'}); 
      return;
  }else if((lastname === null && title === null) || (lastname !== null && title !== null)) {
      this.setState({msg:null,error:null});
  }else if(lastname !== null && title === null){
      this.setState({msg:null,error:'Title cannot be empty'});
      return;
  }

  if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { 
      this.setState({msg:null,error:'Invalid email'});
      return;
  }

  if(address === null){
    this.setState({msg:null,error:'Address cannot be empty'});
    return;
  }

  if(!phone.match(/^[0-9]{10}$/)) {
      this.setState({msg:null,error:'Phone number cannot contain letters or space and should be ten digits'}); 
      return;
  }
    
    const data = {
      title: this.state.currentProfile.title,
      lastname: this.state.currentProfile.lastname,
      email: this.state.currentProfile.email,
      address: this.state.currentProfile.address,
      phone: this.state.currentProfile.phone,
    };

    Db.updateProfile(this.state.currentProfile.key, data)
      .then(() => {
        this.setState({ msg: "The profile was updated successfully!",error:null });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  ifOffline= () =>{
    this.setState({msg:null,error:'Unable to connect. Please review your network settings...'});
  }

  render() {
    const { currentProfile,msg,error } = this.state;

    return (
      <div>
        {currentProfile
         ? (
          <Container>
          <div>
          <Form >
                    <h4>Update your profile</h4>
                    <hr className="mb-5" />

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="select" name="title" id="title"  value={this.state.title} onChange={this.onChangeTitle} >
                                    <option className="d-none">Select your title</option>
                                    <option>Mr</option>
                                    <option>Miss</option>
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
                    <Online>
                      <Button onClick={this.updateProfile} className="btn-block" color="primary">Submit</Button>
                    </Online>
                    <Offline>
                      <Button onClick={this.ifOffline} className="btn-block" color="primary">Submit</Button>
                    </Offline>
                </Form>
            </div>
          </Container>) 
          : (
         null)}
    </div>
    );
  }
}
