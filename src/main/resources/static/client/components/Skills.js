import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchPortfolioByType("skills");
        if (data && Array.isArray(data.content)) {
          setSkillsData(data.content); // 데이터가 배열일 경우 저장
        } else {
          setSkillsData([]); // 데이터가 없을 경우 빈 배열 설정
        }
      } catch (err) {
        console.error("Failed to fetch skills data:", err);
        setError("Failed to load data. Please try again.");
      }
    };

    loadSkills();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!skillsData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Skills</h2>
      {skillsData.length > 0 ? (
        <ul>
          {skillsData.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p>No skills available.</p>
      )}
    </div>
  );
};

export default Skills;
