import React, { Component } from "react";
import {Checkmark} from "react-checkmark";
import {Container,Row, Col} from 'reactstrap';
import moment from 'moment';
import {Offline,Online} from "react-detect-offline";

import Db from '../../helpers/Db';
import { auth } from '../../services/firebase';
import Appointment from './Appointment.component';
import * as ROUTES from '../../helpers/routes';
import Header from '../../components/Header';

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
       
      if (this.state.user===null) {
        this.props.history.push(ROUTES.HOME);
      }else if((data.uid===this.state.user.uid) && (data.Adate === moment().add(-3,'days').format("dddd Do MMMM YYYY") ||data.Adate === moment().add(-2,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().add(-1,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().format("dddd Do MMMM YYYY") || 
      data.Adate === moment().add(1,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().add(2,'days').format("dddd Do MMMM YYYY") ||
      data.Adate === moment().add(3,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().add(4,'days').format("dddd Do MMMM YYYY") ||
      data.Adate === moment().add(5,'days').format("dddd Do MMMM YYYY") || data.Adate === moment().add(6,'days').format("dddd Do MMMM YYYY"))) {
      appointments.push({
        key: key,
        VNo: data.VNo,
        Adate: data.Adate,
        status: data.status,
        description: data.description,
        timestamp: data.timestamp
      });
      }
    });
    appointments.sort(function (a,b) { return b.timestamp - a.timestamp });
    this.setState({ appointments: appointments, loading: false });
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
    const { loading,appointments, currentAppointment, currentIndex } = this.state;
   

    return (
      <div> <div ref={(ref)=>this.myRef=ref} className="py-4"></div><div className="fixed-top"><Header/></div><div className="py-5">
      <Container>
        <div className=" justify-content-between mb-5">
          <h3>Appointments</h3>

          {loading 
          ? <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div> 
          :null}

          <div  className="py-3">{currentAppointment 
          ? (<div><Appointment
                  appointment={currentAppointment}
                  refreshList={this.refreshList}
                />
              </div>)
          : (<div>
                <Online><p className="text-info">Please click on an appointment for more features...</p></Online>
              </div>)}
            </div>
            <hr md="12" className="py-3"/>
            <div className="text-secondary"><Offline>Unable to connect. Please review your network settings...</Offline></div>

              <ul className="list-group">
                {appointments && appointments.map((appointment, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveAppointment(appointment, index)}
                  key={index}>
                    <Row>
                      <Col>
                        <b>{appointment.VNo}</b>
                      </Col>
                      <Col>
                        <b>{appointment.Adate}</b>
                      </Col>
                      <Col>
                        {appointment.status==="Waiting"?<div className="ml-3 text-left text-uppercase text-warning" >{appointment.status}</div>:null}
                        {appointment.status==="Processing"?<div className="ml-3 text-left text-uppercase text-primary" >{appointment.status}</div>:null}
                        {appointment.status==="Done"?<div className="ml-3 text-left text-uppercase text-success" >{appointment.status}</div>:null}
                      </Col>
                      <Col>
                        {appointment.description ? <Checkmark size='medium'/> : null}
                      </Col>
                    </Row>
                </li>))}
              </ul>
        </div>
      </Container>
      </div>
      </div>
    );
  }
}
