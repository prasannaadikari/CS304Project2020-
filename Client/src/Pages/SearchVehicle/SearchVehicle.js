import React, { Component } from 'react'
import { Col, Row, FormGroup, Input, Form, Button} from 'reactstrap';
import Header from "../../components/Header";

export class SearchVehicle extends Component {
    render() {
        return (
            <div className="container py-5"><Header />
                <h3>Search Vehicle</h3>
                <Row>
                    <Form inline className="py-3">
                        <Col xs="auto">
                            <FormGroup inline>
                                <Input type="text" name="VehicleNo" id="VehicleNo" placeholder="Enter Vehicle No" />
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
            </div>
        )
    }
}

export default SearchVehicle