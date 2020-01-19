import React from 'react';
import logo from './img/logo512.png';
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
				<img class="card-img-top" src={logo} alt="Card image cap" style={img}/>
				<div class="card-body">
					<h5 class="card-title">Eagle Water.</h5>
					<p class="card-text">Save eagles in the environment while drinking water.</p>
				</div>
				<div class="card-footer">
          <Link to={"/project/" + project.project_ID}>This is a Project called {project.project_title}!!</Link>
			</div>
		</div>
  </div>
  );
}



export default ProjectDisplay;
