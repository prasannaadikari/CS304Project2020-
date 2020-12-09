import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin} from "../../helpers/auth";
import Header from "../../components/Header";
import * as ROUTES from '../../helpers/routes';
import { auth } from "../../services/firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      user: auth().currentUser,
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
    this.setState({ error: "" });
    try {
      await signin(this.state.password);
      this.props.history.push(ROUTES.HOME);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  
  render() { const {error } = this.state;
    return (
      <div><Header/><div className="container">
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Login to
            <Link className="title ml-2" to="/">
            Service Center
            </Link>
          </h1>
          <p className="lead">
            Fill in the form below to login.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <p> <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link> </p>
             <button className="btn btn-primary px-5" type="submit">Log in</button>
          </div>
          
          
        </form>
        </div>
      </div>
    );
  }
}
