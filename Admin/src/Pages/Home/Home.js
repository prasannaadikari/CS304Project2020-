import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              <p className="lead">Some text</p>
              <div className="mt-4">
                <Link className="btn btn-outline-primary" href={ROUTES.LOG_IN}>Log in</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
