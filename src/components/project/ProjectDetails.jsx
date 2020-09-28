import React from "react";

const ProjectDetails = (props) => {
  const id = props.match.params.id;
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project Title - {id}</span>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            dignissimos? Totam delectus voluptatibus, quasi eligendi, incidunt
            tenetur ullam fugit magni est eveniet modi ad at animi, nihil neque
            asperiores commodi.
          </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          Posted by Neil Dahiya
        </div>
      </div>
    </div>
  );
};
export default ProjectDetails;
