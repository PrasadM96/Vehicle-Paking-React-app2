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
import { Grid, Row, Col } from "react-bootstrap";
import fbConfig from "./Config";
import firebase from "firebase";
import { toast } from "react-toastify";

import Card from "components/Card/Card.jsx";

class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };

    this.app = fbConfig.database();
  }

  onChangeHandle = e => {
    this.setState({ id: e.target.value });
    console.log(this.state.id);
  };

  submitHandle = () => {
    this.app
      .ref("Car_Parking/Registered")
      .child(this.state.id)
      .push({
        Acc_bal: "0",
        Name: "default",
        Park: {
          Park_Time: {
            Date: 0,
            Hour: 0,
            Minutes: 0,
            Month: 0,
            Year: 0
          },
          Status: 1,
          isPaid: 0
        },
        Tel: 0
      })
      .then(window.alert("Success! ", { type: "success" }));
    console.log("success");
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Light Bootstrap Table Heading"
                category="Created using Roboto Font Family"
                content={
                  <div>
                    <form>
                      <div className="header">Personal Details</div>
                      <div className="box">
                        <div className="input-group">
                          <label htmlFor="name">Name</label>
                          <input
                            id="id"
                            type="text"
                            name="name"
                            className="login-input"
                            placeholder="Name"
                            onChange={this.onChangeHandle}
                          />
                        </div>

                        <button
                          type="button"
                          className="login-btn"
                          onClick={this.submitHandle}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
