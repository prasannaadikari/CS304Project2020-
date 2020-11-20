import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomeView from '../Home/Home'
import Appointments from '../Appointments/Appointments';
import Search from '../Search/Search'

import * as ROUTES from '../../helpers/routes';
//import { auth } from "../../services/firebase";

import './App.css';

class App extends Component {

  render() {
      return (
          <div>
              
              <Router>
                  <Switch>
                      <Route exact path={ROUTES.HOME}>
                          <HomeView />
                      </Route>
                      
          
                      
                      <Route exact path={ROUTES.APPOINTMENT}>
                          <Appointments />
                      </Route>
                      
                      <Route exact path={ROUTES.SEARCH}>
                          <Search />
                      </Route>
                      
                      
                  </Switch>
              </Router >
          </div>
      )
  }
}

export default App;