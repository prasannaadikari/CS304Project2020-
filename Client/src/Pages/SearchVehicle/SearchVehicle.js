import React, { Component } from 'react'
import Header from "../../components/Header";
import { Container, Row, Col, Card, CardTitle, Input,Form,FormGroup,Button,CardBody, CardText} from 'reactstrap';
import _ from 'lodash';
import Db from "../../helpers/Db";

export class SearchVehicle extends Component {
    constructor(props){
        super(props);
        this.onChangesearch = this.onChangesearch.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state={
            search:"",
            appointments: [],
            error:null
        }
    }
    onChangesearch(e) {
        this.setState({
          search: e.target.value,
        });
      }
    componentDidMount() {
        Db.getAll().on("value", this.onDataChange);
      }
    
      componentWillUnmount() {
        Db.getAll().off("value", this.onDataChange);
      }
    
    onDataChange(items) {
        let appointments = [];
    
        items.forEach((item) => {
          let key = item.key;
          let data = item.val();
           
          if(data.VNo === this.state.search) {
          appointments.push({
            key: key,
            VNo: data.VNo,
            Adate: data.Adate,
            status: data.status,
            description: data.description
          });}
        });
    
        this.setState({
          appointments: appointments,
        });
      }

    renderVehicles = () => {
        return (
            _.map(this.state.appointments, (appointment) => {
                return (
                    <Col md="4" className="p-2">
                        <Card className="h-100 shadow p-2" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <CardTitle >{appointment.VNo}</CardTitle>
                                <CardText >{appointment.Adate}</CardText>
                                <CardText >{appointment.description}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }



    render() {
        return (
            <div className="container py-5"><Header /><div className="container py-5">
                <h3>Search Vehicle</h3>
                <Row>
                    <Form inline className="py-3">
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="search" id="search" placeholder="Enter Vehicle No" vvalue={this.state.search} onChange={this.onChangesearch}/>
                            </FormGroup>
                        </Col>
                        <Col xs="auto">
                            <FormGroup>
                                <Button className="btn-block" color="primary">Search</Button>
                            </FormGroup>
                        </Col>
                    </Form>
                </Row>
                <hr md="12" className="py-3"/>
                <Row>
                    {this.renderVehicles()}
                </Row>
            </div></div>
        )
    }
}

export default SearchVehicle