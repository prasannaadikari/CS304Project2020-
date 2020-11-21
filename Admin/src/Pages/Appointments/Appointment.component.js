import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, Label, CardBody, Button, Row, Col} from 'reactstrap';


export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.onChangestatus = this.onChangestatus.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.updateAppointment = this.updateAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    
    this.state = {
      currentAppointment: {
        key: null,
        VNo: "",
        description: "",
        uid:"",
        status: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { appointment } = nextProps;
    if (prevState.currentAppointment.key !== appointment.key) {
      return {
        currentAppointment: appointment,
        message: ""
      };
    }

    return prevState.currentAppointment;
  }

  componentDidMount() {
    this.setState({
      currentAppointment: this.props.appointment,
    });
  }

  onChangestatus(e) {
    const status = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAppointment: {
          ...prevState.currentAppointment,
          status: status,
        },
      };
    });
  }

  onChangedescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentAppointment: {
        ...prevState.currentAppointment,
        description: description,
      },
    }));
  }

  updateAppointment() {
    const data = {
      status: this.state.currentAppointment.status,
      description: this.state.currentAppointment.description,
    };

    Db.update(this.state.currentAppointment.key, data)
      .then(() => {
        this.setState({
          message: "The Appointment was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteAppointment() {
    Db.delete(this.state.currentAppointment.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { currentAppointment} = this.state;

    return (
      <div className="p-5">
  
        <h4>Appointment</h4>
        {currentAppointment
         ? (
          <Container>
          <div className="py-3">
            <Card  className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
              <CardBody>
                  <Row>
                    <Col xs="6">
                      <CardTitle ><h3><b>{currentAppointment.VNo}</b></h3></CardTitle>
                      <CardTitle >{currentAppointment.Adate}</CardTitle>
                    </Col>
                    <Col xs="auto">
                      {currentAppointment.status==="Waiting"  ?<CardTitle className="ml-3 text-left text-uppercase text-warning" ><b>{currentAppointment.status}</b></CardTitle> :null}
                      {currentAppointment.status==="Processing"  ?<CardTitle className="ml-3 text-left text-uppercase text-primary" ><b>{currentAppointment.status}</b></CardTitle> :null}
                      {currentAppointment.status==="Done"  ?<CardTitle className="ml-3 text-left text-uppercase text-success" ><b>{currentAppointment.status}</b></CardTitle> :null}            
                    </Col>    
                  </Row>
                  <Form >
                    <Row>
                      <Col xs="auto">
                        <FormGroup>
                          <Label for="address">Update status</Label>
                          <Input type="select" name="St" id="St" value={currentAppointment.status} onChange={this.onChangestatus}>
                          <option className="d-none">{currentAppointment.status}</option>
                                    <option>"Waiting"</option>
                                    <option>Processing</option>
                                    <option>Done</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="description">Description</Label>
                          <Input type="text" name="text" id="text"  placeholder="Vehicle service description" value={currentAppointment.description} onChange={this.onChangedescription}/>
                        </FormGroup>
                      </Col>  
                    </Row>
                    <Row>
                    <Col sm="auto">
                      <Button onClick={this.updateAppointment} className="btn-block" color="primary">Update</Button>
                    </Col>
                    <Col sm="auto">
                      <Button onClick={this.deleteAppointment} className="btn-block" color="danger">Delete</Button>
                    </Col>
                    </Row>
                  </Form>
                </CardBody>
            </Card>
            </div>
            

          </Container>) 
          : (
          <div>
            <br />
            <p>Please click on a Appointment...</p>
          </div>)}
      
    </div>
    );
  }
}
