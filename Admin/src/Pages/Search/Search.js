import React, { Component } from 'react'
import { Col, Row, FormGroup, Input, Form, Button, Card, CardTitle, CardBody} from 'reactstrap';
import _ from 'lodash';

import * as ROUTES from '../../helpers/routes';
import { Link } from 'react-router-dom';
import Header from "../../components/Header";
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
                                    <Col xs="12">
                                <CardTitle ><b>{Profile.name}</b></CardTitle>
                                <CardTitle >{Profile.email}</CardTitle>
                                <CardTitle >{Profile.tp}</CardTitle>
                                <CardTitle >{Profile.address}</CardTitle>
                                </Col>
                                
                                <Col xs="3">
                                <Button className="btn-block" color="primary" href={ROUTES.PROFILE}>Edit</Button> 
                                <Button className="btn-block" color="primary">Delete</Button>             
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
            <div className="container py-5"><Header/><div className="container py-5">
                <h3>Search Customer</h3>
                <Row>
                    <Form inline className="py-3">
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
            </div></div>
        )
    }
}

export default SearchVehicle