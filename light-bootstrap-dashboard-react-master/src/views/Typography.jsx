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
      id: null,
      parking_id: null,
      arr: [],
      delarr: []
    };

    this.app = fbConfig.database();
  }

  onChangeHandle = e => {
    this.setState({ id: e.target.value });
    console.log(this.state.id);
    console.log(this.state.parking_id);
  };

  handleDelete = e => {
    //get a copy
    var content = this.app.ref("Car_Parking");
    var values;
    content.child("Registered/" + e).on("value", snapshot => {
      values = snapshot.val();
    });

    //set it to deleted
    content
      .child("Deleted")
      .child(e)
      .set({
        Acc_bal: values["Acc_bal"],
        Email: values["Email"],
        Name: values["Name"],
        Park: {
          Park_Time: {
            Date: values["Park"]["Park_Time"]["Date"],
            Hour: values["Park"]["Park_Time"]["Hour"],
            Minutes: values["Park"]["Park_Time"]["Minutes"],
            Month: values["Park"]["Park_Time"]["Month"],
            Year: values["Park"]["Park_Time"]["Year"]
          },
          Status: values["Park"]["Status"],
          isPaid: values["Park"]["isPaid"]
        },
        Pswd: values["Pswd"],
        Tel: values["Tel"]
      });

    //remove
    content
      .child("Registered")
      .child(e)
      .remove();
  };

  handleUndo = e => {
    var content = this.app.ref("Car_Parking");
    var values;
    content.child("Deleted/" + e).on("value", snapshot => {
      values = snapshot.val();
    });
    content
      .child("Registered")
      .child(e)
      .set({
        Acc_bal: values["Acc_bal"],
        Email: values["Email"],
        Name: values["Name"],
        Park: {
          Park_Time: {
            Date: values["Park"]["Park_Time"]["Date"],
            Hour: values["Park"]["Park_Time"]["Hour"],
            Minutes: values["Park"]["Park_Time"]["Minutes"],
            Month: values["Park"]["Park_Time"]["Month"],
            Year: values["Park"]["Park_Time"]["Year"]
          },
          Status: values["Park"]["Status"],
          isPaid: values["Park"]["isPaid"]
        },
        Pswd: values["Pswd"],
        Tel: values["Tel"]
      });

    //remove
    content
      .child("Deleted")
      .child(e)
      .remove();
  };

  handlePermantDelete = e => {
    var content = this.app.ref("Car_Parking");
    content
      .child("Deleted")
      .child(e)
      .remove();
  };

  submitHandle = () => {
    if (this.state.id == null) {
      window.alert("Rfid field can not be empty");
    } else {
      this.app
        .ref("Car_Parking/Registered")
        .child(this.state.id)
        .set({
          Acc_bal: "0",
          Email: "null",
          Name: "permitted",
          Park: {
            Park_Time: {
              Date: 0,
              Hour: 0,
              Minutes: 0,
              Month: 0,
              Year: 0
            },
            Status: 0,
            isPaid: 0
          },
          Pswd: 0,
          Tel: 0
        })
        .then(window.alert("Success! ", { type: "success" }));
      console.log("success");
    }
  };

  componentDidMount = () => {
    this.app.ref("Car_Parking/Registered").on("value", snapshot => {
      var values;
      values = snapshot.val();
      console.log(values);
      let array = [];
      array = Object.keys(values);
      console.log("array ", array);
      this.setState({ arr: array });
    });

    this.app.ref("Car_Parking/Deleted").on("value", snapshot => {
      var values;
      values = snapshot.val();
      if (values) {
        console.log(values);
        let array;
        array = Object.keys(values);
        this.setState({ delarr: array });
      } else {
        this.setState({ delarr: [] });
      }
    });
  };

  render() {
    console.log("Array ", this.state.arr);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Add User"
                category=""
                content={
                  <div>
                    <form>
                      <div className="box">
                        <div className="input-group">
                          <label htmlFor="Rfid Tag">Parking</label>
                          <input
                            id="parking_id"
                            type="text"
                            name="Rfid Card Number"
                            className="login-input"
                            placeholder="Parking No"
                            onChange={this.onChangeHandle}
                          />
                          <label htmlFor="Rfid Tag">RFID</label>
                          <input
                            id="id"
                            type="text"
                            name="Rfid Card Number"
                            className="login-input"
                            placeholder="Rfid"
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
          <Row>
            <Col md={12}>
              <Card
                title="Delete Users"
                category=""
                content={
                  <div>
                    <table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Registered Users</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.arr.map((e, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{e}</td>

                              <td>
                                <button
                                  type="button"
                                  className="btn btn-warning btn-sm"
                                  onClick={this.handleDelete.bind(this, e)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Undo Users"
                category=""
                content={
                  <div>
                    <table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Deleted Users</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.delarr.map((e, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{e}</td>

                              <td>
                                <span>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={this.handleUndo.bind(this, e)}
                                  >
                                    Undo
                                  </button>
                                  &nbsp;
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={this.handlePermantDelete.bind(
                                      this,
                                      e
                                    )}
                                  >
                                    Delete
                                  </button>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
