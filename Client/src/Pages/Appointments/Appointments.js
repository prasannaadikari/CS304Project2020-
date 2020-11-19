import React, { Component } from 'react'
import {Card, CardTitle, Form,Input, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import Header from "../../components/Header";
import Db from "../../helpers/Db";
import { auth } from "../../services/firebase";
import * as ROUTES from '../../helpers/routes';
import _ from 'lodash';

export class Appointment extends Component {
  constructor(props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.onChangekey = this.onChangekey.bind(this);

    this.state = {
      appointments: [],
      user: auth().currentUser,
      error: null,
      key: null ,
    };
  }

  onChangekey(e) {
        this.setState({
          VNo: e.target.value,
        });
      }

  componentDidMount() {
    Db.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    Db.getAll().off("value", this.onDataChange);
  }
  onDataChange(items) {
    let appointments = [];
    
    items.forEach((item) => {
      let key = item.key;
      let data = item.val();

      if (data === null) {
        this.setState({ error: 'You do not have any appointments yet' });
      }else if (data.uid === this.state.user.uid) {
      appointments.push({
        key:key,
        date: data.Adate,
        vNo: data.VNo,
        Status: data.status,
      });appointments.sort(function (a, b) { return a.timestamp - b.timestamp })
    }
    });

    this.setState({
      appointments: appointments,
    });
  }

    DeleteAppointment() {
      if (this.state.key !== null) {

        Db.delete(this.state.key)
      } 
   }

renderVehicles = () => { const { tutorials, currentTutorial, currentIndex } = this.state;
        return (
            _.map(this.state.appointments, (appointment, index) => {
                return (
                    <Col md="12" className="py-3">
                        <Card  className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <CardTitle ><b>{appointment.vNo}</b></CardTitle>
                                        <CardTitle >{appointment.date}</CardTitle>
                                        <CardTitle >KEY {appointment.key}</CardTitle>
                                    </Col>
                                    <Col xs="">
                                    </Col>
                                    <Col xs="auto">
                                        <CardTitle className="ml-3 text-left text-uppercase" ><b>{appointment.Status}</b></CardTitle>            
                                    </Col>    
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }

render() {  const {error } = this.state;
        return (
            <div className="container py-5"><Header/><div className="container py-5">
                <Row>
                    <Col xs="9">
                        <h3>Appointments</h3>
                    </Col>
                    <Col xs="">
                    </Col>
                    <Col xs="auto">
                      <Form>
                        <FormGroup>
                          <Input type="text" name="key" id="key" placeholder="Enter KEY" value={this.state.key} onChange={this.onChangekey} />
                        </FormGroup> 
                        <FormGroup>
                          <Button onClick={this.DeleteAppointment()} className="btn-block" color="primary">Delete appointment</Button>
                        </FormGroup>  
                        </Form>
                      </Col>    
                </Row>
                <hr md="12" className="py-3"/>
                <div className="py-4">
                    <Row>
                    <Form>{error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}</Form>
                    {this.renderVehicles()}
                    </Row>
                </div>
            </div>
          </div>
        )
    }
}  
export default Appointment

