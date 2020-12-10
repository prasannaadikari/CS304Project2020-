import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, Label, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.onChangeHoliday1 = this.onChangeHoliday1.bind(this);
    this.onChangeHoliday2 = this.onChangeHoliday2.bind(this);
    this.onChangeMax = this.onChangeMax.bind(this);

    this.updateS = this.updateS.bind(this);

    this.state = {
      currentSetting: {
        key: null,
        holiday1: '',
        holiday2: '',
        max: ''
      },
      msg: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { setting } = nextProps;
    if (prevState.currentSetting.key !== setting.key) {
      return {
        currentProfile: setting,
        msg: ""
      };
    }

    return prevState.currentSetting;
  }

  componentDidMount() {
    this.setState({
      currentSetting: this.props.setting,
    });
  }


  onChangeHoliday1(e) {
    const holiday1 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSetting: {
          ...prevState.currentSetting,
          holiday1: holiday1,
        },
      };
    });
  }
  onChangeHoliday2(e) {
    const holiday2 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSetting: {
          ...prevState.currentSetting,
          holiday2: holiday2,
        },
      };
    });
  }
  onChangeMax(e) {
    const max = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSetting: {
          ...prevState.currentSetting,
          max: max,
        },
      };
    });
  }


  updateS() {
    const data = {
      holiday1: this.state.currentSetting.holiday1,
      holiday2: this.state.currentSetting.holiday2,
      max: this.state.currentSetting.max
    };

    Db.updateSettings(this.state.currentSetting.key, data)
      .then(() => {
        this.setState({
          msg: "settings were updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { currentSetting,msg } = this.state;

    return (
      <div>
        {currentSetting
         ? (
          <Container>
          <div >
          <Form >
                    <h3 className="text-center">Update settings</h3>
                    <hr className="mb-5" />

                    
                    <Row>
                      <Col>
                    <FormGroup>
                                <Input type="select" name="holiday1" id="holiday1" value={this.state.holiday1} onChange={this.onChangeHoliday1} >
                                    <option>{moment().format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(5,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(6,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(7,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(8,'days').format("dddd Do MMMM YYYY")}</option>
                                </Input>
                            </FormGroup>
                            </Col>
                    </Row>
                    <Row>
                      <Col>
                    <FormGroup>
                                <Input type="select" name="holiday2" id="holiday2" value={this.state.holiday2} onChange={this.onChangeHoliday2} >
                                    <option>{moment().format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(7,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(8,'days').format("dddd Do MMMM YYYY")}</option>
                                </Input>
                            </FormGroup>
                            </Col>
                    </Row>

                    {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                    <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <FormGroup className="mt-5">
                        <Button onClick={this.updateS}  className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                    </Col></Row>
                </Form>
            </div>
          </Container>) 
          : (
         null)}
      
    </div>
    );
  }
}
