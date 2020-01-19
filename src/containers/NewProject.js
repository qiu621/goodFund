import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
    Link
  } from "react-router-dom";
import { Container, Button, Jumbotron } from 'react-bootstrap';

class NewProject extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      let value = event.target.value;
      console.log("EVENT");
      console.log(event);
      this.setState({ title: value });
    }
    handleSubmit(event) {
      event.preventDefault();

      console.log(event);
      this.props.onSubmit(this.state.title);
    }
    render() {
      return (
        <React.Fragment>
          <Jumbotron>The Good Fund</Jumbotron>
          <Container>
            <Form>
            <Form.Group as={Row} controlId="Project Name">
            <Form.Label column sm="2">
              Project Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="Project Name" placeholder="Project Name"/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="Project Description">
            <Form.Label column sm="2">
              Project Description
            </Form.Label>
            <Col sm="10">
              <Form.Control type="Project Description" placeholder="Project Description" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="Target Funding Total">
            <Form.Label column sm="2">
              Target Funding Total
            </Form.Label>
            <Col sm="10">
              <Form.Control type="Target Funding Total" placeholder="Target Funding Total"/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="Project Timeline">
            <Form.Label column sm="2">
              Project Timeline
            </Form.Label>
            <Col sm="10">
              <Form.Control type="Project Timeline" placeholder="Project Timeline" />
            </Col>
          </Form.Group>

        </Form>

        <Button>Create my Project</Button>

        </Container>
            

        </React.Fragment>
      );
    }
}

export default NewProject;