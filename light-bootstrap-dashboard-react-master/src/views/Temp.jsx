import React, { Component } from "react";
import SignIn from "./SignIn";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
//import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

//signin//////////
import "./SignUp.css";
import fbConfig from "./Config";
import firebase from "firebase";
import AdminLayout from "layouts/Admin.jsx";

import { Base64 } from "js-base64";
///////////

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
import { connect } from "react-redux";

class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      loginPassword: 0,
      detailfrom: false,
      loginRfid: 0,
      logged: false,
      array: "",
      rfid: "",
      confirm: "",
      password: "",
      errorsD: [],
      val: 0,
      pwdState: null,
      registered: false,

      rfid: "",
      name: "",
      address: "",
      telephone: "",
      email: "",
      errors: [],
      status: 0
    };
  }

  encrypt_password = val => {
    var temp = Base64.encode(val);
    return temp;
  };

  decrypt_password = val => {
    var temp = Base64.decode(val);
    return temp;
  };

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  //////detail//////
  showValidationErrDetail(elm, msg) {
    this.setState(prevState => ({
      errors: [
        ...prevState.errors,
        {
          elm,
          msg
        }
      ]
    }));
  }

  clearValidationErrDetail(elm) {
    this.setState(prevState => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onnameChangeDetail(e) {
    this.setState({ name: e.target.value });
    //We want to clear the error when ever the user type something new
    this.clearValidationErr("name");
  }

  onAddressChangeDetail(e) {
    this.setState({ address: e.target.value });
    this.clearValidationErrDetail("address");
  }

  onTelephoneChangeDetail(e) {
    this.setState({ telephone: e.target.value });
    this.clearValidationErrDetail("telephone");
  }

  onEmailChangeDetail(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErrDetail("email");
  }

  submitDetails(e) {
    //Check for all input fields and show errors if empty (you can implement other cases!)
    let temp = false;
    //console.log(this.state);
    if (this.state.name == "") {
      this.showValidationErrDetail("name", "Name Cannot be empty!");
      temp = true;
    }
    if (this.state.address == "") {
      this.showValidationErrDetail("address", "Address  Cannot be empty!");
      temp = true;
    }
    if (this.state.telephone == "") {
      this.showValidationErrDetail("telephone", "Telephone Cannot be empty!");
      temp = true;
    }
    if (this.state.email == "") {
      this.showValidationErrDetail("email", "Email Cannot be empty!");
      temp = true;
    }

    if (this.state.telephone.length != 10) {
      temp = true;
    }

    if (temp === false) {
      const rfid = this.state.rfid;
      const email = this.state.email;
      const name = this.state.name;
      const telephone = this.state.telephone;

      const app = fbConfig.database().ref("Car_Parking/Registered/" + rfid);
      var updates = {};
      updates["/Email"] = email;
      updates["/Name"] = name;
      updates["/Tel"] = telephone;

      console.log("rfiiiiid", updates);

      app.update(updates);
      this.setState({ status: 1 });
    }
  }

  ////////////////////login/////////
  showValidationErrlog(elm, msg) {
    this.setState(prevState => ({
      errors: [
        ...prevState.errors,
        {
          elm,
          msg
        }
      ]
    }));
  }
  //Remove a specific element from the array
  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  submitLogin(e) {
    const app = fbConfig.database().ref("Car_Parking");
    const app1 = fbConfig.database().ref("Car_Parking/admin");
    if (this.state.loginRfid === "admin") {
      let valadmin;
      app1.on("value", snapshot => {
        valadmin = snapshot.val();
        console.log(valadmin);
        if (this.state.loginPassword === valadmin["Pswd"]) {
          this.setState({ logged: true });
          this.props.send("admin");
        } else {
          this.showValidationErrlog("password", "wrong password!");
        }
      });
    } else {
      let values;

      app.child("/Registered").on("value", snapshot => {
        values = snapshot.val();
        console.log("addadadaad", values);
        const array = Object.keys(values);
        console.log(array);
        const val = this.state.loginRfid;
        let result = 0;
        array.map(e => {
          console.log(val);
          if (this.state.loginRfid === e) {
            result = 1;
          }
        });

        console.log(this.state.loginPassword);

        if (result == 1) {
          console.log("rfid correct");
          const pwd = values[this.state.loginRfid]["Pswd"];
          if (this.state.loginPassword == this.decrypt_password(pwd)) {
            console.log("correct");
            this.setState({ logged: true });
            this.props.send(this.state.loginRfid);
          } else {
            window.alert("Wrong password");
            this.showValidationErrlog("password", "wrong password");
          }
        } else {
          window.alert("Not permitted ");
          this.showValidationErrlog("username", "Not a permitted user");
        }
      });
    }
  }

  loginRfidOnChangeHandler(e) {
    this.setState({ loginRfid: e.target.value });
  }

  loginPasswdOnChangeHandler(e) {
    this.setState({ loginPassword: e.target.value });
    console.log(this.state.loginPassword);
  }
  ///////////////////////////////////////////////////

  ////////////////register/////////////////////////
  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [
        ...prevState.errors,
        {
          elm,
          msg
        }
      ]
    }));
  }
  //Remove a specific element from the array
  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ rfid: e.target.value });
    //We want to clear the error when ever the user type something new
    this.clearValidationErr("rfid");
  }

  onConfirmChange(e) {
    this.setState({ confirm: e.target.value });
    this.clearValidationErr("confirm");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    console.log("pswd---------------", this.state.password);
    this.clearValidationErr("password");

    this.setState({ pwdState: "weak" });

    if (e.target.value.length > 12) {
      this.setState({ pwdState: "strong" });
    } /* else if (e.target.value.length > 10) {
      this.setState({ pwdState: "medium" });
    }*/ else if (
      e.target.value.length > 8
    ) {
      this.setState({ pwdState: "medium" });
    }
  }

  submitRegister = e => {
    //Check for all input fields and show errors if empty (you can implement other cases!)

    if (this.state.username == "") {
      this.showValidationErr("username", "Username Cannot be empty!");
      this.setState({ val: 1 });
    }
    if (this.state.confirm == "") {
      this.showValidationErr("confirm", "Confirm password Cannot be empty!");
      this.setState({ val: 1 });
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Password Cannot be empty!");
      this.setState({ val: 1 });
    }

    if (this.state.confirm !== this.state.password) {
      this.showValidationErr("confirm", "Passwords Don't Match");
      this.setState({ val: 1 });
    }

    if (this.state.val === 0) {
      const app = fbConfig.database().ref("Car_Parking/Registered");
      let values;

      app.on("value", snapshot => {
        values = snapshot.val();

        this.array = Object.keys(values);

        this.array.map(e => {
          if (this.state.rfid === e) {
            console.log("yess registered");
            this.setState({
              registered: true,
              isLoginOpen: true,
              isRegisterOpen: false
            });

            var updates = {};
            updates["/Pswd"] = this.encrypt_password(this.state.password);
            app.child(e).update(updates);
          } else {
            this.showValidationErr("username", "Incorrect rfid number");
          }
        });
      });
    }
    this.setState({ val: 0 });
  };

  render() {
    let nameErrD = null,
      addressErrD = null,
      telephoneErrD = null,
      emailErrD = null;
    //Loop and find which ones has the error
    for (let errD of this.state.errorsD) {
      //Assign the validation error message
      if (errD.elm == "name") {
        nameErrD = errD.msg;
      }
      if (errD.elm == "address") {
        addressErrD = errD.msg;
      }
      if (errD.elm == "telephone") {
        telephoneErrD = errD.msg;
      }

      if (errD.elm == "email") {
        emailErrD = errD.msg;
      }
      //No (else if or else) statements cause we need to check for all possible elements
    }
    let usernameErr = null,
      passwordErr = null,
      confirmErr = null;
    //Loop and find which ones has the error
    for (let err of this.state.errors) {
      //Assign the validation error message
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "confirm") {
        confirmErr = err.msg;
      }
      //No (else if or else) statements cause we need to check for all possible elements
    }

    let pwidth = null,
      pcolor = null;
    let pwdWeak = false,
      pwdMedium = false,
      pwdStrong = false;

    //Weak password set onlt the pwdWeak to true, cause render only the first bar
    if (this.state.pwdState === "weak") {
      pwidth = "33%";
      pcolor = "#e74c3c";
    } /* else if (this.state.pwdState === "normal") {
      //Strong, render all the previoud bars
      pwidth = "50%";
      pcolor = "#e8bd31";
    }*/ else if (
      this.state.pwdState === "medium"
    ) {
      //Medium pwd then render the weak and medium bars
      pwidth = "66%";
      pcolor = "#e8bd31";
    } else if (this.state.pwdState === "strong") {
      //Strong, render all the previoud bars
      pwidth = "100%";
      pcolor = "#2ecc71";
    }

    console.log("register", this.state.registered);
    console.log("logged", this.state.logged);
    console.log(usernameErr, passwordErr, confirmErr);

    if (this.state.status == 1) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <div>
        <div>
          <div className="bg">
            <BrowserRouter>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                  <h2>Vehicle Parking</h2>
                </Navbar.Brand>
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
              <Route
                path="/signin"
                render={() =>
                  this.state.logged === true &&
                  this.state.registered === false &&
                  this.state.detailfrom === false ? (
                    // <BrowserRouter>
                    //   <Switch>
                    //     <Route
                    //       path="/admin"
                    //       render={props => <AdminLayout {...props} />}
                    //     />
                    //     <Redirect from="/" to="/admin/dashboard" />
                    //   </Switch>
                    //   </BrowserRouter>
                    this.setState({ status: 1 })
                  ) : this.state.logged === true &&
                    this.state.registered === true ? (
                    // details file//
                    <div className="root-container">
                      <div className="box1">
                        <form>
                          <div className="header">Personal Details</div>
                          <div className="box">
                            <div className="input-group">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                name="name"
                                className="login-input"
                                placeholder="Name"
                                onChange={this.onnameChangeDetail.bind(this)}
                              />
                              <small className="danger-error">
                                {nameErrD ? nameErrD : ""}
                              </small>
                            </div>

                            <div className="input-group">
                              <label htmlFor="address">Address</label>
                              <input
                                type="input"
                                name="address"
                                className="login-input"
                                placeholder="Address"
                                onChange={this.onAddressChangeDetail.bind(this)}
                              />
                              <small className="danger-error">
                                {addressErrD ? addressErrD : ""}
                              </small>
                            </div>

                            <div className="input-group">
                              <label htmlFor="telephone">
                                Telephone Number
                              </label>
                              <input
                                type="input"
                                name="telephone"
                                className="login-input"
                                placeholder="Telephone Number"
                                onChange={this.onTelephoneChangeDetail.bind(
                                  this
                                )}
                              />
                              <small className="danger-error">
                                {telephoneErrD ? telephoneErrD : ""}
                              </small>
                            </div>

                            <div className="input-group">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                name="email"
                                className="login-input"
                                placeholder="Email"
                                onChange={this.onEmailChangeDetail.bind(this)}
                              />
                              <small className="danger-error">
                                {emailErrD ? emailErrD : ""}
                              </small>
                            </div>

                            <button
                              type="button"
                              className="login-btn"
                              onClick={this.submitDetails.bind(this)}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    // <DetailedForm rfid={this.state.loginRfid} />
                    <div className="root-container">
                      <div className="box1">
                        <div className="box-controller">
                          <div
                            className={
                              "controller " +
                              (this.state.isLoginOpen
                                ? "selected-controller"
                                : "")
                            }
                            onClick={this.showLoginBox.bind(this)}
                          >
                            Login
                          </div>

                          <div
                            className={
                              "controller " +
                              (this.state.isRegisterOpen
                                ? "selected-controller"
                                : "")
                            }
                            onClick={this.showRegisterBox.bind(this)}
                          >
                            Register
                          </div>
                        </div>

                        <div className="box=controller">
                          {this.state.isLoginOpen && (
                            <div className="inner-container">
                              <div className="header">Login</div>
                              <div className="box">
                                <div className="input-group">
                                  <label htmlFor="username">
                                    RFID Card Number
                                  </label>
                                  <input
                                    id="loginRfid"
                                    type="text"
                                    name="username"
                                    className="login-input"
                                    placeholder="Username"
                                    onChange={this.loginRfidOnChangeHandler.bind(
                                      this
                                    )}
                                  />
                                </div>

                                <div className="input-group">
                                  <label htmlFor="password">Password</label>
                                  <input
                                    id="loginPassword"
                                    type="password"
                                    name="password"
                                    className="login-input"
                                    placeholder="Password"
                                    onChange={this.loginPasswdOnChangeHandler.bind(
                                      this
                                    )}
                                  />
                                </div>

                                <button
                                  type="button"
                                  className="login-btn"
                                  onClick={this.submitLogin.bind(this)}
                                >
                                  Login
                                </button>
                              </div>
                            </div>
                          )}
                          {this.state.isRegisterOpen && (
                            <div className="inner-container">
                              <div className="header">Register</div>
                              <div className="box">
                                <div className="input-group">
                                  <label htmlFor="username">
                                    RFID Card Number
                                  </label>
                                  <input
                                    type="text"
                                    id="rfid"
                                    name="username"
                                    className="login-input"
                                    placeholder="Username"
                                    onChange={this.onUsernameChange.bind(this)}
                                  />
                                  <small className="danger-error">
                                    {usernameErr ? usernameErr : ""}
                                  </small>
                                </div>
                                <div className="input-group">
                                  <label htmlFor="password">Password</label>
                                  <input
                                    type="password"
                                    name="password"
                                    className="login-input"
                                    placeholder="Password"
                                    onChange={this.onPasswordChange.bind(this)}
                                  />

                                  <small className="danger-error">
                                    {passwordErr ? passwordErr : ""}
                                  </small>

                                  {this.state.password && (
                                    <div
                                      className="progress"
                                      style={{ width: "250px", height: "20px" }}
                                    >
                                      <div
                                        className="progress-bar bg-success "
                                        style={{
                                          width: pwidth,
                                          background: pcolor
                                        }}
                                      >
                                        {this.state.pwdState}
                                      </div>
                                    </div>
                                    // <div className="password-state">
                                    //   <div
                                    //     className={
                                    //       "pwd pwd-weak " +
                                    //       (pwdWeak ? "show" : "")
                                    //     }
                                    //   ></div>
                                    //   <div
                                    //     className={
                                    //       "pwd pwd-medium " +
                                    //       (pwdMedium ? "show" : "")
                                    //     }
                                    //   ></div>
                                    //   <div
                                    //     className={
                                    //       "pwd pwd-strong " +
                                    //       (pwdStrong ? "show" : "")
                                    //     }
                                    //   ></div>
                                    // </div>
                                  )}
                                </div>
                                <div className="input-group">
                                  <label htmlFor="confirm">
                                    Confirm Password
                                  </label>
                                  <input
                                    type="password"
                                    name="confirm"
                                    className="login-input"
                                    placeholder="Confirm Password"
                                    onChange={this.onConfirmChange.bind(this)}
                                  />

                                  <small className="danger-error">
                                    {confirmErr ? confirmErr : ""}
                                  </small>
                                </div>
                                <button
                                  type="button"
                                  className="login-btn"
                                  onClick={this.submitRegister.bind(this)}
                                >
                                  Register
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }
              />
            </BrowserRouter>
          </div>
          <h1 id="about" className="about">
            <br />
            <br />
            About Us
          </h1>
        </div>
      </div>
    );
  }
}

const mapDispachToProps = dispach => {
  return {
    send: e =>
      dispach({
        type: "UPDATE",
        val: e,
        logged: true
      })
  };
};

export default connect(
  null,
  mapDispachToProps
)(Temp);
