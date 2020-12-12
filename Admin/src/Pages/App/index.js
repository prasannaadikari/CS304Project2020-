import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomeView from '../Home/Home'
import Appointments from '../Appointments/Appointments';
import Search from '../Search/Search'
import SearchAppointments from '../SearchAppointment/PreviousAppointments'
import CreateAppointment from '../CreateAppointment/CreateAppointment'
import Settings from '../Settings/CurrentSetting'
import Login from '../Login/Login'
import PasswordForget from '../ForgetPassword/ForgetPassword'

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
                      <Route exact path={ROUTES.SEARCH_APPOINTMENTS}
                      authenticated={this.state.authenticated}
                        component={SearchAppointments} />
                      <Route exact path={ROUTES.PASSWORD_FORGET}
                      authenticated={this.state.authenticated}
                          component={PasswordForget}/>
                      
                      <Route exact path={ROUTES.APPOINTMENT}
                      authenticated={this.state.authenticated}
                          component={Appointments}/>
                      
                      <Route exact path={ROUTES.CREATE_APPOINTMENT}
                      authenticated={this.state.authenticated}
                          component={CreateAppointment}/>
                      
                      <Route exact path={ROUTES.SETTINGS}
                      authenticated={this.state.authenticated}
                          component={Settings} />
                      
                      
                      <Route exact path={ROUTES.SEARCH}
                      authenticated={this.state.authenticated}
                          component={Search}/>
                      <Route exact path={ROUTES.LOG_IN}
                      authenticated={this.state.authenticated}
                          component={Login}/>
                      
                      
                  </Switch>
              </Router >
          </div>
      )
  }
}

export default App;