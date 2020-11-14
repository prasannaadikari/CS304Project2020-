import React, { Component } from 'react'
import {Card, CardTitle, CardBody, Button, Row, Col} from 'reactstrap';
import Header from "../../components/Header";
import Db from "../../helpers/Db";
import { auth } from "../../services/firebase";
import * as ROUTES from '../../helpers/routes';
import moment from 'moment'
import _ from 'lodash';

var a=moment().format("dddd Do MMMM YYYY");

export class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          appointment: [],
          user:auth().currentUser
        };
      }
      componentDidMount() {
        Db.getAll().on("value", this.onDataChange);
      }
    
      componentWillUnmount() {
        Db.getAll().off("value", this.onDataChange);
      }

      onDataChange(items) {
        let appointment = [];
    
        items.forEach((item) => {
          let data = item.val();
          if ((data.uid == this.state.user.uid && data.status != "Done") || (data.ADate == a)) {
          appointment.push({
            ADate: data.ADate,
            VNo: data.VNo,
            status: data.status,
          });
        }});
    
        this.setState({
          appointment: appointment,
        });
      }

deleteappointment() {
  Db.delete(this.state.appointment.key)
    .then(() => {
      this.props.refreshList();
    })
    .catch((e) => {
      console.log(e);
    });
}

    renderVehicles = () => {
        return (
            _.map(this.appointment, (appointment) => {
                return (
                    <Col md="12" className="py-3">
                        <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <CardTitle ><b>{appointment.VNo}</b></CardTitle>
                                        <CardTitle >{appointment.ADate}</CardTitle>
                                    </Col>
                                    <Col xs="">
                                    </Col>
                                    <Col xs="auto">
                                        <CardTitle className="ml-3 text-left text-uppercase" >{appointment.status}</CardTitle>
                                        <Button className="btn-block" onClick={this.deleteappointment} color="primary">Cancle Appointment</Button>             
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
            <div className="container py-5"><Header/>
            <div className="container py-5">
                <Row>
                    <Col xs="9">
                        <h3>Appointments</h3>
                    </Col>
                    <Col xs="auto" >
                        <Button color="primary" href={ROUTES.CREATE_APPOINTMENT}>Make an Appointment</Button>
                    </Col>
                </Row>
                <hr md="12" className="py-3"/>
                <div className="py-4">
                    <Row>
                    {this.renderVehicles()}
                    </Row>
                </div>
            </div></div>
        )
    }
}  


export default Appointment

