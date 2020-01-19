import React from 'react';
import ProjectDisplay from '../Project/ProjectDisplay';

const ProjectList = ( projectData, fundProject, account ) => {
    return (
        <div className="row" style={{marginBottom: "7vh"}}>
            {projectData.projects.map(project =>
                <ProjectDisplay key={project.project_ID} project={project} />
            )}
        </div>
    );
}


export default ProjectList;
