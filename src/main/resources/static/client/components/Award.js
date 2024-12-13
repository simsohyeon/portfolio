import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";

const Award = () => {
  const [awardData, setAwardData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAwards = async () => {
      try {
        const data = await fetchPortfolioByType("award");
        if (data && Array.isArray(data.content)) {
          setAwardData(data.content); // 데이터가 배열일 경우 저장
        } else {
          setAwardData([]); // 데이터가 없을 경우 빈 배열 설정
        }
      } catch (err) {
        console.error("Failed to fetch award data:", err);
        setError("Failed to load award data. Please try again.");
      }
    };

    loadAwards();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!awardData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Awards</h2>
      {awardData.length > 0 ? (
        <ul>
          {awardData.map((award, index) => (
            <li key={index}>
              <h3>{award.title}</h3>
              <p>Organization: {award.organization}</p>
              <p>Date: {award.date}</p>
              <p>{award.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No awards available.</p>
      )}
    </div>
  );
};

export default Award;
