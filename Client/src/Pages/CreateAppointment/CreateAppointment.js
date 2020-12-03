import React, { Component } from 'react';
import { Col, Row, FormGroup, Input, Form,Alert,Progress, Button} from 'reactstrap';
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
        this.onDataChange = this.onDataChange.bind(this);
    
        this.state = {
          Adate: null,
          VNo: null,
          status: "Waiting",
          description:'',
          user: auth().currentUser,
          d1: 0,
          d2: 0,
          d3: 0,
          d4: 0,
          d5: 0,
          d6: 0,
          d7: 0,
          Warning:null,
          error:null,
          msg:null,
          max:10
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
      componentDidMount() {
        Db.getAllAppointments().on("value", this.onDataChange);
      }
    
      componentWillUnmount() {
        Db.getAllAppointments().off("value", this.onDataChange);
      }

      onDataChange(items) {
        
        items.forEach((item) => {
          let data = item.val();
    
            if (this.state.user === null) {
              this.props.history.push(ROUTES.HOME);
            }else if (data.Adate === moment().format("dddd Do MMMM YYYY")) {
              this.setState({ d1:this.state.d1+1 });
            }
            else if (data.Adate === moment().add(1,'days').format("dddd Do MMMM YYYY")) {
              this.setState({ d2:this.state.d2+1 });
            }
            else if (data.Adate === moment().add(2,'days').format("dddd Do MMMM YYYY")) {
              this.setState({ d3:this.state.d3+1 });
            }
            else if (data.Adate === moment().add(3,'days').format("dddd Do MMMM YYYY")) {
              this.setState({ d4:this.state.d4+1 });
            }
            else if (data.Adate === moment().add(4,'days').format("dddd Do MMMM YYYY")) {
              this.setState({ d5:this.state.d5+1 });
            }
            else if (data.Adate === moment().add(5,'days').format("dddd Do MMMM YYYY")) {
              this.setState({ d6:this.state.d6+1 });
            }
            else if (data.Adate === moment().add(6,'days').format("dddd Do MMMM YYYY")) {
              this.setState({ d7:this.state.d7+1 });
            }
      });
    }
    



      saveAppointment() { const {d1,d2,d3,d4,d5,d6,d7,max,user,Adate,VNo,status } = this.state;
        if (Adate === null || VNo === null) {
          this.setState({ Warning: null });
          this.setState({ error: 'Fieds can not be empty' });
          this.setState({ msg: null });
        }else if (Adate === moment().format("dddd Do MMMM YYYY") && d1 === max) {
          this.setState({ Warning: 'Resivations due to today are over. please book another day.' });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else if (Adate === moment().add(1,'days').format("dddd Do MMMM YYYY") && d2 === max) {
          this.setState({ Warning: 'Resivations are over. please book another day.' });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else if (Adate === moment().add(2,'days').format("dddd Do MMMM YYYY") && d3 === max) {
          this.setState({ Warning: 'Resivations are over. please book another day.' });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else if (Adate === moment().add(3,'days').format("dddd Do MMMM YYYY") && d4 === max) {
          this.setState({ Warning: 'Resivations are over. please book another day.' });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else if (Adate === moment().add(4,'days').format("dddd Do MMMM YYYY") && d5 === max) {
          this.setState({ Warning: 'Resivations are over. please book another day.'  });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else if (Adate === moment().add(5,'days').format("dddd Do MMMM YYYY") && d6 === max) {
          this.setState({ Warning: 'Resivations are over. please book another day.'  });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else if (Adate === moment().add(6,'days').format("dddd Do MMMM YYYY") && d7 === max) {
          this.setState({ Warning: 'Resivations are over. please book another day.'  });
          this.setState({ error: null });
          this.setState({ msg: null });
        }else{ 
        let data = {
          Adate: Adate,
          VNo: VNo,
          status: status,
          description:'',
          timestamp: Date.now(),
          uid: user.uid,
        };
        this.setState({ msg: 'Created new appointment successfully!' });
        this.setState({ error: null });
        this.setState({ Warning: null });
        Db.createAppointment(data)
        this.props.history.push(ROUTES.APPOINTMENT);
      }
        
  }
      
  render() {  const {error,msg,Warning,d1,d2,d3,d4,d5,d6,d7,max } = this.state;
      return ( 
            <div><Header/><div className="container py-5">
                <h3>Create an appointment</h3>
                <p className="text-info">Make an appointment according to following resevation informations.</p>
                <Row>
                    <Form className="py-3">
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="VNo" id="VNo" placeholder="Enter vehicle No" value={this.state.VNo} onChange={this.onChangeVehicleNo} />
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
                                    <option>{moment().add(5,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(6,'days').format("dddd Do MMMM YYYY")}</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="auto">
                                  {Warning ? <FormGroup className="mt-2 text-center text-warning">{Warning}</FormGroup> : null}
                                  {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                                  {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                            <FormGroup>
                              <Button onClick={this.saveAppointment} className="btn-block" color="primary">Make an appointment</Button>
                            </FormGroup>
                        </Col>
                    </Form>
                </Row>
                <hr md="12"/>
                
                <div>
                  <h6>{moment().format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d1*10}>{d1}/{max}</Progress>
                  <h6>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d2*10}>{d2}/{max}</Progress>
                  <h6>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d3*10}>{d3}/{max}</Progress>
                  <h6>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d4*10}>{d4}/{max}</Progress>
                  <h6>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d5*10}>{d5}/{max}</Progress>
                  <h6>{moment().add(5,'days').format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d6*10}>{d6}/{max}</Progress>
                  <h6>{moment().add(6,'days').format("dddd Do MMMM YYYY")}</h6>
                    <Progress animated color="info" value={d7*10}>{d7}/{max}</Progress>
                </div>
            </div>
          </div>
        )
    }
}

export default CreateAppointment