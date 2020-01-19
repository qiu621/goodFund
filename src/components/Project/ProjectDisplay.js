import React from 'react';
import {
    Link
  } from "react-router-dom";

const ProjectDisplay = ( projectInfo ) => {
  let project = projectInfo.project;
  return (
    <div class="card-group">
			<div class="card">
				<img class="card-img-top" src="..." alt="Card image cap"/>
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