import React, { Component } from 'react'
import { Col, Row, FormGroup, Input, Form, Button, Card, CardTitle, CardBody} from 'reactstrap';
import _ from 'lodash';

export class SearchVehicle extends Component {

    Profiles = [
        {  
            name:'cus name',
            email:'cus email',
            tp:'cus tp',
            address:'cus address',
        }
    ]

    renderProfiles = () => {
        return (
            _.map(this.Profiles, (Profile) => {
                return (
                    <Col md="12" className="py-3">
                        <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="9">
                                <CardTitle ><b>{Profile.name}</b></CardTitle>
                                <CardTitle >{Profile.email}</CardTitle>
                                <CardTitle >{Profile.tp}</CardTitle>
                                <CardTitle >{Profile.address}</CardTitle>
                                </Col>
                                <Col xs="auto">
                                <FormGroup>
                                    <Input type="nic" name="nic" id="nic" placeholder="enter NIC" />
                                </FormGroup>
                                <Button className="btn-block" color="primary">Edit Profile</Button> 
                                <Button className="btn-block" color="primary">Delete Profile</Button>             
                                </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }
    
    render() {
        return (
            <div className="container py-5">
                <h3>Search Customer</h3>
                <Row>
                    <Form inline className="py-3">
                        <Col xs="auto">
                            <FormGroup>
                                <Input type="select" name="select" id="select">
                                    <option className="d-none">Search by</option>
                                    <option>Email</option>
                                    <option>NIC</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="auto">   
                            <FormGroup>
                                <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter" />
                            </FormGroup>
                        </Col>
                        <Col xs="auto">
                            <FormGroup>
                                <Button className="btn-block" color="primary">Search</Button>
                            </FormGroup>
                        </Col>
                    </Form>
                </Row>
                <hr md="12" className="py-3"/>
                <div className="py-4">
                    <Row>
                        {this.renderProfiles()}
                    </Row>
                </div>
            </div>
        )
    }
}

export default SearchVehicle