import React, { Component } from 'react'
import Header from "../../components/Header";
import { Container, Row, Col, Card, CardTitle, Input,Form,FormGroup,Button,CardBody, CardText} from 'reactstrap';
import _ from 'lodash';
import Db from "../../helpers/Db";

function searchingFor(search){
    return function(x){
        return x.uid.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

export class Search extends Component {
    constructor(props){
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        this.onDataChangeP = this.onDataChangeP.bind(this);
        this.searchHandler = this.searchHandler.bind(this);

        this.state={
            search:"",
            appointments: [],
            profiles:[],
            error:null
        }
    }
    searchHandler(event){
        this.setState({ search:event.target.value})
    }
    
    
      componentDidMount() {
        Db.getAllProfiles().on("value", this.onDataChangeP);
        Db.getAllAppointments().on("value", this.onDataChange);
      
      }
    
      componentWillUnmount() {
        Db.getAllProfiles().off("value", this.onDataChangeP);
        Db.getAllAppointments().off("value", this.onDataChange);
      }
    
    onDataChange(items) {
        let appointments = [];
    
        items.forEach((item) => {
          let key = item.key;
          let data = item.val();
          
          appointments.push({
            key: key,
            VNo: data.VNo,
            Adate: data.Adate,
            status: data.status,
            description: data.description,
            uid: data.uid
          });
        });
    
        this.setState({
          appointments: appointments,
        });
      }

      onDataChangeP(items) {
        let profiles = [];
    
        items.forEach((item) => {
          let key = item.key;
          let data = item.val();
          
          profiles.push({
            key: key,
            username: data.username,
            title: data.title,
            initials: data.initials,
            lastname: data.lastname,
            email: data.email,
            address: data.address,
            phone: data.phone,
            uid: data.uid
          });
        });
    
        this.setState({
            profiles: profiles,
        });
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
    renderProfiles = () => { const { profiles, search } = this.state;
        return (
            _.map(profiles.filter(searchingFor(search)), (profile) => {
                return (
                    <Col md="4" className="p-2">
                    <Card className="h-100 shadow p-2" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                            <Row><Col>
                    <Row>
                      <Col xs="auto">
                        <h6><b>User name:</b></h6>
                      </Col><Col>
                        <h6 >{profile.username}</h6>
                      </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6><b>Name:</b></h6>
                        </Col><Col>
                        {profile.initials ? <h6>{profile.title} {profile.initials}.{profile.lastname}</h6> : null}
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6><b>Contact email:</b></h6>
                        </Col><Col>
                        <h6>{profile.email}</h6>
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6 ><b>Address:</b></h6>
                        </Col><Col>
                        <h6>{profile.address}</h6>
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6><b>Telephone:</b></h6>
                        </Col><Col>
                        <h6>{profile.phone}</h6>
                        </Col>
                    </Row>
                    </Col>
                    </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }



    render() {  const {error,search } = this.state;
        return (
            <div className="container py-5"><Header /><div className="container py-5">
                <Row>
                    <Form inline className="py-3">
                    <h3>Search vehicle</h3>
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="search" id="search" placeholder="Enter vehicle No" value={search} onChange={this.searchHandler}/>
                            </FormGroup>
                        </Col>
                        
                    </Form>
                </Row>
                
                <hr md="12" className="py-3"/>
                <Row>
                    {this.renderProfiles()}
                </Row>
                <hr md="12" className="py-3"/>
                <Row>
                    {this.renderVehicles()}
                </Row>
            </div></div>
        )
    }
}

export default Search