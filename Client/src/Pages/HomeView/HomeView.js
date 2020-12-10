import React, { Component } from 'react'
import _ from 'lodash';
import { Container, Row, Col, Card, CardTitle, CardBody, CardText,Collapse} from 'reactstrap';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import Images from "../../assets/images";
import * as ROUTES from '../../helpers/routes';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import {Checkmark} from "react-checkmark";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:auth().currentUser,
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

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
            description: 'Customers are enjoy access to the collective expertise of technical professionals across our wide range of vehicle services.'
        },
        {
            title: 'Vision',
            description: 'We should be concerned to provide good service for your vehicles.'
        },
        {
            title: 'Latest Technologies',
            description: 'We have all the modern services and equipment necessary to provide all machaniclal and electrical services for your vehicles.'
        },
        {
            title: 'Year of Experience',
            description: 'AUTO Service Station was started 20 years ago.'
        },
        {
            title: 'Man Power',
            description: 'We have a staff of more than 30 to fulfill all your vehicle related servicing needs.'
        },
        {
            title: 'Vehicle Lifts',
            description: 'We can lift 6 vehicles at same time.This makes us one of the biggest service station in kandy area'
        }
    ]

    categoris = [
        {
            id:1,
            title: 'Vehicle Wash',
            description1: 'Quick Wash - body wash and tyre dressing',
            description2: 'Detailed Wash - Body wash, Carpet wash, Glass cleaning, Tyre dressing & Wax, Interior vacuum(Free)'
        },
        {
            id:2,
            title: 'Interior and Exterior Detailing',
            description1: 'Interior Detailing - Removing cleaning and drying of seats, Vacuum cleaning, Cleaning of floor boards/ dashboard/ upholstery/ hood, Leather care',
            description2: 'Outer exterior detailing - Body wash, Cut/ polish and wax'
        },
        {
            id:3,
            title: 'Full Services',
            description1: 'Whicl is also known as aLubrication Service is a 7 steps',
            description2: 'Top up engine oil, transmission fluid, brake fluid, clutch & power steering fluid up to optimal capasity or completely change it using high performance brand lubricants'
        },
        {
            id:4,
            title: 'Hybrid Services',
            description1: 'Total solutions for your Hybrid or Electrical vehicle by qualified technicians',
            description2: 'Battery service/ repair/ replacement, High voltage system scaning and diagnostic, Service indicating mileage setting, ECVT oil and HMMF change,Wire and cable check, Complete computer diagnostic test, Inverter coolant change and system bleeding'
        },
        {
            id:5,
            title: 'Wheel Alignment',
            description1: 'Toe allignment',
            description2: 'Caster alignment'
        },
        {
            id:6,
            title: 'Other Specific Services',
            description1: 'Engine scaning, Fuel system cleaning, ATF change, Manual gear oil change, Brake fluid change, Radiator cooling flush and replacement, Corrosing protection, Engine cleaning'
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
                            <div class="col-sm-12 .col-md-6 .offset-md-3">
                                <Link className="btn btn-success" to={ROUTES.CREATE_APPOINTMENT}>MAKE AN APPOINTMENT</Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col >
                
                <Col md="6" className="p-2">
                    <Card className="h-100" style={{ 'background': '#448AFF', 'color': '#FFF' }}>
                        <CardBody>
                            <CardTitle><p className="font-weight-bold">OPENING HOURS</p></CardTitle>
                            <p>Mon - Fri <span style={{ 'position': 'absolute', 'right': '20px' }}>8:00am - 5:00pm</span></p><hr style={{ 'backgroundColor': 'white' }} />
                            <p>Sat - Sun <span style={{ 'position': 'absolute', 'right': '20px' }}>6:30 - 6:00pm</span></p><hr style={{ 'backgroundColor': 'white' }} />
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
                                <CardText className="">{service.description}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        )
    }

    renderCategories = () => {
        return (
            _.map(this.categoris, (categori) => {
                return (
                    <Col md="3" className="p-2">
                        <Card className="h-100 shadow p-2" style={{ 'background': '#888', 'color': '#FFF', marginBottom: '1rem'  }} onClick={this.toggle}>
                                <CardBody>
                                    <CardTitle className="text-center font-weight-bold">{categori.title}</CardTitle>
                                <Collapse isOpen={this.state.isOpen}>
                                    <Checkmark size='medium'/>
                                    <CardText >{categori.description1}</CardText>
                                    <CardText >{categori.description2}</CardText>
                                    <CardText className="text-justify text-center text-info">Hide</CardText>
                                </Collapse>
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
                            <div style={{ 'font-size': '4vw' }} className="col-md-8 text-white mb-3">Welcome to AUTO Vehicle Service Center</div>
                        </div>
                        <div class="row">
                        {auth().currentUser
                            ?<div>
                                <div class="col-xs-6 ml-3 mb-3">
                                <Link className="btn btn-outline-primary" to={ROUTES.CREATE_APPOINTMENT}>MAKE AN APPOINTMENT</Link>
                                </div>
                                <Row><Col>
                                <div class="col-xs-6 ml-3 mb-3">
                                <Link className="btn btn-outline-primary" onClick={() => auth().signOut()}>LOG OUT</Link>
                                </div>
                                </Col></Row>
                            </div>
                            :<div>
                                <div class="col-xs-6 ml-3 mb-3">
                                <Link className="btn btn-outline-primary" to={ROUTES.CREATE_APPOINTMENT}>MAKE AN APPOINTMENT</Link>
                                </div>
                                <div class="col-xs-6 ml-3 mb-3">
                                <Link className="btn btn-outline-primary" to={ROUTES.SIGN_UP}>Sign up</Link>
                                </div>
                                <div class="col-xs-6 ml-3 mb-3">
                                <Link className="btn btn-outline-primary" to={ROUTES.LOG_IN}>Log in</Link>
                                </div>
                            </div>}
                        </div>
                    </div >
                )
            })
        )
    }

    render() {
        return (
            <div><Header/><div style={{ 'background': '#333'}}>
                <div>
                    <AutoplaySlider buttons={false} bullets={false} cancelOnInteraction={false} interval={5000}>
                        {this.renderSlider()}
                    </AutoplaySlider>
                </div>
                <div>
                    <Container>
                        <div className="p-5">
                            {this.renderInfoCards()}
                        </div>
                        <div className="pt-3 pb-1">
                            <h3 className="text-center text-light">Welcome to AUTO Vehicle Service Center</h3>
                            <p className="text-center text-muted">We provide the best service for your vehicles</p>
                        </div>
                        <div className="p-5">
                            <Row>
                                {this.renderServices()}
                            </Row>
                        </div>
                        <div className="p-5">
                        <h3 className="text-center text-primary">Service Categories</h3>
                        {this.state.isOpen===true ? null :<p className="text-center text-light" >Click on for more information</p>}
                            <Row className="p-2">
                                {this.renderCategories()}
                            </Row>
                        </div>
                    </Container>
                </div>
                <Footer/>
            </div ></div>
        )
    }
}

export default HomeView