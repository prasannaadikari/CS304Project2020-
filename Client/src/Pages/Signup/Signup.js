import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row,FormGroup, Label, Input} from 'reactstrap';

import { signup} from '../../helpers/auth';
import Header from '../../components/Header';
import * as ROUTES from '../../helpers/routes';
import Db from '../../helpers/Db';
import { auth } from '../../services/firebase';

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
      title:'',
      lastname:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) { const {title,lastname} = this.state;
    event.preventDefault();
    this.setState({ error: '' });
    try {
      if(!lastname.match(/^[a-zA-Z]+$/)) {
          this.setState({error:'Last name can only contain letters'}); 
          return;
      }
      else if(!title.match(/^[a-zA-Z]+$/)){
          this.setState({error:'Title cannot be empty'});
          return;
      }
      await signup(this.state.email, this.state.password);
      let data = {
        title:this.state.title,
        lastname:this.state.lastname,
        email:this.state.email,
        address:'address',
        phone:'phone',
        uid:auth().currentUser.uid,
    };
    Db.createProfile(data)
    this.props.history.push(ROUTES.HOME);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div><Header /><div className="container">
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
          <Link className="title ml-2" to="/">Service Center</Link>
          </h1>
          <p className="lead">Fill in the form below to create an account.</p>
          <div className="form-group">
          <Label for="title">Email</Label>
            <input className="form-control" placeholder="Enter your email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="form-group">
          <Label for="title">Password</Label>
            <input type="password" className="form-control" placeholder="Enter your password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="select" name="title" id="title" placeholder="Select your title" value={this.state.title} onChange={this.handleChange} >
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
                                <Input type="text" name="lastname" id="lastname"  placeholder="Entered your last name"  value={this.state.lastname} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className="btn btn-primary px-5" type="submit">Sign up</button>
          </div>
          
          <hr></hr>
          <p>Already have an account? <Link to={ROUTES.LOG_IN}>Log in</Link></p>
        </form>
      </div></div>
    )
  }
}
