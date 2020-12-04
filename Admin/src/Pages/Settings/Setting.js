import React, { Component } from "react";
import Db from "../../helpers/Db";
import {Card, CardTitle, Form,Input,Container, FormGroup, Label, CardBody, Button, Row, Col} from 'reactstrap';
import moment from 'moment'

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.onChangeHoliday = this.onChangeHoliday.bind(this);
    this.onChangeMax = this.onChangeMax.bind(this);

    this.updateS = this.updateS.bind(this);

    this.state = {
      currentSetting: {
        key: null,
        holiday: '',
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


  onChangeHoliday(e) {
    const holiday = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSetting: {
          ...prevState.currentSetting,
          holiday: holiday,
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
      holiday: this.state.currentSetting.holiday,
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
          <div className=" col-lg-10  min-vh-100 d-flex flex-column justify-content-center">
          <Form >
                    <h3 className="text-center">Update setting</h3>
                    <hr className="mb-5" />

                    <Row>
                        
                        
                    </Row>
                    <Row><Col>
                    <FormGroup>
                                <Input type="select" name="holiday" id="holiday" value={this.state.holiday} onChange={this.onChangeHoliday} >
                                    <option>{moment().format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(1,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(2,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(3,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(4,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(5,'days').format("dddd Do MMMM YYYY")}</option>
                                    <option>{moment().add(6,'days').format("dddd Do MMMM YYYY")}</option>
                                </Input>
                            </FormGroup>
                            </Col>
                    </Row>

                    {msg ? <FormGroup className="mt-2 text-center text-success">{msg}</FormGroup> : null}
                    <FormGroup className="mt-5">
                        <Button onClick={this.updateS}  className="btn-block" color="primary">Submit</Button>
                    </FormGroup>
                </Form>
            </div>
          </Container>) 
          : (
         null)}
      
    </div>
    );
  }
}
