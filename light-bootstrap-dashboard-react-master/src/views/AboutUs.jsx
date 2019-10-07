import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Button, ButtonToolbar } from "react-bootstrap";

class AboutUs extends Component {
  state = {};
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              plain
              content={
                // <ButtonToolbar>
                //   <Button variant="primary">Primary</Button>
                //   <Button variant="secondary">Secondary</Button>
                //   <Button variant="success">Success</Button>
                //   <Button variant="warning">Warning</Button>
                //   <Button variant="danger">Danger</Button>
                //   <Button variant="info">Info</Button>
                //   <Button variant="light">Light</Button>
                //   <Button variant="dark">Dark</Button>
                //   <Button variant="link">Link</Button>
                // </ButtonToolbar>
              }
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AboutUs;
