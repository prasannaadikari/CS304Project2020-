import React, { Component } from 'react'
import { Col, Row, FormGroup, Form, Button, Card, CardTitle, CardBody} from 'reactstrap';
import _ from 'lodash';
import Header from "../../components/Header";

export class VehicleDetails extends Component {
    Vehicles=[
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        },
        {
            vehicleNo:'cp MM-XXXX'
        }
    ]
    Details=[
        {
            details:'cp MM-XXXX'
        },
        {
            details:'cp MM-XXXX'
        },
        {
            details:'cp MM-XXXX'
        }
    ]

        renderVehicles = () => {
            return (
                _.map(this.Vehicles, (Vehicle) => {
                    return (
                        <Col md="auto" className="p-6">
                            <Form>
                                <FormGroup>
                                    <Button className="btn-block h-100 shadow" color="primary"><b>{Vehicle.vehicleNo}</b></Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    )
                })
            )
        }

        renderDetails = () => {
            return (
                _.map(this.Details, (Details) => {
                    return (
                        <Col md="12" className="py-3">
                            <Card className="h-100 shadow" style={{ 'background': '#FFF', 'color': '#000' }}>
                                <CardBody>
                                    <Row>
                                        <CardTitle ><b>{Details.details}</b></CardTitle>
                                    </Row>
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
                <h3 >My Vehicles</h3>    
                <hr md="12"/>
                    <Row>
                        {this.renderVehicles()}
                    </Row>
                <hr md="12"/>
                    {this.renderDetails()}
            </div></div>
        )
    }
}

export default VehicleDetails