import React from "react";

const Projects = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <p>프로젝트 데이터를 불러오는 중입니다...</p>;
  }

  return (
    <section className="projects-section">
      {data.map((project, index) => (
        <div key={index}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Projects;