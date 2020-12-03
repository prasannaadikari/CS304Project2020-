import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'
import Profile from "./Profile";
import * as ROUTES from '../../helpers/routes';
import Header from "../../components/Header";
import { auth } from '../../services/firebase';

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProfile = this.setActiveProfile.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      profiles: [],
      user: auth().currentUser,
      currentProfile: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    Db.getAllProfiles().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    Db.getAllProfiles().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let profiles = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();

      if (this.state.user===null) {
        this.props.history.push(ROUTES.HOME);
      }else if(data.uid===this.state.user.uid){
        profiles.push({
            key:key,
            username: data.username,
            title: data.title,
            initials: data.initials,
            lastname: data.lastname,
            email: data.email,
            address: data.address,
            phone: data.phone,
      });}
    });
    

    this.setState({
      profiles: profiles,
    });
  }

  refreshList() {
    this.setState({
      currentProfile: null,
      currentIndex: -1,
    });
  }

  setActiveProfile(profile, index) {
    this.setState({
      currentProfile: profile,
      currentIndex: index,
    });
  }

 

  render() {
    const { profiles, currentProfile, currentIndex,n } = this.state;

    return (
      <div> <Header/><div className="p-5">
      <Container>
        <div className=" justify-content-between mb-5">
          <h3>Your profile</h3>
          <hr md="12" className="py-3"/>
          <ul className="list-group col-lg-9">
                {profiles && profiles.map((profile, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveProfile(profile, index)}
                  key={index}>
                  <Row><Col>
                    <Row>
                      <Col xs="auto">
                        <h6><b>User name:</b></h6>
                      </Col><Col>
                        <h6>{profile.username}</h6>
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
                    <Col><h5 className="text-primary">Edit</h5></Col>
                    </Row>
                </li>
                ))}
                
                
                          
                      
              </ul>
        </div>
            <div>
              {currentProfile ? (
                <Profile
                  profile={currentProfile}
                  refreshList={this.refreshList}
                />
              ) : (
              null
              )}
            </div>
            </Container>
            </div></div>
    );
  }
}
