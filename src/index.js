import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import NewProject from './components/NewProject/NewProject';
import ProjectPage from './components/Project/ProjectPage';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link
  } from "react-router-dom";

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/new">
          <NewProject />
        </Route>
        <Route path="/:title">
          <ProjectPost />
        </Route>
      </Switch>
    </Router>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


function ProjectPost() {
  let { title } = useParams();
  return (
    <ProjectPage />
  );
}
