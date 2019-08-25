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

import Card from "components/Card/Card.jsx";
//import { thArray, tdArray } from "variables/Variables.jsx";
import firebase from "firebase";
import app1 from "./Config";

class TableList extends Component {
  constructor() {
    super();

    this.state = {
      tag: "13 08 02 21",
      val1: [],
      val2: [],
      acc_bal: 0,
      name: 0,
      Date: 0,
      Hours: 0,
      Minutes: 0,
      Month: 0,
      Year: 0,
      Status: 0,
      ispaid: 0,
      tel: 0,
      length: 0
    };

    this.app = app1.database().ref("Car_Parking/Registered");
  }

  componentDidMount() {
    let values;
    this.app.on("value", snapshot => {
      snapshot.forEach(childsnap => {
        const lock = {
          id: childsnap.key.toString(),
          name: childsnap.val().Name,
          acc_bal: childsnap.val().Acc_bal,
          tel: childsnap.val().Tel
        };
        const lock2 = {
          status: childsnap.child("Park").val().Status,
          ispaid: childsnap.child("Park").val().isPaid
        };

        //console.log(lock2);

        this.setState({
          val1: lock,
          val2: lock2
        });
        //console.log(this.state.val);
      });

      // values = snapshot.val().key.toString();
      // console.log(values);
      // //console.log(Object.values(Object.values(values)));
      // //console.log(Object.keys(values).length);
      // // this.setState({
      // //   val: Object.values(Object.values(values)),
      // //   id: Object.keys(values),
      // //   length: Object.keys(values).length
      // // });
      // console.log(this.state.acc_bal);
    });
  }

  // const tdArray = [
  //   ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
  //   ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
  //   ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
  //   ["4", "Philip Chaney", "$38,735", "Korea, South", "Overland Park"],
  //   ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten"],
  //   ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
  // ];

  render() {
    //console.log(this.state.id);

    const len = this.state.val1.length;
    console.log(len);
    const thArray = ["ID", "Name", "Account Balance", "Status"];

    const tdArray = new Array(len);

    Object.keys(this.state.val1);
    const arr = Object.values(this.state.val1);
    console.log(arr);

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < thArray.length; j++) {
        tdArray[i] = new Array(thArray.length);
        tdArray[i][j] = arr[j];
      }
    }
    console.log(tdArray);

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

            {/* <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
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
            </Col> */}
            <Col md={12}>
              <Card
                title="Personal data"
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
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
