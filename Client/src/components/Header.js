import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import * as ROUTES from '../helpers/routes';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: auth().currentUser,
        isOpen: false
    };
}

toggle = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
}

  render() {
  return (
    <div>
      <Navbar className="p-3" color="dark" dark expand="md">
                    <NavbarBrand  className="ml-3" href={ROUTES.HOME}>AutoVehicles</NavbarBrand>  
                    <NavbarToggler onClick={() => this.toggle()} />
                    <Collapse isOpen={this.state.isOpen} navbar>
          {auth().currentUser
          ? <div className="navbar-nav ml-auto">
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.HOME}>Home</Link>
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.CREATE_APPOINTMENT}>Create Appointments</Link>
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.APPOINTMENT}>Appointments</Link>
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.SEARCH_VEHICLE}>Search</Link>
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.CURRENT_PROFILE}>pROFILE</Link>
              <Link className="nav-item nav-link ml-3 text-uppercase" onClick={() => auth().signOut()} to={ROUTES.HOME}>Log out</Link>
            </div>
          : <div className="navbar-nav ml-auto">
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.LOG_IN}>Log in</Link>
              <Link className="nav-item nav-link ml-3 text-uppercase" to={ROUTES.SIGN_UP}>Sign Up</Link>
            </div>}
       
        </Collapse>
                </Navbar>
    </div>
  );
}
}


