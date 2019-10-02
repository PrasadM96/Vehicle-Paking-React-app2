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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import "./Dashboard.css";
import app1 from "./Config";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {
    val1: [],
    noofUnregistered: "",
    noofRegistered: "",
    noofslots: "",
    acc_bal: 0,
    labels: "",
    series: ""
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  componentDidMount() {
    console.log(this.props);
    const wordref = app1.database().ref("Car_Parking/Parking_Slots");
    const counting = app1.database().ref("Car_Parking");

    counting.on("value", snapshot => {
      let values = snapshot.val();
      console.log("adad", this.props.rfid);

      if (this.props.admin == false) {
        const acc = values["Registered"][this.props.rfid]["Acc_bal"];
        console.log("Account balance  " + acc);
        this.setState({ acc_bal: acc });
      }

      this.setState({
        noofUnregistered: Object.keys(values["UnRegistered"]).length
      });
      this.setState({
        noofRegistered: Object.keys(values["Registered"]).length
      });

      this.setState({
        labels: [40, 60],
        series: [this.state.noofRegistered, this.state.noofUnregistered]
      });
    });

    var countslots = 0;

    wordref.on("value", snapshot => {
      let val1 = snapshot.val();
      let newState = [];

      for (let val in val1) {
        newState.push({
          id: val,
          slot: val1[val].slot
        });
        if (val1[val].slot == 0) {
          countslots++;
        }
      }
      this.setState({ noofslots: countslots });
      countslots = 0;

      this.setState({
        val1: newState
      });

      console.log(val1);
    });
  }

  render() {
    let status = null;
    console.log("admin ", this.props.admin);
    return this.props.admin ? (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Available Slots"
                statsValue={this.state.noofslots}
                // statsIcon={<i className="fa fa-refresh" />}
                // statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="1,345"
                // statsIcon={<i className="fa fa-calendar-o" />}
                // statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-danger" />}
                statsText="Unregistered Members"
                statsValue={this.state.noofUnregistered}
                // statsIcon={<i className="fa fa-clock-o" />}
                // statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Registered Members"
                statsValue={this.state.noofRegistered}
                // statsIcon={<i className="fa fa-refresh" />}
                // statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category=""
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
                content2={
                  <span class="pull-right">
                    <button type="button" class="btn btn-default">
                      Monthly
                    </button>
                    <button type="button" class="btn btn-default">
                      Weekly
                    </button>
                  </span>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Users' Division"
                // category="Last Campaign Performance"
                // stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                id="availabelSlots"
                title="Available Slots"
                category=""
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  // <div>
                  <div className="text-center">
                    <div className="contain12 ">
                      {this.state.val1.map((val, key) => {
                        if (val.slot == "1") {
                          status = "Booked";
                        } else {
                          status = "Available";
                        }
                        return (
                          <button className="btn1">
                            Slot{key + 1}
                            <br />
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                }

                // content={
                //   <div className="ct-chart">
                //     <ChartistGraph
                //       data={dataBar}
                //       type="Bar"
                //       options={optionsBar}
                //       responsiveOptions={responsiveBar}
                //     />
                //   </div>
                // }
                // legend={
                //   <div className="legend">{this.createLegend(legendBar)}</div>
                // }
              />
            </Col>

            {/* <Col md={6}>
            <Card
              title="Tasks"
              category="Backend development"
              stats="Updated 3 minutes ago"
              statsIcon="fa fa-history"
              content={
                <div className="table-full-width">
                  <table className="table">
                    <Tasks />
                  </table>
                </div>
              }
            />
          </Col> */}
          </Row>
        </Grid>
      </div>
    ) : (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Available Slots"
                statsValue={this.state.noofslots}
                // statsIcon={<i className="fa fa-refresh" />}
                // statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Account Balance"
                statsValue={this.state.acc_bal}
                // statsIcon={<i className="fa fa-calendar-o" />}
                // statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-danger" />}
                statsText="Unregistered Members"
                statsValue={this.state.noofUnregistered}
                // statsIcon={<i className="fa fa-clock-o" />}
                // statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Registered Members"
                statsValue={this.state.noofRegistered}
                // statsIcon={<i className="fa fa-refresh" />}
                // statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="avilableslots"
                title="Available Parking Slots"
                category="Real time updating"
                content={
                  <div className="text-center">
                    <div className="contain12 ">
                      {this.state.val1.map((val, key) => {
                        if (val.slot == "1") {
                          status = "Booked";
                        } else {
                          status = "Available";
                        }
                        return (
                          <button className="btn1">
                            Slot{key + 1}
                            <br />
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="availabelSlots"
                title="Parking Fee"
                category=""
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Details and Restrictions"
                category=""
                // stats="Updated 3 minutes ago"
                // statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
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

const mapStateToProps = state => {
  console.log("dash", state.loggedRfid);
  return {
    admin: state.admin,
    rfid: state.loggedRfid
  };
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
