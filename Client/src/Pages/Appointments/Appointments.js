import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'
import { auth } from '../../services/firebase';
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
      user: auth().currentUser,
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
       
      if((data.uid===this.state.user.uid) && ((data.Adate === moment().add(-1,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().format("dddd Do MMMM YYYY") || 
      data.Adate === moment().add(1,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().add(2,'days').format("dddd Do MMMM YYYY") ||
      data.Adate === moment().add(3,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().add(4,'days').format("dddd Do MMMM YYYY")))) {
      appointments.push({
        key: key,
        VNo: data.VNo,
        Adate: data.Adate,
        status: data.status,
        description: data.description
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
          <h4>Appointments</h4>
          {currentAppointment ? (
                <Appointment
                  appointment={currentAppointment}
                  refreshList={this.refreshList}
                />
              ) : (
              <div>
                <br />
                  <p className="text-info">Please click on a Appointment to remove...</p>
                </div>
              )}
          <hr md="12" className="py-3"/>
              <ul className="list-group">
                {appointments && appointments.map((appointment, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveAppointment(appointment, index)}
                  key={index}>
                    <Row>
                    <Col sx="6" sm="4">
                  <b>{appointment.VNo}</b>
                  </Col>
                  <Col sx="6" sm="4">
                  <b>{appointment.Adate}</b>
                  </Col>
                  <Col sm="4">
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
            </div>
            </Container>
            </div></div>
    );
  }
}
