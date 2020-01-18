import React from 'react';
import {
    Link
  } from "react-router-dom";

const ProjectDisplay = ( project ) => {
  project = project.project;
  return (
    <div>
      <Link to={"/" + project.title}>This is a Project called {project.title}!!</Link>
    </div>
  );
}
    
    

export default ProjectDisplay;