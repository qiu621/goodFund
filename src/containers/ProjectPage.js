import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import web3 from '../blockchain/web3';
import Nav from '../components/Nav/Nav.js';
import logo from './img/logo512.png';
import love from './img/love.jpeg';
import towels from './img/towels.png'
import ProjectSummary from '../components/ProjectSummary/ProjectSummary.js';
import MileStoneItem1 from '../components/MileStoneItem/milestoneitem1.js';
import MileStoneItem2 from '../components/MileStoneItem/milestoneitem2.js';

const img = {
    width: "55%",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto"
};

const jumboStyle = {
  textAlign: 'center',
  padding: '2rem',
  marginTop: "auto",
  marginBottom: "auto"
};

const listGroupStyle = {
  padding: '2vh'
}


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
        alert(1);
    }

    render() {

        if (!this.props.project) {
            return null;
        }
        let prop = this.props;
        let project = this.props.project;
        let curr = web3.utils.fromWei(project.project_total_raised);
        let goal = web3.utils.fromWei(project.project_goal);
        let percentComplete = curr / goal;
        let daysLeft = project.project_deadline;

        return (
            <React.Fragment>
            <Nav />
            <Jumbotron style={jumboStyle}>
                <h1>{this.props.project.project_title}</h1>
                <p>by {this.props.project.project_creator_name}</p>
                <Container>
                  <Row>
                    <Col sm={8}><img src={towels} alt="True Love" style={img}/></Col>
                    <Col sm={4}>
                      <ProjectSummary projects={prop.projects} project={ prop.project } fundProject={ prop.fundProject } account={ prop.account }/>
                    </Col>
                  </Row>
                  </Container>
            </Jumbotron>

            <Container style={jumboStyle}>
              <Row>
                <Col sm={8} style={{textAlign: "left"}}>
                  <h1>The Story</h1>
                  <p>Project description: While good personal hygiene is well known to reduce risk of infectious disease and improve mental health, access to sanitation facilities and hygiene behaviors among people experiencing homelessness in the United States have received little attention. According to a recent paper published in the International Journal of Environmental Research and Public Health, persons experiencing homelessness in the United States “experience significant barriers to self-care and personal hygiene… including limited access to clean showers.”

                  Our project aims to address this issue, creating single-use and disposable towels that can provide the sanitizing benefits of a warm shower.

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend feugiat tellus, in tincidunt mi tincidunt et. Praesent velit felis, aliquet quis erat iaculis, vulputate pharetra magna. Donec euismod massa ut metus consequat pellentesque. Duis varius metus et orci vehicula auctor. Nunc commodo, purus at ultricies sagittis, risus orci gravida magna, a tempor libero tellus in massa. Vivamus rhoncus aliquet nibh, id sollicitudin nunc ultricies non. Duis aliquam dictum tortor ut lacinia. Sed ultrices luctus ligula in tincidunt. Cras consectetur tempus auctor.

Quisque nunc lorem, condimentum ac tellus vitae, volutpat egestas lectus. In consectetur leo placerat neque dignissim, ac convallis orci mollis. Pellentesque egestas elit nisi, ac hendrerit tortor tincidunt vel. Pellentesque elementum, est ac lobortis viverra, velit quam facilisis libero, a tempus nisi mauris sit amet sem. Nulla lacinia maximus dui et finibus. Maecenas nec nisl sem. Etiam nisl est, luctus eu erat non, laoreet varius ex. Pellentesque in dolor id nulla hendrerit consequat eu in orci. Nulla non dapibus libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam non purus sem. Morbi tincidunt non arcu ac congue. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Sed posuere purus sit amet convallis pharetra. Sed eu lacinia urna. Phasellus id urna lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus sit amet elit eget erat vulputate dignissim. Curabitur ac ex massa. Donec vestibulum vestibulum sapien, luctus finibus nunc efficitur gravida. Nam placerat ornare ultrices. Donec condimentum ante sit amet convallis rutrum. Suspendisse semper efficitur urna, in laoreet nisi bibendum sed. Sed condimentum purus dui, at tempor lacus congue rutrum. Vestibulum quis velit tempor, faucibus nibh eu, elementum quam. Donec eget nibh vel sapien tincidunt tempus nec malesuada augue. Sed pretium eros vitae elementum luctus.</p>
                </Col>
                <Col sm={4}>
                    <MileStoneItem1 />
                    <MileStoneItem2 />

                </Col>
              </Row>
              <Row>

              </Row>

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

            </Container>
            </React.Fragment>

        );
    }
}



export default ProjectPage;
