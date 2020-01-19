import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';


const ProjectPage = ( project ) => {
    return (
        <Jumbotron>
            <h1>{ project.project.project_title }</h1>
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
        </Jumbotron>
    );
}
  

export default ProjectPage;