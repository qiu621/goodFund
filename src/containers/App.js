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


class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      account: null,
      projectData: [],
      newProject: { isLoading: false },
    };

  }

  componentWillMount() {
    web3.eth.getAccounts().then((accounts) => {
      [this.state.account] = accounts;
      this.getProjects();
    });
  }

  getProjects() {
    
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
