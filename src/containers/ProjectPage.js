import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import web3 from '../blockchain/web3';
import Nav from '../components/Nav/Nav.js';
import logo from './img/logo512.png';

const img = {
    width: "60%",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto"
};

const jumboStyle = {
  textAlign: 'center',
  padding: '1rem'
};

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
            return null;
        }
        return (
            <React.Fragment>
            <Nav />

            <Jumbotron style={jumboStyle}>
                <h1>{this.props.project.project_title}</h1>
                <p>by {this.props.project.project_creator_name}</p>
                <Container>
                  <Row>
                    <Col sm={8}><img src={logo} alt="Card image cap" style={img}/></Col>
                    <Col sm={4}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                  </Container>
                <h1>{ "TOTAL RAISED " + web3.utils.fromWei(this.props.project.project_total_raised) + " ETH" }</h1>
                <ProgressBar now={this.props.project.project_total_raised / this.props.project.project} />
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
            </React.Fragment>

        );
    }
}



export default ProjectPage;
