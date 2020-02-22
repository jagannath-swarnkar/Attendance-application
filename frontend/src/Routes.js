import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from './Components/App';
import Signup from './Components/Signup';
import Signin from "./Components/Signin";

export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Signin} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/" exact component={App} />
          <Route path="/home" exact component={App} />

        </Switch>
      </Router>
    );
  }
}

export default Routes;
