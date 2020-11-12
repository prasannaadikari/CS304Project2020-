import React, { Component } from 'react'
//import _ from './node_modules/lodash';
import {Card, CardTitle, CardBody, Button, Row, Col} from 'reactstrap';
import Header from "../../components/Header";

import { auth } from "../../services/firebase";
import { db } from "../../services/firebase";

export class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: auth().currentUser,
          appointment: [],
          writeError: null,
          loadingAppointments: false
        };
    }
    
      async componentDidMount() {
        this.setState({ readError: null, loadingAppointments: true });
        const chatArea = this.myRef.current;
        try {
          db.ref("appointments").on("value", snapshot => {
            let appointment = [];
            snapshot.forEach((snap) => {
                appointment.push(snap.val());
            });
            appointment.sort(function (a,b,c) { return a.vehicleNo - b.appointmentDate - c.status })
            this.setState({ appointment });
            this.setState({ loadingAppointments: false });
          });
        } catch (error) {
          this.setState({ readError: error.message, loadingAppointments: false });
        }
      }

    /*Vehicles = [
    {   vehicleNo:'cp MM-XXXX',
        date: '2020-xx-yy',
        status: 'waiting'
    }
    ]

    renderVehicles = () => {
        return (
            _.map(this.Vehicles, (Vehicle) => {
                return (
                    <Col md="12" className="py-3">
                        <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <CardTitle ><b>{Vehicle.vehicleNo}</b></CardTitle>
                                        <CardTitle >{Vehicle.date}</CardTitle>
                                    </Col>
                                    <Col xs="">
                                    </Col>
                                    <Col xs="auto">
                                        <CardTitle className="ml-3 text-left text-uppercase" >{Vehicle.status}</CardTitle>
                                        <Button className="btn-block" color="primary">Cancle Appointment</Button>             
                                    </Col>    
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }*/

    render() {
        return (
            <div className="container py-5">
                <Header />
                <Row>
                    <Col xs="9">
                        <h3>Appointments</h3>
                    </Col>
                    <Col xs="auto" >
                        <Button color="primary">Make an Appointment</Button>{' '}
                    </Col>
                </Row>
                <hr md="12" className="py-3"/>
                <div className="py-4">
                    <Row>
                        {this.state.appointment.map(appointment => {
                            return (
                                <Col md="12" className="py-3">
                                    <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                        <CardBody>
                                            <Row>
                                                <Col xs="6">
                                                    <CardTitle ><b>{appointment.vehicleNo}</b></CardTitle>
                                                    <CardTitle >{appointment.appointmentDate}</CardTitle>
                                                </Col>
                                                <Col xs="">
                                                </Col>
                                                <Col xs="auto">
                                        <CardTitle className="ml-3 text-left text-uppercase" >{appointment.status}</CardTitle>
                                        <Button className="btn-block" color="primary">Cancle Appointment</Button>             
                                    </Col>    
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })}
                    </Row>
                </div>
            </div>
        )
    }
}  


export default Appointment
