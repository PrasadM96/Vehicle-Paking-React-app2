import React, { Component } from "react";
import "./DetailForm.css";

class detailForm extends Component {
  state = { name: "", address: "", telephone: "", email: "", errors: [] };

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

  onnameChange(e) {
    this.setState({ name: e.target.value });
    //We want to clear the error when ever the user type something new
    this.clearValidationErr("name");
  }

  onAddressChange(e) {
    this.setState({ address: e.target.value });
    this.clearValidationErr("address");
  }

  onTelephoneChange(e) {
    this.setState({ telephone: e.target.value });
    this.clearValidationErr("telephone");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  submitRegister(e) {
    //Check for all input fields and show errors if empty (you can implement other cases!)

    //console.log(this.state);
    if (this.state.name == "") {
      this.showValidationErr("name", "Name Cannot be empty!");
    }
    if (this.state.address == "") {
      this.showValidationErr("address", "Address  Cannot be empty!");
    }
    if (this.state.telephone == "") {
      this.showValidationErr("telephone", "Telephone Cannot be empty!");
    }
    if (this.state.email == "") {
      this.showValidationErr("email", "Email Cannot be empty!");
    }
  }

  render() {
    let nameErr = null,
      addressErr = null,
      telephoneErr = null,
      emailErr = null;
    //Loop and find which ones has the error
    for (let err of this.state.errors) {
      //Assign the validation error message
      if (err.elm == "name") {
        nameErr = err.msg;
      }
      if (err.elm == "address") {
        addressErr = err.msg;
      }
      if (err.elm == "telephone") {
        telephoneErr = err.msg;
      }

      if (err.elm == "email") {
        emailErr = err.msg;
      }
      //No (else if or else) statements cause we need to check for all possible elements
    }
    return (
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
                  onChange={this.onnameChange.bind(this)}
                />
                <small className="danger-error">{nameErr ? nameErr : ""}</small>
              </div>

              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  type="input"
                  name="address"
                  className="login-input"
                  placeholder="Address"
                  onChange={this.onAddressChange.bind(this)}
                />
                <small className="danger-error">
                  {addressErr ? addressErr : ""}
                </small>
              </div>

              <div className="input-group">
                <label htmlFor="telephone">Telephone Number</label>
                <input
                  type="input"
                  name="telephone"
                  className="login-input"
                  placeholder="Telephone Number"
                  onChange={this.onTelephoneChange.bind(this)}
                />
                <small className="danger-error">
                  {telephoneErr ? telephoneErr : ""}
                </small>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="login-input"
                  placeholder="Email"
                  onChange={this.onEmailChange.bind(this)}
                />
                <small className="danger-error">
                  {emailErr ? emailErr : ""}
                </small>
              </div>

              <button
                type="button"
                className="login-btn"
                onClick={this.submitRegister.bind(this)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default detailForm;
