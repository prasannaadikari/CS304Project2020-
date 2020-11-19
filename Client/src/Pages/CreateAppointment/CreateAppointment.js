import React, { Component } from 'react';
import { Col, Row, FormGroup, Input, Form,Alert, Button} from 'reactstrap';
import moment from 'moment'
import { auth } from '../../services/firebase';
import Header from "../../components/Header";
import * as ROUTES from '../../helpers/routes';
import Db from "../../helpers/Db";

export class CreateAppointment extends Component {
    constructor(props) {
        super(props);
        this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);
        this.onChangeVehicleNo = this.onChangeVehicleNo.bind(this);
        this.saveAppointment = this.saveAppointment.bind(this);
    
        this.state = {
          Adate: null,
          VNo: null,
          status: "Waiting",
          user: auth().currentUser,
          error:null,
          msg:null
        };
      }
      onChangeAppointmentDate(e) {
        this.setState({
          Adate: e.target.value,
        });
      }
    
      onChangeVehicleNo(e) {
        this.setState({
          VNo: e.target.value,
        });
      }
      saveAppointment() {
        if (this.state.user === null) {
          this.setState({ error: 'please log in to your account' });
        }else if (this.state.Adate == null || this.state.VNo == null) {
          this.setState({ error: 'Fill all fields' });
        }else{ 
        let data = {
          Adate: this.state.Adate,
          VNo: this.state.VNo,
          status: this.state.status,
          timestamp: Date.now(),
          uid: this.state.user.uid,
        };
        this.setState({ msg: 'Created new appointment successfully!' });
        Db.create(data)}
  }
      
  render() {  const {error,msg } = this.state;
      return ( 
            <div className="container py-5"><Header/><div className="container py-5">
                <h3>Create appointment</h3>
                <Row>
                    <Form className="py-3">
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="VNo" id="VNo" placeholder="Enter Vehicle No" value={this.state.VNo} onChange={this.onChangeVehicleNo} />
                            </FormGroup>
                        </Col>
                        <Col xs="auto">
                        <FormGroup>
                                <Input className="mr-3" type="select" name="Adate" id="Adate" value={this.state.Adate} onChange={this.onChangeAppointmentDate} >
                                    <option className="d-none">Appointment date</option>
                                    <option>{moment().format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="auto">
                                  {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                                  {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                            <FormGroup>
                            {auth().currentUser
                                ? <Button onClick={this.saveAppointment} className="btn-block" color="primary">Make an appointment</Button>
                                : <Button onClick={this.saveAppointment} className="btn-block" color="primary">Make an appointment</Button>}
                            </FormGroup>
                        </Col>
                    </Form>
                </Row>
                <hr md="12" className="py-3"/>
            </div></div>
        )
    }
}

export default CreateAppointment