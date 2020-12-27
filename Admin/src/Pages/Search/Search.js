import React, { Component } from 'react'
import Header from "../../components/Header";
import {  Row, Col, Card, Input,Form,FormGroup,CardBody} from 'reactstrap';
import _ from 'lodash';
import {Offline} from "react-detect-offline";

import Db from "../../helpers/Db";
import * as ROUTES from '../../helpers/routes';

function searchingFor(search){
    return function(x){
        return x.uid.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

export class Search extends Component {
    constructor(props){
        super(props);
        this.onDataChangeP = this.onDataChangeP.bind(this);
        this.searchHandler = this.searchHandler.bind(this);

        this.state={
            search:"",
            appointments: [],
            profiles:[],
            error:null,
            loading: true
        }
    }
    searchHandler(event){
        this.setState({ search:event.target.value})
    }
    
    
      componentDidMount() {
        Db.getAllProfiles().on("value", this.onDataChangeP);
      
      }
    
      componentWillUnmount() {
        Db.getAllProfiles().off("value", this.onDataChangeP);
      }
    

      onDataChangeP(items) {
        this.setState({ loading: true });
        let profiles = [];
    
        items.forEach((item) => {
          let key = item.key;
          let data = item.val();
          
          if (this.state.user===null) {
            this.props.history.push(ROUTES.HOME);
          }else{
          profiles.push({
            key: key,
            title: data.title,
            lastname: data.lastname,
            email: data.email,
            address: data.address,
            phone: data.phone,
            uid: data.uid
          });}
        });
    
        this.setState({
            profiles: profiles,
        });
        this.setState({ loading: false });
      }
    renderProfiles = () => { const { profiles, search } = this.state;
        return (
            _.map(profiles.filter(searchingFor(search)), (profile) => {
                return (
                    <Col md="4" className="p-2">
                    <Card className="h-100 shadow p-2" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                            <Row><Col>
                    
                    <Row><Col xs="auto">
                        <h6><b>Name:</b></h6>
                        </Col><Col>
                        {profile.lastname ? <h6>{profile.title}.{profile.lastname}</h6> : null}
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



    render() {  const {error,search,loading } = this.state;
        return (
            <div><Header /><div className="container py-5">
                <Row>
                    <Form inline className="py-3">
                    <h3>Search</h3>

                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="search" id="search" placeholder="Enter Uid" value={search} onChange={this.searchHandler}/>
                            </FormGroup>
                        </Col>
                        
                    </Form>
                </Row>
                {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}
                <hr md="12" className="py-3"/>
                <Offline>Unable to connect. Please review your network settings...</Offline>
                <Row>
                    {this.renderProfiles()}
                </Row>
                
            </div></div>
        )
    }
}

export default Search