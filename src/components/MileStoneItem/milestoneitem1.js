import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';


const v1 = {
  borderLeft: "1px solid",
  height: "20vh",
  marginLeft: "2.5vh"
};

class MileStoneItem1 extends React.Component {

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
          <span style={{fontSize: "20px"}}>31st</span><span style={{fontSize: "12px"}}> January</span>
          <div style={v1}></div>
          </Col>
          <Col sm={9}>
            <h3>First Milestone</h3>
            <p>Though milestone one, due a year from now, we promise to have 3000 of our towels manufactured and ready to go.
            </p>
            <h5>40% of funds to be released</h5>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

}

export default MileStoneItem1;
