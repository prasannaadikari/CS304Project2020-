import React, { Component } from 'react';
import { Col, Row, FormGroup, Input, Form, Button} from 'reactstrap';
import moment from 'moment'
import Db from "../../helpers/Db";
import { auth } from '../../services/firebase';
import Header from "../../components/Header";

export class CreateAppointment extends Component {
    constructor(props) {
        super(props);
        this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);
        this.onChangeVehicleNo = this.onChangeVehicleNo.bind(this);
        this.saveAppointment = this.saveAppointment.bind(this);
    
        this.state = {
            ADate: "",
            vNo: "",
            status: "Waiting",
            user:auth().currentUser 
        };
      }
    
      onChangeAppointmentDate(e) {
        this.setState({
            ADate: e.target.value,
        });
      }
    
      onChangeVehicleNo(e) {
        this.setState({
            VNo: e.target.value,
        });
      }
    
      saveAppointment() {
        let data = {
            ADate: this.state.ADate,
            VNo: this.state.VNo,
            status: "Waiting",
            uid: this.state.user.uid
        };
    
        Db.create(data)
          .then(() => {
            console.log("Created new appointment successfully!");
            
          })
          .catch((e) => {
            console.log(e);
          });
      }
    render() {
        return (
            <div className="container py-5"><Header/>
            <div className="container py-5">
                <h3>Create appointment</h3>
                <Row>
                    <Form  className="py-3">
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="VNo" id="VNo" value={this.state.VNo} onChange={this.onChangeVehicleNo} placeholder="Enter Vehicle No" />
                            </FormGroup>
                        </Col>
                        <Col xs="auto">
                        <FormGroup>
                                <Input type="select" name="ADate" id="ADate" value={this.state.ADate} onChange={this.onChangeAppointmentDate} className="mr-3">
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
                            <FormGroup>
                                <Button className="btn-block" color="primary">Make an appointment</Button>
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