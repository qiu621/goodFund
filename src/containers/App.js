import React, { Component } from 'react';
import './App.css';
import web3 from '../blockchain/web3';
import Header from '../components/Header/Header';
import ProjectList from '../components/ProjectList/ProjectList';
import NewProject from './NewProject';
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
      [this.state.account] = accounts;
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
          projectInfo.isLoading = false;
          projectInfo.contract = projectInst;
          projectList.push(projectInfo);
          this.setState({ projectData: projectList });
        });
      });
    });
  }

  startProject(newProject, account) {
    newProject.isLoading = true;
    crowdfundInstance.methods.startProject(
<<<<<<< Updated upstream
      this.newProject.title,
      this.newProject.description,
      this.newProject.duration,
      web3.utils.toWei(this.newProject.amountGoal, 'ether')
=======
      newProject.title,
      newProject.description,
      newProject.duration,
      web3.utils.toWei('1', 'ether'),
>>>>>>> Stashed changes
    ).send({
      from: account,
    }).then((res) => {
      const projectInfo = res.events.ProjectStarted.returnValues;
      projectInfo.isLoading = false;
      projectInfo.currentAmount = 0;
      projectInfo.currentState = 0;
      projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
<<<<<<< Updated upstream
      this.startProjectDialog = false;
      this.state.newProject = { isLoading: false };
    });
  }

  fundProject(index) {
    const projectContract = this.projectData[index].contract;
    this.projectData[index].isLoading = true;
    projectContract.methods.pledge().send({
      from: this.state.account,
      value: web3.utils.toWei(this.projectData[index].fundAmount, 'ether'),
    }).then((res) => {
      const newTotal = parseInt(res.events.FundingReceived.returnValues.currentTotal, 10);
      const projectGoal = parseInt(this.projectData[index].goalAmount, 10);
      this.projectData[index].currentAmount = newTotal;
      this.projectData[index].isLoading = false;
      // Set project state to success
      if (newTotal >= projectGoal) {
        this.projectData[index].currentState = 2;
      }
      this.setState({ projectData: this.state.projectData });
=======
>>>>>>> Stashed changes
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
            <NewProject />
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
