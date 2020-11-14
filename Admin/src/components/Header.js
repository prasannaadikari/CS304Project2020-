import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import * as ROUTES from '../helpers/routes';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">AutoVehicles</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to={ROUTES.APPOINTMENT}>Appointments</Link>
              <button className="btn btn-primary mr-3" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to={ROUTES.LOG_IN}>Log in</Link>
              <Link className="nav-item nav-link mr-3" to={ROUTES.SIGN_UP}>Sign Up</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}


export default Header;