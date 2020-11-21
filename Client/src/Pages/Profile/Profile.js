import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, Label, CardBody, Button, Row, Col} from 'reactstrap';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeInitials = this.onChangeInitials.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    this.updateProfile = this.updateProfile.bind(this);

    this.state = {
      currentProfile: {
        key: null,
        username: '',
        title: '',
        initials: '',
        lastname: '',
        email: '',
        address: '',
        phone: '',
      },
      msg: ""
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

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          username: username,
        },
      };
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
  onChangeInitials(e) {
    const initials = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          initials: initials,
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


  updateProfile() {
    const data = {
      username: this.state.currentProfile.username,
      title: this.state.currentProfile.title,
      initials: this.state.currentProfile.initials,
      lastname: this.state.currentProfile.lastname,
      email: this.state.currentProfile.email,
      address: this.state.currentProfile.address,
      phone: this.state.currentProfile.phone,
    };

    Db.update(this.state.currentProfile.key, data)
      .then(() => {
        this.setState({
          msg: "The profile was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { currentProfile,msg } = this.state;

    return (
      <div>
        {currentProfile
         ? (
          <Container>
          <div className="container col-lg-10  min-vh-100 d-flex flex-column justify-content-center">
          <Form >
                    <h3 className="text-center">Update your profile</h3>
                    <hr className="mb-5" />

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="initials">User name</Label>
                                <Input type="text" name="username" id="username"  value={currentProfile.username} onChange={this.onChangeUsername}/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="title">Your title</Label>
                                <Input type="select" name="title" id="title"  value={currentProfile.title} onChange={this.onChangeTitle} >
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
                                <Input type="text" name="initials" id="initials"  value={currentProfile.initials} onChange={this.onChangeInitials} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text" name="lastname" id="lastname"   value={currentProfile.lastname} onChange={this.onChangeLastname} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="address">Contact email</Label>
                        <Input type="text" name="email" id="email"    value={currentProfile.email} onChange={this.onChangeEmail} />
                    </FormGroup>
            
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address"    value={currentProfile.address} onChange={this.onChangeAddress} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input type="tel" name="phone" id="phone"    value={currentProfile.phone} onChange={this.onChangePhone} />
                    </FormGroup>

                    {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                    <FormGroup className="mt-5">
                        <Button onClick={this.updateProfile}  className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
          </Container>) 
          : (
         null)}
      
    </div>
    );
  }
}
