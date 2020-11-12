import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Appointments from '../containers/Appointments/Appointments'
import Login from '../containers/Login/Login'
import Search from '../containers/Search/Search'
import VehicleDetails from '../containers/VehicleDetails/VehicleDetails'

import NavBar from '../components/NavBar/NavBar';

class NavRouter extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/search/Customer">
                            <Search />
                        </Route>
                        <Route exact path="/appointments">
                            <Appointments />
                        </Route>
                        <Route exact path="/vehicle/details">
                            <VehicleDetails />
                        </Route>
                    </Switch>
                </BrowserRouter >
            </div>
        )
    }
}

export default NavRouter;