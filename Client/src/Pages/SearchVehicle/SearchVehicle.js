import React, { Component } from 'react';
import { Row, Col, Card, CardTitle, Input,Form,FormGroup,CardBody, CardText} from 'reactstrap';
import _ from 'lodash';
import {Offline} from "react-detect-offline";

import Header from '../../components/Header';
import Db from '../../helpers/Db';
import * as ROUTES from '../../helpers/routes';

function searchingFor(search){
    return function(x){
        return x.VNo.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

export class SearchVehicle extends Component {
    constructor(props){
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.searchHandler = this.searchHandler.bind(this);

        this.state={
            search:"",
            appointments: [],
            loading:true,
            error:null
        }
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
          
          if (this.state.user===null) {
            this.props.history.push(ROUTES.HOME);
          }else {appointments.push({
            key: key,
            VNo: data.VNo,
            Adate: data.Adate,
            status: data.status,
            description: data.description
          });}
        });
        appointments.sort(function (a,b) { return a.Adate - b.Adate })
        this.setState({ appointments: appointments, loading: false });
      }

    renderVehicles = () => {    const { appointments, search } = this.state;
        return (
            _.map(appointments.filter(searchingFor(search)), (appointment) => {
                return (
                    <Col md="4" className="p-2">
                        <Card className="h-100 shadow p-2" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <CardTitle ><h5>{appointment.VNo}</h5></CardTitle>
                                <Row>
                                <CardText >Serviced on:</CardText>
                                </Row>
                                <Row>
                                <CardText  className="text-primary">{appointment.Adate}</CardText>
                                </Row>
                                <Row>
                                <CardText >Status:</CardText>
                                </Row>
                                <Row>
                                <CardText  className="text-primary">{appointment.description}</CardText>
                                </Row>
                            </CardBody>
                        </Card> 
                        </Col>
                )
            })
        )
    }

    render() {  const {loading,error,search } = this.state;
        return (
            <div><div className="py-4"></div><div className="fixed-top"><Header/></div><div className="container py-5">
                <Row>
                <Form inline className="py-3">
                    
                    <Col xs="auto">
                    <h3>Search vehicle</h3>
                        </Col>
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="search" id="search" placeholder="Enter vehicle No" value={search} onChange={this.searchHandler}/>
                            </FormGroup>
                        </Col>
                        
                    </Form>
                </Row>

                {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}
            <hr md="12" className="py-3"/>
            <div className="text-secondary"><Offline>Unable to connect. Please review your network settings...</Offline></div>
                <Row>
                    {this.renderVehicles()}
                </Row>
            </div>
        </div>
        )
    }
}

export default SearchVehicle