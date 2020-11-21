import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle} from "../../helpers/auth";
import Header from "../../components/Header";
import * as ROUTES from '../../helpers/routes';

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
      this.props.history.push(ROUTES.CREATE_PROFILE);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  

  render() {
    return (
      <div className="container"><Header /><div className="container">
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
          <Link className="title ml-2" to="/">Service Center</Link>
          </h1>
          <p className="lead">Fill in the form below to create an account.</p>
          <div className="form-group">
            <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
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
