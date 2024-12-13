import React, { useState, useEffect } from "react";
import AboutEdit from "./AboutEdit";
import CareerEdit from "./CareerEdit";
import SkillsEdit from "./SkillsEdit";
import ProjectsEdit from "./ProjectsEdit";
import AwardEdit from "./AwardEdit";
import { fetchPortfolioByType, updatePortfolio } from "../api/api";

const PortfolioEdit = ({ onCancel }) => {
  const [about, setAbout] = useState("");
  const [career, setCareer] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [award, setAward] = useState([]);

  // 초기 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const aboutData = await fetchPortfolioByType("about");
        setAbout(aboutData.content.about || "");

        const careerData = await fetchPortfolioByType("career");
        setCareer(careerData.content || []);

        const skillsData = await fetchPortfolioByType("skills");
        setSkills(skillsData.content || []);

        const projectsData = await fetchPortfolioByType("projects");
        setProjects(projectsData.content || []);

         const awardData = await fetchPortfolioByType("award");
         setAward(awardData.content || []);

      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    loadData();
  }, []);

  // 데이터 저장
  const handleSave = async () => {
    try {
      await updatePortfolio("about", { about });    // 소개 저장
      await updatePortfolio("career", career);      // 경력 저장
      await updatePortfolio("skills", skills);      // 스킬 저장
      await updatePortfolio("projects", projects);  // 프로젝트 저장
      await updatePortfolio("award", award);        // 수상 저장

      console.log("모든 데이터 저장 성공");
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };


  return (
    <div>
      <h1>이력서 수정</h1>

      {/* AboutEdit */}
      <AboutEdit about={about} onAboutChange={(value) => setAbout(value)} />

      {/* CareerEdit */}
      <CareerEdit career={career} onCareerChange={(value) => setCareer(value)} />

      {/* SkillsEdit */}
      <SkillsEdit skills={skills} onSkillsChange={(value) => setSkills(value)} />

      {/* ProjectsEdit */}
      <ProjectsEdit projects={projects} onProjectsChange={(value) => setProjects(value)} />

      {/* AwardEdit */}
      <AwardEdit award={award} onAwardChange={(value) => setAward(value)} />

      {/* 저장 및 취소 버튼 */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007BFF", // 버튼 색상 수정
            color: "white",
            border: "none",
            borderRadius: "5px", // 둥근 모서리 크기 통일
            marginRight: "10px", // 버튼 간격 추가
          }}
        >
          저장
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "gray", // 취소 버튼 색상
            color: "white",
            border: "none",
            borderRadius: "5px", // 둥근 모서리 크기 통일
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default PortfolioEdit;
