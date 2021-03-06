import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Container, Button, Row, Col} from 'reactstrap';
import moment from 'moment';
import {Offline,Online} from "react-detect-offline";

import Appointment from "./Appointment.component";
import * as ROUTES from '../../helpers/routes';
import {Checkmark} from "react-checkmark";
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
      loading: true
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
        uid: data.uid,
        timestamp:data.timestamp
      });}
    });
    appointments.sort(function (a,b) { return a.timestamp - b.timestamp })
    this.setState({appointments: appointments, loading: false });
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
    this.myRef.scrollIntoView({behavior:'smooth'})
  }

 

  render() {
    const { appointments, currentAppointment, currentIndex ,loading} = this.state;

    return (
      <div> <Header/><div className="p-5">
      <Container>
        <div className=" justify-content-between mb-5">
<Row><Col>
          <h4>Todays Appointments</h4>

          {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}

          </Col><Col>
            <Button href={ROUTES.SEARCH_APPOINTMENTS}>Search appointment</Button>
          </Col><Col>
            <Button href={ROUTES.CREATE_APPOINTMENT}>Create appointment</Button>
          </Col></Row>

          <hr md="12" className="py-3"/>
          <Offline>Unable to connect. Please review your network settings...</Offline>
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
                        {appointment.description ? <Checkmark size='medium'/>:null} 
                      </Col>
                  <Col>
                  {appointment.status==="Waiting"?<div className="ml-3 text-left text-uppercase text-warning" ><b>{appointment.status}</b></div>:null}
                  {appointment.status==="Processing"?<div className="ml-3 text-left text-uppercase text-primary" ><b>{appointment.status}</b></div>:null}
                  {appointment.status==="Done"?<div className="ml-3 text-left text-uppercase text-success" ><b>{appointment.status}</b></div>:null}
                  </Col>
                     </Row>
                </li>
                ))}
              </ul>
              <Online>{appointments && loading==false ? null : <h6 className="text-info">Today you do not have any appointments yet...</h6>}</Online>
        </div>
            <div ref={(ref)=>this.myRef=ref}>
              {currentAppointment ? (
                <Appointment
                  appointment={currentAppointment}
                  refreshList={this.refreshList}
                />
              ) : (
              <div>
                <br />
                  <p className="text-info">Please click on a Appointment...</p>
                </div>
              )}
            </div>
            </Container>
            </div></div>
    );
  }
}
