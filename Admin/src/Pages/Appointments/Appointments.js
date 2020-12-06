import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'
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
      n:null,
      currentAppointment: null,
      currentIndex: -1,
      loading: false
    };
  }

  componentDidMount() {
    Db.getAllAppointments().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    Db.getAllAppointments().off("value", this.onDataChange);
  }

  onDataChange(items) {
    this.setState({ loading: true });
    let appointments = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();

      if(data.Adate===moment().format("dddd Do MMMM YYYY")){
        this.setState({n:1});
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
    appointments.sort(function (a,b) { return b.timestamp - a.timestamp })
    this.setState({
      appointments: appointments,
    });
    this.setState({ loading: false });
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
    this.myRef.scrollIntoView()
  }

 

  render() {
    const { appointments, currentAppointment, currentIndex ,n,loading} = this.state;

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
              {n ? null : <h6 className="text-danger">Today you do not have any appointments</h6>}
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
                  <p>Please click on a Appointment...</p>
                </div>
              )}
            </div>
            </Container>
            </div></div>
    );
  }
}
