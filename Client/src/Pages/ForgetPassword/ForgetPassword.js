import React, { Component } from 'react';
import {Label, Input, Form, FormGroup,Button} from 'reactstrap';

import Header from "../../components/Header";
import { doPasswordReset } from "../../helpers/auth";

export class ForgetPassword extends Component {
    constructor() {
        super();
        this.state = {
          error: null,
          msg: null,
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
      this.setState({ error:null,msg: 'Password reset email sent successfully'  });
    } catch (error) {
      this.setState({msg:null, error: error.message });
    }
  }
    
render() {  const {error,msg } = this.state;
        return (
            <div><div className="py-4"></div><div className="fixed-top"><Header/></div>
              <div className="container col-lg-5 my-3 min-vh-100 d-flex flex-column justify-content-center">
                <Form className="p-5" onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Forget Password?</h3>
                    <hr className="mb-5" />
                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter your email address" />
                    </FormGroup>
                    {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                    {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                    <FormGroup className="mt-5">
                        <Button className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                    
                    
                  </Form>
                </div>
            </div>
          
        )
    }
}  

export default ForgetPassword

