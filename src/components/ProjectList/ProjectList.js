import React from 'react';
import ProjectDisplay from '../Project/ProjectDisplay';

const ProjectList = ( projects ) => {
    return (
        <div className="row mt-3">
            {projects.projects.map(project =>
                <ProjectDisplay key={project.id} project={project} />
            )}
        </div>
    );
}
  

export default ProjectList;