import React from "react";

const AboutEdit = ({ about, onAboutChange }) => {
  return (
    <div>
      <h2>About</h2>
      <textarea
        value={about}
        onChange={(e) => onAboutChange(e.target.value)}
        placeholder="소개 내용을 입력하세요"
        style={{ width: "100%", height: "100px" }}
      />
    </div>
  );
};

export default AboutEdit;
