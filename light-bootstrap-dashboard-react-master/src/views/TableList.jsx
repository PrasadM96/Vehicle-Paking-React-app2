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
import { Grid, Row, Col, Table } from "react-bootstrap";
import "./TableList.css";

import Card from "components/Card/Card.jsx";
//import { thArray, tdArray } from "variables/Variables.jsx";
import firebase from "firebase";
import app1 from "./Config";

class TableList extends Component {
  constructor() {
    super();

    this.state = {
      val1: []
    };
  }
  componentDidMount() {
    const wordref = app1.database().ref("Car_Parking/Registered");
    wordref.on("value", snapshot => {
      let val1 = snapshot.val();
      let newState = [];

      for (let val in val1) {
        newState.push({
          id: val,
          name: val1[val].Name,
          acc_bal: val1[val].Acc_bal,
          telephone: val1[val].Tel,
          status: val1[val]["Park"].Status,
          isPaid: val1[val]["Park"].isPaid,
          date: val1[val]["Park"]["Park_Time"].Date,
          hour: val1[val]["Park"]["Park_Time"].Hour,
          minutes: val1[val]["Park"]["Park_Time"].Minutes,
          month: val1[val]["Park"]["Park_Time"].Month,
          year: val1[val]["Park"]["Park_Time"].Year
        });
      }

      this.setState({
        val1: newState
      });
    });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Customer details"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <div>
                      <table class="table table-stripe">
                        <tr>
                          <th>
                            <font color="black">RFID Number</font>
                          </th>
                          <th>
                            <font color="black">Name</font>
                          </th>

                          <th>
                            <font cplor="black"> Status</font>
                          </th>
                        </tr>

                        <tbody>
                          {this.state.val1.map(val => {
                            return (
                              <tr>
                                <td>{val.id}</td>
                                <td>{val.name}</td>

                                <td>{val.status}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                plain
                title="Customer Personal Details"
                category="Personal detailsof registered customers"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <div>
                      <table class="table table-stripe">
                        <tr>
                          <th>
                            <font color="black">RFID Number</font>
                          </th>
                          <th>
                            <font color="black">Name</font>
                          </th>
                          <th>
                            <font cplor="black">Account Balance</font>
                          </th>
                          <th>
                            <font cplor="black">Telephone Number</font>
                          </th>
                        </tr>

                        <tbody>
                          {this.state.val1.map(val => {
                            return (
                              <tr>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.acc_bal}</td>
                                <td>{val.telephone}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                title="Parking Details"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <div>
                      <table class="table table-stripe">
                        <tr>
                          <th>
                            <font color="black">RFID Number</font>
                          </th>
                          <th>
                            <font color="black">Name</font>
                          </th>
                          <th>
                            <font cplor="black">Parking Date</font>
                          </th>
                          <th>
                            <font cplor="black">Parking Time</font>
                          </th>
                        </tr>

                        <tbody>
                          {this.state.val1.map(val => {
                            return (
                              <tr>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>
                                  {val.date} / {val.month} / {val.year}
                                </td>
                                <td>
                                  {val.hour} : {val.minutes}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              />
            </Col>

            {/*Col md={12}>
              <Card
                title="Revenue"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                title="Unregistered users"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
              </Col>*/}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
