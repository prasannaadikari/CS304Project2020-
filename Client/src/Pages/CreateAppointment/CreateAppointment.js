import React, { Component } from 'react'
import moment from 'moment'
import { Col, Row, Card, CardTitle, CardBody, FormGroup,Input,Form, Button, Progress } from 'reactstrap';
//import _ from './node_modules/lodash';
import Header from "../../components/Header";

import { auth } from "../../services/firebase";
import { db } from "../../services/firebase";


export class CreateAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: auth().currentUser,
          appointment: [],
          vehicleNO: '',
          appointmentDate: '',
          writeError: null
        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChangeday1 = this.handleChangeday1.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);

        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
        
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleSubmit4 = this.handleSubmit4.bind(this);
        
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleSubmit5 = this.handleSubmit5.bind(this);
        
        this.myRef = React.createRef();
      }
    handleChange(event) {
        this.setState({
            vehicleNO: event.target.value,
            appointmentDate: event.target.value
        });
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("appointment").push({
            vehicleNO: this.state.vehicleNO,
            appointmentDate: this.state.appointmentDate,
            status: 'waiting',
            uid: this.state.user.uid
          });
          this.setState({ vehicleNO: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }    


    /*Dates = [
        {   
            day:moment().format("dddd"),
            date: moment().format("Do MMMM YYYY"),
            Appointment: '5'
        },
        {   
            day:moment().add(1,'days').format("dddd"),
            date: moment().add(1,'days').format("Do MMMM YYYY"),
            Appointment: '3'
        },
        {   
            day:moment().add(2,'days').format("dddd"),
            date: moment().add(2,'days').format("Do MMMM YYYY"),
            Appointment: '9'
        },
        {   
            day:moment().add(3,'days').format("dddd"),
            date: moment().add(3,'days').format("Do MMMM YYYY"),
            Appointment: '9'
        },
        {   
            day:moment().add(4,'days').format("dddd"),
            date: moment().add(4,'days').format("Do MMMM YYYY"),
            Appointment: '9'
        }
        ]

  
       renderDates = () => {
            return (
                _.map(this.Dates, (Date) => {

                    return (
                        <Col md="12" className="py-2">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody> 
                                    <CardTitle><b>{Date.day}</b></CardTitle>
                                    <CardTitle><b>{Date.date}</b></CardTitle>
                                    <Progress striped color="info" value={Date.Appointment*10}><b>{Date.Appointment}</b></Progress>
                                    <Row>
                                        <Form inline className="py-3">
                                            <Col xs="auto">
                                                <FormGroup inline>
                                                    <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter Vehicle No" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="auto">
                                                <FormGroup>
                                                    <Button className="btn-block" color="primary">Create</Button>
                                                </FormGroup>
                                            </Col>
                                        </Form>
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
                <h3> Create Appointment</h3>   
                <hr md="12" className="py-3"/>
                    <div className="py-4">
                        <Row>
                            <Col md="12" className="py-2">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody> 
                                    <CardTitle onChange={this.handleChangeday1} value={this.state.appointmentDate}><b>{moment().format("dddd")}</b></CardTitle>
                                    <CardTitle><b>{moment().format("Do MMMM YYYY")}</b></CardTitle>
                                    <Progress striped color="info" value={5*10}><b>{5}</b></Progress>
                                    <Row>
                                        <Form onSubmit={this.handleSubmit1} inline className="py-3">
                                            <Col xs="auto">
                                                <FormGroup inline>
                                                    <Input type="text" name="VehicleNo" id="VehicleNo" onChange={this.handleChange1} value={this.state.vehicleNO} placeholder="Enter Vehicle No" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="auto">
                                                <FormGroup>
                                                    <Button className="btn-block" color="primary">Create</Button>
                                                </FormGroup>
                                            </Col>
                                        </Form>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md="12" className="py-2">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody> 
                                    <CardTitle><b>{moment().add(1,'days').format("dddd")}</b></CardTitle>
                                    <CardTitle><b>{moment().add(1,'days').format("Do MMMM YYYY")}</b></CardTitle>
                                    <Progress striped color="info" value={5*10}><b>{5}</b></Progress>
                                    <Row>
                                        <Form onSubmit={this.handleSubmit2} inline className="py-3">
                                            <Col xs="auto">
                                                <FormGroup inline>
                                                    <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter Vehicle No" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="auto">
                                                <FormGroup>
                                                    <Button className="btn-block" color="primary">Create</Button>
                                                </FormGroup>
                                            </Col>
                                        </Form>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md="12" className="py-2">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody> 
                                    <CardTitle><b>{moment().add(2,'days').format("dddd")}</b></CardTitle>
                                    <CardTitle><b>{moment().add(2,'days').format("Do MMMM YYYY")}</b></CardTitle>
                                    <Progress striped color="info" value={5*10}><b>{5}</b></Progress>
                                    <Row>
                                        <Form onSubmit={this.handleSubmit3} inline className="py-3">
                                            <Col xs="auto">
                                                <FormGroup inline>
                                                    <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter Vehicle No" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="auto">
                                                <FormGroup>
                                                    <Button className="btn-block" color="primary">Create</Button>
                                                </FormGroup>
                                            </Col>
                                        </Form>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md="12" className="py-2">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody> 
                                    <CardTitle><b>{moment().add(3,'days').format("dddd")}</b></CardTitle>
                                    <CardTitle><b>{moment().add(3,'days').format("Do MMMM YYYY")}</b></CardTitle>
                                    <Progress striped color="info" value={5*10}><b>{5}</b></Progress>
                                    <Row>
                                        <Form onSubmit={this.handleSubmit4} inline className="py-3">
                                            <Col xs="auto">
                                                <FormGroup inline>
                                                    <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter Vehicle No" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="auto">
                                                <FormGroup>
                                                    <Button className="btn-block" color="primary">Create</Button>
                                                </FormGroup>
                                            </Col>
                                        </Form>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md="12" className="py-2">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody> 
                                    <CardTitle><b>{moment().add(4,'days').format("dddd")}</b></CardTitle>
                                    <CardTitle><b>{moment().add(4,'days').format("Do MMMM YYYY")}</b></CardTitle>
                                    <Progress striped color="info" value={5*10}><b>{5}</b></Progress>
                                    <Row>
                                        <Form onSubmit={this.handleSubmit5} inline className="py-3">
                                            <Col xs="auto">
                                                <FormGroup inline>
                                                    <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter Vehicle No" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="auto">
                                                <FormGroup>
                                                    <Button className="btn-block" color="primary">Create</Button>
                                                </FormGroup>
                                            </Col>
                                        </Form>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        </Row>
                    </div>
            </div>
        )
    }
}

export default CreateAppointment