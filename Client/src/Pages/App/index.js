import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomeView from '../HomeView/HomeView'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import CreateAppointment from '../CreateAppointment/CreateAppointment';
import Appointments from '../Appointments/Appointments';
import SearchVehicle from '../SearchVehicle/SearchVehicle'
import PasswordForget from '../ForgetPassword/ForgetPassword'
import Profile from '../Profile/Profile'
import * as ROUTES from '../../helpers/routes';
import { auth } from "../../services/firebase";

import './App.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }
  render() {
        
    return (
        <div>
              <Router>
                  <Switch>
                      <Route exact path={ROUTES.HOME}
                      authenticated={this.state.authenticated}
                          component={HomeView}/>
                      
                      <Route exact path={ROUTES.PROFILE}
                      authenticated={this.state.authenticated}
                          component={Profile}/>

                      <Route exact path={ROUTES.LOG_IN}
                      authenticated={this.state.authenticated}
                          component={Login}/>
                      
                      <Route exact path={ROUTES.SIGN_UP}
                      authenticated={this.state.authenticated}
                          component={Signup}/>
                      
                      <Route exact path={ROUTES.PASSWORD_FORGET}
                      authenticated={this.state.authenticated}
                          component={PasswordForget}/>
                      
                      <Route exact path={ROUTES.APPOINTMENT}
                      authenticated={this.state.authenticated}
                          component={Appointments}/>
                      
                      <Route exact path={ROUTES.CREATE_APPOINTMENT}
                      authenticated={this.state.authenticated}
                          component={CreateAppointment}/>
                     
                      <Route exact path={ROUTES.SEARCH_VEHICLE}
                      authenticated={this.state.authenticated}
                          component={SearchVehicle}/>
                     
                      
                   
                  </Switch>
              </Router >
          </div>
      )
  }
}
export default App;

/*function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
        }
      />
    );
  }
  
function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          authenticated === false ? (
            <Component {...props} />
          ) : (
              <Redirect to={ROUTES.APPOINTMENT}/>
              
            )
        }
      />
    );
  }

class App extends Component {
constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }
    render() {
        
        return (
            <div>
                
                <Router>
                    <Switch>
                        <Route exact path={ROUTES.HOME}>
                            <HomeView />
                        </Route>
                        <PrivateRoute  path={ROUTES.APPOINTMENT}
                            authenticated={this.state.authenticated}
                            component={Appointments}
                          />
                        <PrivateRoute path={ROUTES.CREATE_APPOINTMENT}
                            authenticated={this.state.authenticated}
                            component={CreateAppointment}
                          />
              
                        
                        <PrivateRoute path={ROUTES.SEARCH_VEHICLE}
                            authenticated={this.state.authenticated}
                            component={SearchVehicle}
                          />
                        <PrivateRoute path={ROUTES.VEHICLE_DETAILS}
                            authenticated={this.state.authenticated}
                            component={VehicleDetails}
                          />
                        <PublicRoute path={ROUTES.LOG_IN}
                            authenticated={this.state.authenticated}
                            component={Login}
                        />
                        <PublicRoute path={ROUTES.SIGN_UP}
                            authenticated={this.state.authenticated}
                            component={Signup}
                        />
                          
                          
                        
                    </Switch>
                </Router >
            </div>
        )
    }
}

export default App;*/