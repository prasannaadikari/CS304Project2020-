
import React, { Component } from 'react'
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../../services/firebase';
import Header from "../../components/Header";
import * as ROUTES from '../../helpers/routes';
import Db from "../../helpers/Db";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeInitials = this.onChangeInitials.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    
        this.state = {
          username: null,
          title: null,
          initials: null,
          lastname: null,
          email: null,
          address: null,
          phone: null,
          user: auth().currentUser,
          error: null,
          msg: null
        };
      }

      


      onChangeUsername(e) {
        this.setState({
          username: e.target.value,
        });
      }
      onChangeTitle(e) {
        this.setState({
          title: e.target.value,
        });
      }
      onChangeInitials(e) {
        this.setState({
          initials: e.target.value,
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

      saveProfile() {
        if(this.state.username == null || this.state.title == null ||
            this.state.initials == null || this.state.lastname == null ||
            this.state.email == null || this.state.address == null || this.state.phone == null) {
            this.setState({ error: 'Fill all fields' });
            this.setState({ msg:null });
        }else{ 
        let data = {
            username:this.state.username,
            title:this.state.title,
            initials:this.state.initials,
            lastname:this.state.lastname,
            email:this.state.email,
            address:this.state.address,
            phone:this.state.phone,
            uid: this.state.user.uid,
        };
        this.setState({ msg: 'Created new appointment successfully!' });
        this.setState({ error:null });
        Db.createProfile(data)
        this.props.history.push(ROUTES.HOME);
    }
  }

    render() {  const {error,msg } = this.state;
        
        return ( 
            <div className="container col-lg-5 my-3 min-vh-100 d-flex flex-column justify-content-center">
              
                <Form className="p-5" >
                    <h3 className="text-center">Account Settings</h3>
                    <h6 className="lead text-primary" >Fill in the form below to create your profile.</h6>
                    <hr className="mb-5" />

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="initials">User name</Label>
                                <Input type="text" name="username" id="username"  placeholder="Enter your username" value={this.state.username} onChange={this.onChangeUsername}/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="title">Your title</Label>
                                <Input type="select" name="title" id="title"  value={this.state.title} onChange={this.onChangeTitle} >
                                    <option className="d-none">Title</option>
                                    <option>Mr</option>
                                    <option>Ms</option>
                                    <option>Mrs</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="initials">Initials</Label>
                                <Input type="text" name="initials" id="initials"  placeholder="Entered Initials"  value={this.state.initials} onChange={this.onChangeInitials} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text" name="lastname" id="lastname"  placeholder="Entered Last Name"  value={this.state.lastname} onChange={this.onChangeLastname} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="address">Contact email</Label>
                        <Input type="text" name="email" id="email"  placeholder="Entered your email"   value={this.state.email} onChange={this.onChangeEmail} />
                    </FormGroup>
            
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address"  placeholder="Entered Address"   value={this.state.address} onChange={this.onChangeAddress} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input type="tel" name="phone" id="phone"  placeholder="Entered Phone Number"  value={this.state.phone} onChange={this.onChangePhone} />
                    </FormGroup>

                    {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                    {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                    <FormGroup className="mt-5">
                        <Button onClick={this.saveProfile}  className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                </Form>

                
            </div>
        )
    }
}

export default Profile;