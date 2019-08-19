import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";

import {
  Navbar,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Nav,
  NavItem
} from "react-bootstrap";
import signIn from "./SignIn";
import "../components/Background/Background.css";

class Temp extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="bg">
          <Router>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Vehicle Parking</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav pullRight>
                  <NavItem eventKey={1} exact href="/signin">
                    Login
                  </NavItem>
                  <NavItem eventKey={2} exact href="/signup">
                    SignUp
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Route path="/signin" component={signIn} />
            <Route path="/signup" component={SignUp} />
          </Router>
        </div>
        <h1>Rest</h1>
      </div>
    );
  }
}

export default Temp;
