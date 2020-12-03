import React, { Component } from 'react'
import _ from 'lodash';
import { Container, Row, Col, Card, CardTitle, CardBody, CardText} from 'reactstrap';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import Images from "../../assets/images";
import * as ROUTES from '../../helpers/routes';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';

const AutoplaySlider = withAutoplay(AwesomeSlider);

export class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:auth().currentUser
        };
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
            description: 'We should be concerned to provide good service for your vehicles'
        },
        {
            title: 'Latest Technologies',
            description: 'We have all the modern services and equipment necessary to provide all machaniclal and electrical services for your vehicles.'
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
            <div><Header/><div>
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
                <Footer/>
            </div ></div>
        )
    }
}

export default HomeView