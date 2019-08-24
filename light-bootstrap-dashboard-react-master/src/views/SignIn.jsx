import React, { Component } from "react";
import "./SignUp.css";
import fbConfig from "./Config";

class signUp extends Component {
  state = {
    isLoginOpen: true,
    isRegisterOpen: false,
    registered: false,
    val: 0
  };

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    return (
      <div className="root-container">
        <div className="box1">
          <div className="box-controller">
            <div
              className={
                "controller " +
                (this.state.isLoginOpen ? "selected-controller" : "")
              }
              onClick={this.showLoginBox.bind(this)}
            >
              Login
            </div>

            <div
              className={
                "controller " +
                (this.state.isRegisterOpen ? "selected-controller" : "")
              }
              onClick={this.showRegisterBox.bind(this)}
            >
              Register
            </div>
          </div>

          <div className="box=controller">
            {this.state.isLoginOpen && <LoginBox />}
            {this.state.isRegisterOpen && <RegisterBox />}
          </div>
        </div>
      </div>
    );
  }
}

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  submitLogin(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">RFID Card Number</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
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
    );
  }
}

class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rfid: "",
      confirm: "",
      password: "",
      errors: [],
      val: 0,
      pwdState: null
    };
  }

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
    this.clearValidationErr("password");

    this.setState({ pwdState: "weak" });
    if (e.target.value.length > 8) {
      this.setState({ pwdState: "medium" });
    } else if (e.target.value.length > 12) {
      this.setState({ pwdState: "strong" });
    }
  }

  submitRegister = e => {
    //Check for all input fields and show errors if empty (you can implement other cases!)

    console.log("submit");
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
      let array;
      app.on("value", snapshot => {
        values = snapshot.val();

        console.log(Object.keys(values));

        this.setState({ registered: true });
      });

      if (this.state.rfid === "42 15 20 20") {
        this.setState({ val: 0 });
      }
    }

    this.setState({ val: 0 });
  };

  render() {
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

    let pwdWeak = false,
      pwdMedium = false,
      pwdStrong = false;
    //Weak password set onlt the pwdWeak to true, cause render only the first bar
    if (this.state.pwdState == "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState == "medium") {
      //Medium pwd then render the weak and medium bars
      pwdWeak = true;
      pwdMedium = true;
    } else if (this.state.pwdState == "strong") {
      //Strong, render all the previoud bars
      pwdWeak = true;
      pwdMedium = true;
      pwdStrong = true;
    }

    console.log(usernameErr, passwordErr, confirmErr);
    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">RFID Card Number</label>
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
              <div className="password-state">
                <div
                  className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}
                ></div>
                <div
                  className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}
                ></div>
                <div
                  className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}
                ></div>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="confirm">Confirm Password</label>
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
    );
  }
}

export default signUp;
