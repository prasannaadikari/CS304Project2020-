import React, { Component } from 'react';
import { Col, Row, FormGroup, Input, Form,Alert, Button,Progress} from 'reactstrap';
import moment from 'moment';
import {Offline,Online} from "react-detect-offline";

import Header from "../../components/Header";
import * as ROUTES from '../../helpers/routes';
import Db from "../../helpers/Db";
import { auth } from '../../services/firebase';

export class CreateAppointment extends Component {
  constructor(props) {
      super(props);
      this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);
      this.onChangeVehicleNo = this.onChangeVehicleNo.bind(this);
      this.saveAppointment = this.saveAppointment.bind(this);
      this.onDataChange = this.onDataChange.bind(this);
      this.onDataChangeS = this.onDataChangeS.bind(this);
  
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
        max:20,
        holiday1:null,
        holiday2:null,
        loading: true
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
      Db.getAllSettings().on("value", this.onDataChangeS);
    }
  
    componentWillUnmount() {
      Db.getAllAppointments().off("value", this.onDataChange);
      Db.getAllSettings().off("value", this.onDataChangeS);
    }

    onDataChangeS(items) {
  
      items.forEach((item) => {
        let data = item.val();
        this.setState({ holiday1:data.holiday1,holiday2:data.holiday2}); 
        //this.setState({ max:this.state.max+data.max}); 
      });
    }


    onDataChange(items) {
      
      items.forEach((item) => {
        let data = item.val();

        if (this.state.user===null) {
          this.props.history.push(ROUTES.HOME);
        }
        else if (data.Adate === moment().format("dddd Do MMMM YYYY")) {
            this.setState({ d1:this.state.d1+1});
          }
          else if (data.Adate === moment().add(1,'days').format("dddd Do MMMM YYYY")) {
            this.setState({ d2:this.state.d2+1 });
          }
          else if (data.Adate === moment().add(2,'days').format("dddd Do MMMM YYYY")) {
            this.setState({ d3:this.state.d3+1});
          }
          else if (data.Adate === moment().add(3,'days').format("dddd Do MMMM YYYY")) {
            this.setState({ d4:this.state.d4+1});
          }
          else if (data.Adate === moment().add(4,'days').format("dddd Do MMMM YYYY")) {
            this.setState({ d5:this.state.d5+1 });
          }
          else if (data.Adate === moment().add(5,'days').format("dddd Do MMMM YYYY")) {
            this.setState({ d6:this.state.d6+1});
          }
          else if (data.Adate === moment().add(6,'days').format("dddd Do MMMM YYYY")) {
            this.setState({ d7:this.state.d7+1 });
          }
    });
    this.setState({ loading: false });
    
  }
  



    saveAppointment() { const {d1,d2,d3,d4,d5,d6,d7,max,user,Adate,VNo,status } = this.state;
      if (Adate === null || VNo === null) {
        this.setState({ Warning: null,error: 'Fieds can not be empty', msg: null });
        return;
      }else if(!VNo.match(/^([0-9]{1,3}|[A-Za-z]{1,3})-([0-9]{4})$/)){ 
        this.setState({ Warning: null,msg: null, error:'Invalid Vehicle No'});
        return;
      }
      if (Adate === moment().format("dddd Do MMMM YYYY") && d1==max) {
        this.setState({ Warning: 'Reservations due to today are over. please book another day', error: null, msg: null });
      }else if (Adate === moment().add(1,'days').format("dddd Do MMMM YYYY") && d2 === max) {
        this.setState({ Warning: 'Reservations are over. please book another day' , error: null , msg: null });
      }else if (Adate === moment().add(2,'days').format("dddd Do MMMM YYYY") && d3 === max) {
        this.setState({ Warning: 'Reservations are over. please book another day',error: null, msg: null });
      }else if (Adate === moment().add(3,'days').format("dddd Do MMMM YYYY") && d4 === max) {
        this.setState({ Warning: 'Reservations are over. please book another day', error: null, msg: null });
      }else if (Adate === moment().add(4,'days').format("dddd Do MMMM YYYY") && d5 === max) {
        this.setState({ Warning: 'Reservations are over. please book another day' ,error: null ,msg: null });
      }else if (Adate === moment().add(5,'days').format("dddd Do MMMM YYYY") && d6 === max) {
        this.setState({ Warning: 'Reservations are over. please book another day', error: null ,msg: null });
      }else if (Adate === moment().add(6,'days').format("dddd Do MMMM YYYY") && d7 === max) {
        this.setState({ Warning: 'Reservations are over. please book another day' , error: null ,msg: null });
      }else{
      this.setState({ error: null, Warning: null });
      let data = {
        Adate: Adate,
        VNo: VNo,
        status: status,
        description:'',
        timestamp: Date.now(),
        uid:'',
      };
      Db.createAppointment(data)
      this.setState({ msg: 'Created new appointment successfully!' });
      this.props.history.push(ROUTES.CREATE_APPOINTMENT);
      
    }
      
}
 
ifOffline= () =>{
  this.setState({msg:null,warning:null,error:'Unable to connect. Please review your network settings...'});
}

render() {  const {loading,holiday1,holiday2,error,msg,Warning,d1,d2,d3,d4,d5,d6,d7,max } = this.state;
    return ( 
          <div><Header/><div className="container py-5">
              <h3>Create an appointment</h3>

              
        {loading ? <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div> : null}

              <p className="text-info">Make an appointment according to following resevation informations.</p>
              <Row>
                  <Form className="py-3">
                      <Col xs="auto">
                          <FormGroup inline>
                              <Input type="text" name="VNo" id="VNo" placeholder="Enter vehicle No" value={this.state.VNo} onChange={this.onChangeVehicleNo} />
                              <p>hint: xxx-0000</p>
                          </FormGroup>
                      </Col>
                      <Col xs="auto">
                      <FormGroup>
                              <Input className="mr-3" type="select" name="Adate" id="Adate" value={this.state.Adate} onChange={this.onChangeAppointmentDate} >
                                  <option className="d-none">Select appointment date</option>
                                  {holiday1===moment().format("dddd Do MMMM YYYY") || holiday2==moment().format("dddd Do MMMM YYYY")? null :<option>{moment().format("dddd Do MMMM YYYY")}</option>}
                                  {holiday1===moment().add(1,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(1,'days').format("dddd Do MMMM YYYY")  ? null :<option>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</option>}
                                  {holiday1===moment().add(2,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(2,'days').format("dddd Do MMMM YYYY")  ? null :<option>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</option>}
                                  {holiday1===moment().add(3,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(3,'days').format("dddd Do MMMM YYYY")  ? null :<option>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</option>}
                                  {holiday1===moment().add(4,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(4,'days').format("dddd Do MMMM YYYY")  ? null :<option>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</option>}
                                  {holiday1===moment().add(5,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(5,'days').format("dddd Do MMMM YYYY")  ? null :<option>{moment().add(5,'days').format("dddd Do MMMM YYYY")}</option>}
                                  {holiday1===moment().add(6,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(6,'days').format("dddd Do MMMM YYYY")  ? null :<option>{moment().add(6,'days').format("dddd Do MMMM YYYY")}</option>}
                              </Input>
                          </FormGroup>
                      </Col>
                      <Col xs="auto">
                                {Warning ? <FormGroup className="mt-2 text-center text-warning">{Warning}</FormGroup> : null}
                                {error ? <FormGroup className="mt-2 text-center text-danger">{error}</FormGroup> : null}
                                {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                          <FormGroup>
                            <Online>
                              <Button onClick={this.saveAppointment} className="btn-block" color="primary">Make an appointment</Button>
                            </Online>
                            <Offline>
                              <Button onClick={this.ifOffline} className="btn-block" color="primary">Make an appointment</Button>
                            </Offline>  
                          </FormGroup>
                      </Col>
                  </Form>
              </Row>
              <hr md="12"/>
              
              <div>
                <h6>{moment().format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().format("dddd Do MMMM YYYY") || holiday2===moment().format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d1*(100/max)}>{d1}/{max}</Progress>}
                <h6>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().add(1,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(1,'days').format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d2*(100/max)}>{d2}/{max}</Progress>}
                <h6>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().add(2,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(2,'days').format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d3*(100/max)}>{d3}/{max}</Progress>}
                <h6>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().add(3,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(3,'days').format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d4*(100/max)}>{d4}/{max}</Progress>}
                <h6>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().add(4,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(4,'days').format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d5*(100/max)}>{d5}/{max}</Progress>}
                <h6>{moment().add(5,'days').format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().add(5,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(5,'days').format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d6*(100/max)}>{d6}/{max}</Progress>}
                <h6>{moment().add(6,'days').format("dddd Do MMMM YYYY")}</h6>
                  {holiday1===moment().add(6,'days').format("dddd Do MMMM YYYY") || holiday2===moment().add(6,'days').format("dddd Do MMMM YYYY")?<Progress animated color="primary" value={10*10}>Holiday</Progress> :<Progress animated color="info" value={d7*(100/max)}>{d7}/{max}</Progress>}
              </div>
          </div>
        </div>
      )
  }
}

export default CreateAppointment