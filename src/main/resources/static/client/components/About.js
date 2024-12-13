import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";

const About = () => {
  const [aboutData, setAboutData] = useState(null); // 데이터를 저장
  const [error, setError] = useState(null); // 오류 상태 저장

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchPortfolioByType("about");
        if (data && data.content) {
          setAboutData(data.content); // 데이터가 있을 경우 저장
        } else {
          setAboutData({ about: "" }); // 데이터가 없을 경우 기본값 설정
        }
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        setError("Failed to load data. Please try again.");
      }
    };

    loadAbout();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!aboutData) return <div>Loading...</div>; // 데이터 로딩 중 상태

  return (
    <div>
      <h2>About</h2>
      <p>{aboutData.about || "No content available."}</p> {/* 빈 값 처리 */}
    </div>
  );
};

export default About;
