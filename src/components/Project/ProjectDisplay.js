import React from 'react';
import logo from './img/logo512.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

import {
    Link
  } from "react-router-dom";

const card3Style = {
  maxWidth: "38vh"
};

const img = {
    width: "80%",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto"
};

const ProjectDisplay = ( projectInfo ) => {
  let project = projectInfo.project;


  return (
    <div class="card-group" style={card3Style}>
			<div class="card">
				<img class="App-logo" src={logo} alt="Card image cap" style={img}/>
				<div class="card-body">
					<Link to={"/project/" + project.project_ID}><h5 class="card-title">{project.project_title}</h5></Link>
					<p class="card-text">{project.project_description}</p>
          <ProgressBar variant="success" now={40} />
				</div>
		</div>
  </div>
  );
}



export default ProjectDisplay;
