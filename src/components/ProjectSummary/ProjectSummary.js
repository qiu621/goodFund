import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import web3 from '../../blockchain/web3';

const listGroupStyle = {
  padding: '2vh'
}

class ProjectSummary extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          amount: 0
      };

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
      this.props.fundProject(this.props.projects, this.props.project, this.state.amount, this.props.account);
  }


  render() {
    if (!this.props.project) {
        return null;
    }
    let project = this.props.project;
    let curr = web3.utils.fromWei(project.project_total_raised);
    let goal = web3.utils.fromWei(project.project_goal);
    let daysLeft = project.project_deadline;

    return (
      <React.Fragment>
      <ProgressBar now={curr / goal * 100} />
      <ListGroup variant="flush">
        <ListGroup.Item style={listGroupStyle}>
          <span style={{fontSize: "20px"}}>{curr} eth</span><span style={{fontSize: "10px", textAlign: 'marginBottom'}}> of {goal} eth goal</span>
        </ListGroup.Item>
        <ListGroup.Item style={listGroupStyle}>
          <span style={{fontSize: "20px"}}>{daysLeft}</span><span style={{fontSize: "10px", textAlign: 'marginBottom'}}> days left</span>
        </ListGroup.Item>
        <ListGroup.Item style={listGroupStyle}>
          <span style={{fontSize: "20px"}}>89</span><span style={{fontSize: "10px"}}> backers</span>
        </ListGroup.Item>

        <Form>
          <Col sm="12">
            <input
               type="text"
               name="amount"
               placeholder="Amount"
               onChange={this.handleFormChange}
            />
          </Col>
          <div>==</div>
        </Form>
        <Button onClick={this.handleButtonSubmit}>
          Fund {project.project_title}
        </Button>

      </ListGroup>
      </React.Fragment>


    )
  }
}

export default ProjectSummary;
