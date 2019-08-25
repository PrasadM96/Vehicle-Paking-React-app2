import React, { Component } from "react";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
//import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
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
import DetailedForm from "./DetailForm";
import "../components/Background/Background.css";

class Temp extends Component {
  state = {
    regitered: true,
    login: false
  };

  load() {
    if (this.state.registered === true) {
      return <Redirect to="/admin/detailForm" />;
    }
  }

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
                  <NavItem eventKey={2} exact href="#about">
                    About Us
                  </NavItem>
                  <NavItem eventKey={1} exact href="/signin">
                    SignIn & SignUp
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div />

            <Route path="/signin" component={signIn} />
            <Route path="/detailForm" component={DetailedForm} />
          </Router>
        </div>
        <h1 id="about" className="about">
          <br />
          <br />
          About Us
        </h1>
      </div>
    );
  }
}

export default Temp;
