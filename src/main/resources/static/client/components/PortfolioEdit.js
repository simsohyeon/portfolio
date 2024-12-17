import React, { useState, useEffect } from "react";
import AboutEdit from "./AboutEdit";
import CareerEdit from "./CareerEdit";
import SkillsEdit from "./SkillsEdit";
import ProjectsEdit from "./ProjectsEdit";
import AwardEdit from "./AwardEdit";
import PortfolioView from "./PortfolioView";
import { useNavigate } from "react-router-dom";
import { fetchPortfolioByType, updatePortfolio } from "../api/api";

const PortfolioEdit = ({ onCancel }) => {
  const navigate = useNavigate(); // useNavigate 선언 위치 확인
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
        setAbout(aboutData.content || []);

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
      await updatePortfolio("about", about);
      await updatePortfolio("career", career);
      await updatePortfolio("skills", skills);
      await updatePortfolio("projects", projects);
      await updatePortfolio("award", award);

      alert("저장되었습니다!");
      navigate(PortfolioView); // 저장 후 View 화면으로 이동
      window.location.reload();
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패: " + error.message);
    }
  };

  return (
    <div>
      {/* AboutEdit */}
      <AboutEdit about={about} onAboutChange={(value) => setAbout(value)} />

      {/* CareerEdit */}
      <CareerEdit career={career} onCareerChange={(value) => setCareer(value)} />

      {/* SkillsEdit */}
      <SkillsEdit skills={skills} onSkillsChange={(value) => setSkills(value)} />

      {/* ProjectsEdit */}
      <ProjectsEdit
        projects={projects}
        onProjectsChange={(value) => setProjects(value)}
      />

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
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
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
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default PortfolioEdit;
