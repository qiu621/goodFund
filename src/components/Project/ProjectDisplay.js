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

const fundingStatus = {
  "0": "In Progress",
  "1": "Expired",
  "2": "Goal Reached"
}

const getStatus = (status) => {
  return fundingStatus[status];
}

const ProjectDisplay = ( projectInfo ) => {
  let project = projectInfo.project;
  let creator = project.project_creator_name;
  let title = project.project_title;
  let goal = project.project_goal;
  let totalRaised = project.project_total_raised;
  let status = getStatus(project.project_status);
  let progress = totalRaised / goal * 100 || 0; //TODO: change to good naming

  return (
    <div class="card-group" style={card3Style}>
			<div class="card">
				<img class="App-logo" src={logo} alt="Card image cap" style={img}/>
				<div class="card-body">
					<Link to={"/project/" + project.project_ID}><h5 class="card-title">{title}</h5></Link>
					<p class="card-text">by {creator}</p>
          <p>{progress}% of goal</p>
          <ProgressBar variant="success" now={progress}/>
          <p>{ status }</p>
				</div>
		</div>
  </div>
  );
}



export default ProjectDisplay;
