/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import "bootstrap/dist/css/bootstrap.min.css";
import Icons from "views/Icons.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { connect } from "react-redux";
import avatar from "assets/img/faces/face-3.jpg";
import fbConfig from "./Config";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 100,
      values: []
    };
  }

  componentDidMount = () => {
    let app = fbConfig.database().ref("Car_Parking");
    let values;
    let child = "Registered/" + this.props.rfid;
    if (this.props.rfid) {
      child = "admin";
    }
    app.child(child).on("value", snapshot => {
      values = snapshot.val();
    });

    this.setState({
      values: values
    });
  };

  amountHandler = e => {
    this.setState({
      [e.target.id]: e.target.value * 100
    });
    console.log(this.state.amount);
  };

  async onToken(token) {
    let amount = 500 * 100;

    const response = await axios.post(
      "https://ceylon-life.firebaseapp.com/checkout",
      {
        token,
        amount
      }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  render() {
    // console.log("user--------------", this.state.values);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        // {
                        //   label: "Company (disabled)",
                        //   type: "text",
                        //   bsClass: "form-control",
                        //   placeholder: "Company",
                        //   defaultValue: "Creative Code Inc.",
                        //   disabled: true
                        // },
                        {
                          label: "Username ",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: this.props.rfid,
                          disabled: true
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.values["Email"]
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: this.state.values["Name"]
                        },
                        {
                          label: "Telephone Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Tel",
                          defaultValue: this.state.values["Tel"]
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Adress",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue:
                            "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                        }
                      ]}
                    />
                    {/* <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue: "Andrew"
                        },
                        {
                          label: "Postal Code",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "ZIP Code"
                        }
                      ]}
                    /> */}

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={this.state.values["Name"]}
                userName={this.props.rfid}
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                // socials={
                //   <div>
                //     <Button simple>
                //       <i className="fa fa-facebook-square" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-twitter" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-google-plus-square" />
                //     </Button>
                //   </div>
                // }
              />
              {this.props.admin ? (
                <div />
              ) : (
                <Card
                  title="Payment"
                  content={
                    <div>
                      <h5>Make your payment here</h5>
                      <input
                        id="amount"
                        type="text"
                        placeholder="Amount"
                        onChange={this.amountHandler}
                      />
                      <br />
                      <br />

                      <StripeCheckout
                        amount={this.state.amount}
                        token={this.onToken}
                        stripeKey="pk_test_JUiqa63RymMAqKT2FzqX4BAG00CGgljYEu"
                      />
                    </div>
                  }
                />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("addadada", state.admin);
  return {
    admin: state.admin,
    rfid: state.loggedRfid
  };
};

export default connect(
  mapStateToProps,
  null
)(UserProfile);
