import React from "react";

const ProjectsEdit = ({ projects, onProjectsChange }) => {
  const handleAddProject = () => {
    onProjectsChange([...projects, { title: "", description: "" }]); // 빈 프로젝트 추가
  };

  const handleChangeProject = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    onProjectsChange(updatedProjects);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onProjectsChange(updatedProjects);
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder="프로젝트 제목"
              value={project.title}
              onChange={(e) => handleChangeProject(index, "title", e.target.value)}
            />
            <textarea
              placeholder="프로젝트 설명"
              value={project.description}
              onChange={(e) => handleChangeProject(index, "description", e.target.value)}
            />
            <button onClick={() => handleRemoveProject(index)}>삭제</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddProject}>프로젝트 추가</button>
    </div>
  );
};

export default ProjectsEdit;
