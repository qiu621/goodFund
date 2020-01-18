import React from 'react';
import ProjectDisplay from '../Project/ProjectDisplay';

const ProjectList = ( projects ) => {
    projects = [
        {
            "id": 1,
            "title": 'abc',
            "amount": 10
        },
        {
            "id": 2,
            "title": 'cde',
            "amount": 10
        }
    ];
    return (
        <div className="row mt-3">
            {projects.map(project =>
                <ProjectDisplay key={project.id} project={project} />
            )}
        </div>
    );
}
  

export default ProjectList;