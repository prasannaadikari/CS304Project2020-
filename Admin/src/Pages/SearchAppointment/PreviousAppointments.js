import React, { Component } from "react";
import {Checkmark} from "react-checkmark";
import Db from "../../helpers/Db";
import { Form,Input, FormGroup,  Row, Col} from 'reactstrap';
import {Offline} from "react-detect-offline";

import Appointment from "./component";
import * as ROUTES from '../../helpers/routes';
import Header from "../../components/Header";

function searchingFor(search){
  return function(x){
      return x.Adate.toLowerCase().includes(search.toLowerCase()) || !search;
  }
}

export default class AppointmentsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAppointment = this.setActiveAppointment.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);

    this.state = {
      appointments: [],
      search:"",
      currentAppointment: null,
      currentIndex: -1,
      loading: true
    };
  }
  searchHandler(event){
    this.setState({ search:event.target.value})
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
      }else{
        appointments.push({
        key: key,
        VNo: data.VNo,
        Adate: data.Adate,
        status: data.status,
        description: data.description,
        uid: data.uid
      });}
    });
    this.setState({ appointments: appointments,loading: false });
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
    const { appointments,search, currentAppointment, currentIndex, loading } = this.state;

    return (
      <div> <Header/><div className="p-5">
      
        <div>
      <Row><Col md="4">
          <h4>Previous Appointments</h4>

          {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}

          <Form><FormGroup><Input type="text" name="search" id="search" placeholder="Enter appointment date" value={search} onChange={this.searchHandler}/></FormGroup></Form>
          <hr md="12" className="py-3"/>
            <Offline>Unable to connect. Please review your network settings...</Offline>

          <ul>
                 {appointments.filter(searchingFor(search)).map((appointment, index) => (
                  <li className="list-group" tag="a" href="#" action className={ "list-group-item " + (index === currentIndex ? "active" : "") } 
                  onClick={() => this.setActiveAppointment(appointment, index)}
                   key={index}>
                  <Row>
                  <Col>
                  <b>{appointment.VNo}</b>
                  </Col>
                  <Col> 
                        {appointment.description ? <Checkmark size='medium'/>:null} 
                  </Col>
                  <Col xs="auto">
                  {appointment.status==="Waiting"?<div className="ml-3 text-left text-uppercase text-warning" ><b>{appointment.status}</b></div>:null}
                  {appointment.status==="Processing"?<div className="ml-3 text-left text-uppercase text-primary" ><b>{appointment.status}</b></div>:null}
                  {appointment.status==="Done"?<div className="ml-3 text-left text-uppercase text-success" ><b>{appointment.status}</b></div>:null}
                  </Col>
                  </Row>
                </li>
                ))}
          </ul>
      
        </Col><Col md="8">
            <div ref={(ref)=>this.myRef=ref}>
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
            </Col></Row></div>
      </div></div>
    );
  }
}
