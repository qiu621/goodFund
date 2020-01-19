import React, { Component } from 'react';
import './App.css';
import web3 from '../blockchain/web3';
import Header from '../components/Header/Header';
import ProjectList from '../components/ProjectList/ProjectList';
import ProjectForm from './ProjectForm';
import ProjectPage from './ProjectPage';
import { Container, Button, Row, Col } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import crowdfundInstance from '../blockchain/crowdfundInstance';
import crowdfundProject from '../blockchain/crowdfundProjectInstance';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      account: null,
      projectData: [],
      newProject: { isLoading: false },
    };

  }

  componentDidMount() {
    web3.eth.getAccounts().then((accounts) => {
      this.setState({ account: accounts[0] });
      this.getProjects();
    });
  }

  getProjects() {
    let projectList = [];
    crowdfundInstance.methods.returnAllProjects().call().then((projects) => {
      projects.forEach((projectAddress) => {
        const projectInst = crowdfundProject(projectAddress);
        projectInst.methods.getDetails().call().then((projectData) => {
          const projectInfo = projectData;
          projectInfo.contract = projectInst;
          projectList.push(projectInfo);
          this.setState({ projectData: projectList });
        });
      });
    });
  }

  startProject(newProject, account) {
    crowdfundInstance.methods.startProject(
      newProject.project_title,
      newProject.project_description,
      newProject.project_deadline,
      web3.utils.toWei(newProject.project_goal, 'ether')
    ).send({
      from: account,
    }).then((res) => {
      const projectInfo = res.events.ProjectStarted.returnValues;
      projectInfo.currentAmount = 0;
      projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
    });
  }

  fundProject(projects, project, amount, account) {
    const projectContract = project.contract;
    projectContract.methods.pledge().send({
      from: account,
      value: web3.utils.toWei(amount, 'ether'),
    }).then((res) => {
      const newTotal = parseInt(res.events.newPledge.returnValues.total_raised, 10);
      project.totalRaised = newTotal;
      projects[project.project_ID] = project;
      this.setState({ projectData: projects });
    });
  }

  getRefund(index) {
    this.projectData[index].contract.methods.getRefund().send({
      from: this.account,
    });
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
          <div className="App">
            <Container>
              <Header />
              <ProjectList projects={this.state.projectData} />
            </Container>
          </div>
          </Route>
          <Route path="/new">
            <ProjectForm startProject={this.startProject} account={this.state.account}/>
          </Route>
          <Route path="/project/:id">
            <ProjectPost projects={this.state.projectData} fundProject={this.fundProject} account={this.state.account} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function ProjectPost( projectParam ) {
  let { id } = useParams();
  let project = null;
  projectParam.projects.forEach((proj) => {
    if (proj.project_ID === id) {
      project = proj;
    }
  });
  return <ProjectPage projects={projectParam.projects} project={ project } fundProject={ projectParam.fundProject } account={ projectParam.account } />;
}


export default App;
