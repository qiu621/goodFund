import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col } from 'react-bootstrap';

class ProjectPage extends React.Component {

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
            return <p>Go back to base URL</p>;
        }
        return (
            <Jumbotron>
                <h1>{ this.props.project.project_title }</h1>
                <div>...</div>
                <h1>{ this.props.project.totalRaised }</h1>

                <Form>
                  <Col sm="10">
                  <input
                     type="text"
                     name="amount"
                     placeholder="Amount"
                     onChange={this.handleFormChange}
                  />
                  </Col>
                </Form>
                <Button onClick={this.handleButtonSubmit}>
                    FUND!
                </Button>
            </Jumbotron>
        );
    }
}



export default ProjectPage;
