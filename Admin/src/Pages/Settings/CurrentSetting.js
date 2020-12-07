import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'
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

        this.setState({n:1});
        settings.push({
            key:key,
            holiday: data.holiday,
            max: data.max
      });
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
  }

 

  render() {
    const { settings, currentSetting, currentIndex,loading} = this.state;

    return (
      <div> <Header/><div className="p-5">
      <Container>
        <div className=" justify-content-between mb-5">
          <h3>Settings</h3>
          {loading ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : null}
          <hr md="12" className="py-3"/>
          <ul className="list-group col-lg-9">
                {settings && settings.map((setting, index) => (
                <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveSetting(setting, index)}
                  key={index}>
                  <Row><Col>
                    
                    <Row><Col xs="auto">
                        <h6><b>Holiday:</b></h6>
                        </Col><Col>
                        <h6>{setting.holiday}</h6>
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
              {currentSetting ? (
                <Setting
                  setting={currentSetting}
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
