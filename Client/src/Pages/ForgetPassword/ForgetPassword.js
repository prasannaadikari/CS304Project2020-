import React, { Component } from 'react';
import {Label, Input, Form, FormGroup,Button} from 'reactstrap';

import Header from "../../components/Header";
import { doPasswordReset } from "../../helpers/auth";

export class ForgetPassword extends Component {
    constructor() {
        super();
        this.state = {
          error: null,
          email: ""
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
      await doPasswordReset(this.state.email);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
    
render() {  const {error } = this.state;
        return (
            <div><Header/>
              <div className="container col-lg-5 my-3 min-vh-100 d-flex flex-column justify-content-center">
                <Form className="p-5" onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Forget Password?</h3>
                    <hr className="mb-5" />
                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter your email address" />
                    </FormGroup>
                    <FormGroup className="mt-5">
                        <Button className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                    
                    {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                  </Form>
                </div>
            </div>
          
        )
    }
}  

export default ForgetPassword

