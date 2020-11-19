
import React, { Component } from 'react'
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose';
import Header from "../../components/Header";




export class Profile extends Component {
    


    render() {
        
        return (
            <div className="container col-lg-5 my-3 min-vh-100 d-flex flex-column justify-content-center"><Header/>
                <Form className="p-5" >
                    <h3 className="text-center">Account Settings</h3>
                    <hr className="mb-5" />
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="initials">Initials</Label>
                                <Input type="text" name="initials" id="initials" placeholder="Entered Initials" />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text" name="lastname" id="lastname" placeholder="Entered Last Name" />
                            </FormGroup>
                        </Col>
                    </Row>
            
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" placeholder="Entered Address"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input type="tel" name="phone" id="phone"  placeholder="Entered Phone Number"/>
                    </FormGroup>

                    
                    <FormGroup className="mt-5">
                        <Button className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}


export default Profile;