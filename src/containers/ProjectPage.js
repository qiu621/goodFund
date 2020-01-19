import React from 'react';
import { Container, Button, Jumbotron, Form, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import web3 from '../blockchain/web3';
import Nav from '../components/Nav/Nav.js';
import logo from './img/logo512.png';
import love from './img/love.jpeg';
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
                    <Col sm={8}><img src={logo} alt="True Love" style={img}/></Col>
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

                    I am happy to join with you today in what will go down in history as the greatest demonstration for freedom in the history of our nation.

                      Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of their captivity.

                      But one hundred years later, the Negro still is not free. One hundred years later, the life of the Negro is still sadly crippled by the manacles of segregation and the chains of discrimination. One hundred years later, the Negro lives on a lonely island of poverty in the midst of a vast ocean of material prosperity. One hundred years later, the Negro is still languished in the corners of American society and finds himself an exile in his own land. And so we've come here today to dramatize a shameful condition.

                      In a sense we've come to our nation's capital to cash a check. When the architects of our republic wrote the magnificent words of the Constitution and the Declaration of Independence, they were signing a promissory note to which every American was to fall heir. This note was a promise that all men, yes, black men as well as white men, would be guaranteed the "unalienable Rights" of "Life, Liberty and the pursuit of Happiness." It is obvious today that America has defaulted on this promissory note, insofar as her citizens of color are concerned. Instead of honoring this sacred obligation, America has given the Negro people a bad check, a check which has come back marked "insufficient funds."

                      But we refuse to believe that the bank of justice is bankrupt. We refuse to believe that there are insufficient funds in the great vaults of opportunity of this nation. And so, we've come to cash this check, a check that will give us upon demand the riches of freedom and the security of justice.

                      We have also come to this hallowed spot to remind America of the fierce urgency of Now. This is no time to engage in the luxury of cooling off or to take the tranquilizing drug of gradualism. Now is the time to make real the promises of democracy. Now is the time to rise from the dark and desolate valley of segregation to the sunlit path of racial justice. Now is the time to lift our nation from the quicksands of racial injustice to the solid rock of brotherhood. Now is the time to make justice a reality for all of God's children.

                      It would be fatal for the nation to overlook the urgency of the moment. This sweltering summer of the Negro's legitimate discontent will not pass until there is an invigorating autumn of freedom and equality. Nineteen sixty-three is not an end, but a beginning. And those who hope that the Negro needed to blow off steam and will now be content will have a rude awakening if the nation returns to business as usual. And there will be neither rest nor tranquility in America until the Negro is granted his citizenship rights. The whirlwinds of revolt will continue to shake the foundations of our nation until the bright day of justice emerges.
                    </p>
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
