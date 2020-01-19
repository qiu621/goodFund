import React from 'react';
import ProjectDisplay from '../Project/ProjectDisplay';

const ProjectList = ( projects ) => {
    projects = projects.projects;
    return (
        <div className="row mt-3">
            {projects.map(project =>
                <ProjectDisplay key={project._ID} project={project} />
            )}
        </div>
    );
}


export default ProjectList;