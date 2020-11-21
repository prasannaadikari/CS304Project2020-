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
      profile: [],
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

      if(data.uid===this.state.user.uid){
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
    const { profiles, currentProfile, currentIndex } = this.state;

    return (
      <div className="p-5"> <Header/><div className="p-5">
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
                        <h6>User name:</h6>
                      </Col><Col>
                        <h6>{profile.username}</h6>
                      </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6>Name:</h6>
                        </Col><Col>
                        <h6>{profile.title}.{profile.initials}.{profile.lastname}</h6>
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6>Contact email:</h6>
                        </Col><Col>
                        <h6>{profile.email}</h6>
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6 >Address:</h6>
                        </Col><Col>
                        <h6>{profile.address}</h6>
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6>Telephone:</h6>
                        </Col><Col>
                        <h6>{profile.phone}</h6>
                        </Col>
                    </Row>
                    </Col>
                    <Col><h5 className="text-primary">Click here to update your profile</h5></Col>
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
