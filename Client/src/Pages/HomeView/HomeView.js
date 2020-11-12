import React, { Component } from 'react'
import _ from 'lodash';
import { Container, Row, Col, Card, CardImg, CardTitle, CardBody, CardText, CardSubtitle, Button} from 'reactstrap';
import Header from "../../components/Header";

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import Images from "../../assets/images";
import * as ROUTES from '../../helpers/routes';
import { Link } from 'react-router-dom';

const AutoplaySlider = withAutoplay(AwesomeSlider);

export class HomeView extends Component {

    sliderItems = [
        {
            styles: {
                backgroundImage: `url(${Images.Carousel1})`,
                backgroundSize: 'cover'
            }
        }
    ]

    services = [
        {
            title: 'Our Services',
            description: 'Patients of AromedMedical enjoy access to the collective expertise of health professionals across our wide range of health services'
        },
        {
            title: 'Vision',
            description: 'We should be concerned not only about the health of individual patients, but also the health of our entire society'
        },
        {
            title: 'Latest Technologies',
            description: 'We have all the modern services and equipment necessary to provide all-inclusive services.'
        }
    ]

    renderInfoCards = () => {
        return (
            <Row>
                <Col md="6" className="p-2">
                    <Card className="h-100" style={{ 'background': '#448AFF', 'color': '#FFF' }}>
                        <CardBody>
                            <CardTitle><p className="font-weight-bold">APPOINTMENTS</p></CardTitle>
                            <CardText>Make a reservation ahead of time to guarantee your spot. You can now make appointments through our website or give us a call.</CardText>
                            <button  className="btn-block CardButton" href={ROUTES.CREATE_APPOINTMENT}>MAKE AN APPOINTMENT</button>
                        </CardBody>
                    </Card>
                </Col >
                
                <Col md="6" className="p-2">
                    <Card className="h-100" style={{ 'background': '#448AFF', 'color': '#FFF' }}>
                        <CardBody>
                            <CardTitle><p className="font-weight-bold">OPENING HOURS</p></CardTitle>
                            <p>Mon - Fri <span style={{ 'position': 'absolute', 'right': '20px' }}>08:00 - 21:00</span></p><hr style={{ 'backgroundColor': 'white' }} />
                            <p>Sat - Sun <span style={{ 'position': 'absolute', 'right': '20px' }}>08:00 - 17:00</span></p><hr style={{ 'backgroundColor': 'white' }} />
                            <p>Poya Days <span style={{ 'position': 'absolute', 'right': '20px' }}>Closed</span></p><hr style={{ 'backgroundColor': 'white' }} />
                        </CardBody>
                    </Card>
                </Col >
            </Row>
        )
    }

    renderServices = () => {
        return (
            _.map(this.services, (service) => {
                return (
                    <Col md="4" className="p-2">
                        <Card className="h-100 shadow p-2" style={{ 'background': '#FFF', 'color': '#000' }}>
                            <CardBody>
                                <CardTitle className="text-center font-weight-bold">{service.title}</CardTitle>
                                <CardText className="text-justify">{service.description}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }

    renderSlider = () => {
        return (
            _.map(this.sliderItems, (item) => {
                return (
                    <div style={item.styles} className="p-3">
                        <div class="row">
                            <div style={{ 'font-size': '4vw' }} className="col-md-8 text-white mb-3">Welcome to AUTO Vehicle Setvice Center</div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 ml-3 mb-3">
                            <Link className="btn btn-outline-primary" to={ROUTES.CREATE_APPOINTMENT}>MAKE AN APPOINTMENT</Link>
                            </div>
                            <div class="col-xs-6 ml-3 mb-3">
                            <Link className="btn btn-outline-primary" to={ROUTES.SIGN_UP}>Sign up</Link>
                            </div>
                            <div class="col-xs-6 ml-3 mb-3">
                            <Link className="btn btn-outline-primary" to={ROUTES.LOG_IN}>Log in</Link>
                            </div>
                        </div>
                    </div >
                )
            })
        )
    }

    render() {
        return (
            <div><Header />
                <div>
                    <AutoplaySlider buttons={false} bullets={false} /*play={true}*/ cancelOnInteraction={false} interval={5000}>
                        {this.renderSlider()}
                    </AutoplaySlider>
                </div>
                <div>
                    <Container>
                        <div className="p-5">
                            {this.renderInfoCards()}
                        </div>
                        <div className="pt-3 pb-1">
                            <h3 className="text-center">Welcome to AUTO Vehicle Service Center</h3>
                            <p className="text-center text-muted">We provide the best service for your vehicles</p>
                        </div>
                        <div className="p-5">
                            <Row>
                                {this.renderServices()}
                            </Row>
                        </div>
                    </Container>
                </div>
                
                <footer className="pt-3 mt-5">
                    <div className="bg-dark pt-5">
                        <div className="p-3"></div>
                        <div className="container">
                            <div className="row ">
                                <div className="col-md-4 text-center text-md-left ">
                                    <div className="py-0">
                                        
                                        <p className="footer-links font-weight-bold">
                                            <a className="text-white mr-2" href={ROUTES.HOME}>Home</a>
                                            <a className="text-white mr-2" href={ROUTES.APPOINTMENT}>Appointment</a>
                                        </p>
                                        <p className="text-light py-4 mb-4">&copy;2020 All rights reserved</p>
                                    </div>
                                </div>
                                <div className="col-md-4 text-white my-4 text-center text-md-left ">
                                    <span className=" font-weight-bold ">Address</span>
                                    
                                    <span className=" font-weight-bold ">Phone</span>
                                   
                                </div>
                                <div className="col-md-4 text-white my-4 text-center text-md-left ">
                                    <span className=" font-weight-bold ">About Us</span>
                                    <p className="text-light" >Our Service Centre facilitates in all necessary services which is our priority at all costs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >
        )
    }
}

export default HomeView