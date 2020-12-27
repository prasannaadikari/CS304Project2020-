import React, { Component } from "react";
import {Card, CardTitle,Container, CardBody, Button, Row, Col} from 'reactstrap';

import Db from '../../helpers/Db';

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.deleteAppointment = this.deleteAppointment.bind(this);

    this.state = {
      currentAppointment: {
        key: null,
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
    const { currentAppointment } = this.state;

    return (
      <div >
                <Container>
                  {currentAppointment ? (
                  <Card  className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                    <CardBody>
                      <Row>
                      <Col sx="6" sm="4">
                          <CardTitle ><h3><b>{currentAppointment.VNo}</b></h3></CardTitle>
                          <CardTitle >{currentAppointment.Adate}</CardTitle>
                      </Col>
                      <Col sx="6" sm="4">
                          {currentAppointment.status==="Waiting"  ?<CardTitle className="ml-3 text-left text-uppercase text-warning" ><b>{currentAppointment.status}</b></CardTitle> :null}
                          {currentAppointment.status==="Processing"  ?<CardTitle className="ml-3 text-left text-uppercase text-primary" ><b>{currentAppointment.status}</b></CardTitle> :null}
                          {currentAppointment.status==="Done"  ?<CardTitle className="ml-3 text-left text-uppercase text-success" ><b>{currentAppointment.status}</b></CardTitle> :null}  
                          </Col>
                      <Col xs="auto">
                          {currentAppointment.status==="Waiting" ? <Button onClick={this.deleteAppointment} className="btn-block" color="danger">Delete</Button>:null}      
                      </Col>    
                      </Row>
                    <Row><Col>{currentAppointment.description ? <p className="py">{currentAppointment.description}</p> : null}</Col></Row>
                    </CardBody>
                  </Card>
                    ) : null}
                </Container>
       </div>
    );
  }
}
