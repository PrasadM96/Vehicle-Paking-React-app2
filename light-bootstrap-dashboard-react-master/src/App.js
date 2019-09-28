import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import Temp from "./views/Temp";

class App extends Component {
  state = {
    loggedin: false //if signin
  };
  render() {
    return <Temp />;
  }
}

export default App;
