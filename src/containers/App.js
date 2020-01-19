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
  useParams,
  Link
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
      web3.utils.toWei(newProject.project_goal, 'ether'),
      newProject.project_creator,
      newProject.project_m1,
      newProject.project_m2
    ).send({
      from: account,
    }).then((res) => {
      // const projectInfo = res.events.ProjectStarted.returnValues;
      // projectInfo.project_total_raised = 0;
      // projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
    });
  }

  fundProject(projects, project, amount, account) {
    const projectContract = project.contract;
    projectContract.methods.pledge().send({
      from: account,
      value: web3.utils.toWei(amount, 'ether'),
    }).then((res) => {
      const newTotal = parseInt(res.events.newPledge.returnValues.total_raised, 10);
      project.project_total_raised = newTotal;
      projects[project.project_ID] = project;
    });
  }

  getRefund(index) {
    this.projectData[index].contract.methods.getRefund().send({
      from: this.account,
    });
  }

  vote(project, ballot, account) {
    project.contract.methods.vote().send({
      from: account,
      value: ballot
    }).then((res) => {
      console.log(res);
    })
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
          <div className="App">
          <Header />
              <Container style={{marginTop: "5vh"}}>
              <h2 style={{marginBottom: "5vh"}}>Featured Good Projects</h2>
              <ProjectList projects={this.state.projectData} />
              </Container>
          </div>
          </Route>
          <Route path="/new">
            <ProjectForm startProject={this.startProject} account={this.state.account}/>
          </Route>
          <Route path="/project/:id">
            <ProjectPost projects={this.state.projectData} vote={this.vote} fundProject={this.fundProject} account={this.state.account} />
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
  return <ProjectPage projects={projectParam.projects} project={ project } vote={ projectParam.vote } fundProject={ projectParam.fundProject } account={ projectParam.account } />;
}


export default App;
