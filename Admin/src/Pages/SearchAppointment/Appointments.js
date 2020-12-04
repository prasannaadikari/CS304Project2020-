import React, { Component } from "react";
import {Checkmark} from "react-checkmark";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'
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

      
      appointments.push({
        key: key,
        VNo: data.VNo,
        Adate: data.Adate,
        status: data.status,
        description: data.description,
        uid: data.uid
      });
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
    const { appointments,search, currentAppointment, currentIndex } = this.state;

    return (
      <div> <Header/><div className="p-5">
      
        <div>
      <Row><Col md="4">
          <h4>Appointments</h4>
          <Form><FormGroup><Input type="text" name="search" id="search" placeholder="Enter appointment date" value={search} onChange={this.searchHandler}/></FormGroup></Form>
    
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
            </Col></Row></div>
      </div></div>
    );
  }
}
