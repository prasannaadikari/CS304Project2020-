import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export class LoginView extends Component {
    render() {
        return (
            <div className="container col-lg-5 my-3 min-vh-100 d-flex flex-column justify-content-center">
                <Form className="p-5">
                    <h3 className="text-center">Login</h3>
                    <hr className="mb-5" />

                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter your email address" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="Password" placeholder="Enter your password" />
                    </FormGroup>

                    <FormGroup className="mt-5">
                        <Button className="btn-block" color="primary">Login</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default LoginView
