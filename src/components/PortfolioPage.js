import React, { useState } from "react";
import About from "./About";
import Skill from "./Skills";
import Project from "./Projects";
import Contact from "./Contact";
import PasswordPopup from "./PasswordPopup";

const PortfolioPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="portfolio-page">
      <About />
      <Skill />
      <Project />
      <Contact />

      {/* 하단에 "이력서 수정하기" 버튼 추가 */}
      <div className="resume-edit-button">
        <button onClick={handleOpenPopup}>이력서 수정하기</button>
      </div>

      {/* 비밀번호 입력 팝업 */}
      {isPopupOpen && <PasswordPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default PortfolioPage;
