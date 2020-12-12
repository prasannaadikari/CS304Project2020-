import React, { Component } from "react";
import {Container,Row, Col} from 'reactstrap';
import {Offline} from "react-detect-offline";

import Db from '../../helpers/Db';
import Profile from './Profile';
import * as ROUTES from '../../helpers/routes';
import Header from '../../components/Header';
import { auth } from '../../services/firebase';

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProfile = this.setActiveProfile.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      profiles: [],
      n:null,
      user: auth().currentUser,
      currentProfile: null,
      currentIndex: -1,
      loading: true
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
        this.setState({n:1});
        this.props.history.push(ROUTES.HOME);
      }else if(data.uid===this.state.user.uid){
        this.setState({n:1});
        profiles.push({
            key:key,
            title: data.title,
            lastname: data.lastname,
            email: data.email,
            address: data.address,
            phone: data.phone,
      });}
    });
    if (this.state.n===null) {
      this.props.history.push(ROUTES.CREATE_PROFILE);
    }

    this.setState({
      profiles: profiles,
    });
    this.setState({ loading: false });
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
    this.myRef.scrollIntoView({behavior:'smooth'})
  }

 

  render() {
    const { profiles, currentProfile, currentIndex,loading} = this.state;

    return (
      <div> <Header/><div className="p-5">
      <Container>
        <div className=" justify-content-between mb-5">
          <h3>Your profile</h3>

          {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}
          <hr md="12" className="py-3"/>
          <Offline>Unable to connect. Please review your network settings...</Offline>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
          <div ref={(ref)=>this.myRef=ref}>
              {currentProfile ? (
                <Profile
                  profile={currentProfile}
                  refreshList={this.refreshList}
                />
              ) : (
              null
              )}
            </div>
            <hr md="12" className="py-3"/>
            </Col>
        </Row>

          <ul className="list-group col-lg-9">
                {profiles && profiles.map((profile, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveProfile(profile, index)}
                  key={index}>
                  <Row><Col>
                    <Row><Col xs="auto">
                        <h6><b>Name:</b></h6>
                        </Col><Col>
                        {profile.lastname ? <h6>{profile.title}. {profile.lastname}</h6> : null}
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
                </li>))}
          </ul>
        </div>
          </Container>
        </div>
      </div>
    );
  }
}
