import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'
import Appointment from "./Appointment.component";
import * as ROUTES from '../../helpers/routes';
import Header from "../../components/Header";

export default class AppointmentsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAppointment = this.setActiveAppointment.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      appointments: [],
      currentAppointment: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    Db.getAllAppointments().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    Db.getAllAppointments().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let appointments = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();

      if(data.Adate===moment().format("dddd Do MMMM YYYY")){
      appointments.push({
        key: key,
        VNo: data.VNo,
        Adate: data.Adate,
        status: data.status,
        description: data.description,
        uid: data.uid
      });}
    });

    this.setState({
      appointments: appointments,
    });
  }

  refreshList() {
    this.setState({
      currentAppointment: null,
      currentIndex: -1,
    });
  }

  setActiveAppointment(appointment, index) {
    this.setState({
      currentAppointment: appointment,
      currentIndex: index,
    });
  }

 

  render() {
    const { appointments, currentAppointment, currentIndex } = this.state;

    return (
      <div className="p-5"> <Header/><div className="p-5">
      <Container>
        <div className=" justify-content-between mb-5">
          <h4>Todays Appointments</h4>
          <hr md="12" className="py-3"/>
              <ul className="list-group">
                {appointments && appointments.map((appointment, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveAppointment(appointment, index)}
                  key={index}>
                    <Row>
                    <Col xs="9">
                  <b>{appointment.VNo}</b>
                  </Col>
                  <Col>
                  {appointment.status==="Waiting"?<div className="ml-3 text-left text-uppercase text-warning" >{appointment.status}</div>:null}
                  {appointment.status==="Processing"?<div className="ml-3 text-left text-uppercase text-primary" >{appointment.status}</div>:null}
                  {appointment.status==="Done"?<div className="ml-3 text-left text-uppercase text-success" >{appointment.status}</div>:null}
                  </Col>
                     </Row>
                </li>
                ))}
                
                
                          
                      
              </ul>
        </div>
            <div>
              {currentAppointment ? (
                <Appointment
                  appointment={currentAppointment}
                  refreshList={this.refreshList}
                />
              ) : (
              <div>
                <br />
                  <p>Please click on a Appointment...</p>
                </div>
              )}
            </div>
            </Container>
            </div></div>
    );
  }
}
