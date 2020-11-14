import React, { Component } from 'react'
import _ from 'lodash';
import {Card, CardTitle, CardBody, Row, Col,Button, Input,Form, FormGroup} from 'reactstrap';

export class Appointment extends Component {

    Appointments = [
        {   
            name: 'cus name',
            vehicleNo:'cp MM-XXXX',
        }
        ]

    Dones = [
        {   
            name: 'cus name',
            vehicleNo:'cp MM-XXXX',
        }
        ]
    Processings = [
        {   
            name: 'cus name',
            vehicleNo:'cp MM-XXXX',
        }
        ]        
    
   renderAppointments = () => {
        return (
            _.map(this.Appointments, (Appointment) => {
                return (
                    <Col md="12" className="py-3">
                        <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <CardTitle ><b>{Appointment.name}</b></CardTitle>
                                        <CardTitle >{Appointment.vehicleNo}</CardTitle>
                                    </Col>
                                    <Col xs="">
                                    </Col>
                                    <Col xs="auto">
                                        <Button className="btn-block" color="success">Process</Button>
                                    </Col>    
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }

    renderProcessings = () => {
        return (
            _.map(this.Processings, (Processing) => {
                return (
                    <Col md="12" className="py-3">
                        <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <CardTitle ><b>{Processing.name}</b></CardTitle>
                                        <CardTitle >{Processing.vehicleNo}</CardTitle>
                                    </Col>
                                    <Col xs="">
                                    </Col>
                                    <Col xs="auto">
                                        <Form>
                                            <FormGroup>
                                        <Input type="file" name="file" id="File"/>
                                        </FormGroup>
                                            <FormGroup>
                                        <Button color="primary">Done</Button>
                                        </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }

    renderDones = () => {
        return (
            _.map(this.Dones, (Done) => {
                return (
                    <Col md="12" className="py-3">
                        <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <CardTitle ><b>{Done.name}</b></CardTitle>
                                        <CardTitle >{Done.vehicleNo}</CardTitle>
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
                <Row>
                    <Col xs="9">
                        <h3>Appointments</h3>
                    </Col>
                    <Col xs="auto" >
                        
                    </Col>
                </Row>
                <hr md="12" className="py-3" style={{height:5}}/>
                <div className="py-4">
                    <Row>
                        {this.renderAppointments()}
                    </Row>
                </div>
                <h3>Processing</h3>
                <hr md="12"/>
                <div className="py-4">
                    <Row>
                        {this.renderProcessings()}
                    </Row>
                </div>
                <h3>Done</h3>
                <hr md="12"/>
                <div className="py-4">
                    <Row>
                        {this.renderDones()}
                    </Row>
                </div>
            </div>
        )
    }
}  


export default Appointment
