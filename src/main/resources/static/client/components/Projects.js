import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchPortfolioByType("projects");
        if (data && Array.isArray(data.content)) {
          setProjectsData(data.content); // 데이터가 배열일 경우 저장
        } else {
          setProjectsData([]); // 데이터가 없을 경우 빈 배열 설정
        }
      } catch (err) {
        console.error("Failed to fetch projects data:", err);
        setError("Failed to load data. Please try again.");
      }
    };

    loadProjects();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!projectsData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Projects</h2>
      {projectsData.length > 0 ? (
        <ul>
          {projectsData.map((project, index) => (
            <li key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  );
};

export default Projects;
