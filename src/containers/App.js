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
    crowdfundInstance.methods.returnAllProjects().call().then((projects) => {
      projects.forEach((projectAddress) => {
        const projectInst = crowdfundProject(projectAddress);
        projectInst.methods.getDetails().call().then((projectData) => {
          const projectInfo = projectData;
          projectInfo.isLoading = false;
          projectInfo.contract = projectInst;
          this.state.projectData.push(projectInfo);
          this.setState({ projectData: this.state.projectData });
        });
      });
    });
  }

  startProject() {
    this.state.newProject.isLoading = true;
    crowdfundInstance.methods.startProject(
      'PROJECT ZOU',
      'CREATE SUPER HUMAN',
      '52',
      web3.utils.toWei('1', 'ether'),
    ).send({
      from: this.state.account,
    }).then((res) => {
      const projectInfo = res.events.ProjectStarted.returnValues;
      projectInfo.isLoading = false;
      projectInfo.currentAmount = 0;
      projectInfo.currentState = 0;
      projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
      this.startProjectDialog = false;
      this.state.newProject = { isLoading: false };
      console.log('orgasm')
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
