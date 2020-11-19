import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import * as ROUTES from '../helpers/routes';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to={ROUTES.HOME}>Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          
              <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to={ROUTES.APPOINTMENT}>Appointments</Link>
              <Link className="nav-item nav-link mr-3" to={ROUTES.SEARCH}>Search</Link>
            </div>
             <div className="navbar-nav">
            </div>
        </div>
      </nav>
    </header>
  );
}


export default Header;