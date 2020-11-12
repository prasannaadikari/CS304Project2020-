import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomeView from '../HomeView/HomeView'
import Login from '..//Login/Login';
import Signup from '../Signup/Signup';
//import AccountSettings from '../AccountSettings/AccountSettings';
import CreateAppointment from '../CreateAppointment/CreateAppointment';
import Appointments from '../Appointments/Appointments';
//import ErrorPage from '../ErrorPage/ErrorPage'
import SearchVehicle from '../SearchVehicle/SearchVehicle'
import VehicleDetails from '../VehicleDetails/VehicleDetails'
//import VerifyPassword from '../VerifyPassword/VerifyPassword'
//import ForgetPassword from '../PasswordForget/PasswordForget'
//import ChangePassword from '../PasswordChange/PasswordChange'

import * as ROUTES from '../../helpers/routes';
import { auth } from "../../services/firebase";

import './App.css';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
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
              <Redirect to="/chat" />
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
                        <Route exact path={ROUTES.LOG_IN}>
                            <Login />
                        </Route>
                        <Route exact path={ROUTES.SIGN_UP}>
                            <Signup />
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
                            component={Appointments}
                          />
                        <PrivateRoute path={ROUTES.VEHICLE_DETAILS}
                            authenticated={this.state.authenticated}
                            component={Appointments}
                          />
                        
                    </Switch>
                </Router >
            </div>
        )
    }
}

export default App;