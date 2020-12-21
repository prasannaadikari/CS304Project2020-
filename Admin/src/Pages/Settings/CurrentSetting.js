import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Container,Row, Col} from 'reactstrap';
import {Offline} from "react-detect-offline";

import Setting from "./Setting";
import * as ROUTES from '../../helpers/routes';
import Header from "../../components/Header";
import { auth } from '../../services/firebase';

export default class UpdateSetting extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSetting = this.setActiveSetting.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      settings: [],
      currentSetting: null,
      currentIndex: -1,
      loading:true
    };
  }

  componentDidMount() {
    Db.getAllSettings().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    Db.getAllSettings().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let settings = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();

      if (this.state.user===null) {
        this.props.history.push(ROUTES.HOME);
      }else{
        settings.push({
            key:key,
            holiday1: data.holiday1,
            holiday2: data.holiday2,
            max: data.max
      });}
    });

    this.setState({ settings: settings, loading:false});
  }

  refreshList() {
    this.setState({
      currentSetting: null,
      currentIndex: -1,
    });
  }

  setActiveSetting(setting, index) {
    this.setState({
      currentSetting: setting,
      currentIndex: index,
    });
    this.myRef.scrollIntoView({behavior:'smooth'})
  }

 

  render() {
    const { settings, currentSetting, currentIndex,loading} = this.state;

    return (
      <div> <Header/><div className="p-5">
      <Container>
        <div className=" justify-content-between mb-5">
          <h3>Settings</h3>

          <hr md="12" className="py-3"/>
            <Offline>Unable to connect. Please review your network settings...</Offline>
          
          {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}
          <hr md="12" className="py-3"/>
          <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <div ref={(ref)=>this.myRef=ref}>
              {currentSetting ? (
                <Setting
                  setting={currentSetting}
                  refreshList={this.refreshList}
                />
              ) : (
              null
              )}
            </div></Col></Row>

          <ul className="list-group col-lg-9">
                {settings && settings.map((setting, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveSetting(setting, index)}
                  key={index}>
                  <Row><Col>
                    
                    <Row><Col xs="auto">
                        <h6><b>Holiday:</b></h6>
                        </Col><Col>
                        <h6>{setting.holiday1}</h6>
                        </Col>
                    </Row>
                    <Row><Col xs="auto">
                        <h6><b>Holiday:</b></h6>
                        </Col><Col>
                        <h6>{setting.holiday2}</h6>
                        </Col>
                    </Row>
                    
                    </Col>
                    <Col><h5 className="text-primary">Edit</h5></Col>
                    </Row>
                </li>
                ))}
                
                
                          
                      
              </ul>
        </div>
            </Container>
            </div></div>
    );
  }
}
