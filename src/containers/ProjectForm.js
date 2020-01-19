import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col } from 'react-bootstrap';
import NavBar from '../components/Nav/Nav.js';

class ProjectForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        project_creator: 'EagleRegal',
        project_title: 'HappyBird',
        project_description: 'Fly away, fly away',
        project_deadline: 'Right now',
        project_goal: '$0.001'
      };
      this.startProject = props.startProject;

      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
    }

    handleFormChange(event) {
      const target = event.target; // i.e. the whole <input type="text" name="Describe your project" placeholder="" onChange={this.handleFormChange} />
      const name = target.name;
      const value = target.value;
      this.setState({
        [name] : value
      });
    }

    handleButtonSubmit(event) {
      event.preventDefault();
      this.startProject(this.state, this.props.account);
    }

    render() {
      return (
        <React.Fragment>
          <NavBar />
          <Container style={{marginTop: "7vh"}}>
            <Row>
              <h1>Welcome to GoodFund</h1>
            </Row>

            <Form>
            <Form.Group as={Row} controlId="project_creator">
              <Form.Label column sm="3">
                Your Name (First & Last)
              </Form.Label>
              <Col sm="11">
              <input
                 type="text"
                 name="project_creator"
                 placeholder=""
                 onChange={this.handleFormChange}
              />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="project_title">
            <Form.Label column sm="2">
              Project Name
            </Form.Label>
            <Col sm="11">
            <input
               type="text"
               name="project_title"
               placeholder=""
               onChange={this.handleFormChange}
            />
            </Col>
          </Form.Group>


          <Form.Group as={Row} controlId="project_description">
            <Form.Label column sm="5">
              Project Description
            </Form.Label>
            <Col sm="11">
            <input
               type="text"
               name="project_description"
               placeholder=""
               onChange={this.handleFormChange}
            />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="project_goal">
            <Form.Label column sm="2">
              Target Funding Total
            </Form.Label>
            <Col sm="11">
            <input
               type="text"
               name="project_goal"
               placeholder=""
               onChange={this.handleFormChange}
            />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="project_deadline">
            <Form.Label column sm="2">
              Project Milestone 1
            </Form.Label>
            <Col sm="11">
            <input
               type="text"
               name="project_deadline"
               placeholder=""
               onChange={this.handleFormChange}
            />
          </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="project_deadline">
            <Form.Label column sm="2">
              Project Milestone 2
            </Form.Label>
            <Col sm="11">
            <input
               type="text"
               name="project_deadline"
               placeholder=""
               onChange={this.handleFormChange}
            />
          </Col>
          </Form.Group>

        </Form>

        <Button onClick={this.handleButtonSubmit}>
          CREATE MY PROJECT
        </Button>

        </Container>


        </React.Fragment>
      );
    }
}

export default ProjectForm;
