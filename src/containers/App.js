import React, { Component } from 'react';
import './App.css';
import web3 from '../blockchain/web3';
import Header from '../components/Header/Header';
import ProjectList from '../components/ProjectList/ProjectList';
import NavBar from './Nav/Nav.js'
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
      <div className="App">
        <header className="App-header">
          <Header />
          <Link to="/new"><div>NEW PROJECT</div></Link>
          <div>...</div>
          <ProjectList projects={this.state.projectData} />
        </header>
      </div>
    );
  }
}

export default App;
