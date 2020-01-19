import React, { Component } from 'react';
import './App.css';
import web3 from '../blockchain/web3';
import Header from '../components/Header/Header';
import ProjectList from '../components/ProjectList/ProjectList';
import ProjectForm from './ProjectForm';
import ProjectPage from './ProjectPage';
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
      // this.startProject();
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

  fundProject(index, amount) {
    const projectContract = this.state.projectData[index].contract;
    projectContract.methods.pledge(amount).send({
      from: this.state.account,
      value: web3.utils.toWei(amount, 'ether'),
    }).then((res) => {
      const newTotal = parseInt(res.events.newPledge.returnValues.total_raised, 10);
      const projectGoal = parseInt(this.state.projectData[index].goal, 10);
      this.state.projectData[index].currentAmount = newTotal;
      // if (newTotal >= projectGoal) {
      //   this.state.projectData[index].currentState = 2;
      // }
      this.forceUpdate()
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
            <header className="App-header">
              <Header />
              <ProjectList projects={this.state.projectData} />
            </header>
          </div>
          </Route>
          <Route path="/new">
            <ProjectForm startProject={this.startProject} account={this.state.account}/>
          </Route>
          <Route path="/:title">
            <ProjectPost />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function ProjectPost() {
  let { title } = useParams();
  return (
    <ProjectPage />
  );
}


export default App;
