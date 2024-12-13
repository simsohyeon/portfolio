import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";

const Career = () => {
  const [careerData, setCareerData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCareer = async () => {
      try {
        const data = await fetchPortfolioByType("career");
        if (data && Array.isArray(data.content)) {
          setCareerData(data.content); // 데이터가 배열일 경우 저장
        } else {
          setCareerData([]); // 데이터가 없을 경우 빈 배열 설정
        }
      } catch (err) {
        console.error("Failed to fetch career data:", err);
        setError("Failed to load career data. Please try again.");
      }
    };

    loadCareer();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!careerData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Career</h2>
      {careerData.length > 0 ? (
        <ul>
          {careerData.map((career, index) => (
            <li key={index}>
              <h3>{career.company}</h3>
              <p>Position: {career.position}</p>
              <p>
                Duration: {career.start_date} - {career.end_date}
              </p>
              <h4>Responsibilities:</h4>
              <ul>
                {career.responsibilities.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No career data available.</p>
      )}
    </div>
  );
};

export default Career;
