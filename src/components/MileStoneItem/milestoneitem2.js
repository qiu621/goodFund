import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';


const v1 = {
  borderLeft: "1px solid",
  height: "20vh",
  marginLeft: "3vh"
};

class MileStoneItem2 extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          amount: 0
      };

  }

  render() {
    return (
      <React.Fragment>
        <Row style={{textAlign: "left"}}>
          <Col sm={3}>
          <span style={{fontSize: "20px"}}>10th</span><span style={{fontSize: "12px"}}> February</span>
          </Col>
          <Col sm={9}>
            <h3>Second Milestone</h3>
            <p>With milestone two, due two years from now, we aim to partner with at least 20 homeless shelters around the California in order to provide our towels. By 2025, we hope that the EZ Towel will become a ubiquitous sight in shelters.
            </p>
            <h5>60% of funds to be released</h5>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

}

export default MileStoneItem2;
