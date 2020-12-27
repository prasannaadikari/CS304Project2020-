import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';

import * as ROUTES from '../../helpers/routes';
import Header from "../../components/Header";
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header/>
        <section>
          <div className="jumbotron jumbotron-fluid">
            <div className="container text-center py-5">
              <h1 style={{ 'font-size': '6vw'}} >Welcome</h1>
              <div className="mt-4">
                {auth().currentUser ? <Link className="btn btn-outline-primary" onClick={() => auth().signOut()} to={ROUTES.HOME}>Log out</Link> :<Link className="btn btn-outline-primary" to={ROUTES.LOG_IN}>Log in</Link>}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
