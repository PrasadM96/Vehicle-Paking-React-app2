import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import Temp from "./views/Temp";

class App extends Component {
  state = {
    loggedin: false
  };
  render() {
    return this.state.loggedin ? (
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    ) : (
      <Temp />
    );
  }
}

export default App;
