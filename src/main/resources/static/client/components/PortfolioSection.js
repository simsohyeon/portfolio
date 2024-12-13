import React from "react";

const ResumeSection = ({ section, onEdit, onDelete }) => {
  return (
    <div className="resume-section">
      <h2>{section.title}</h2>
      <p>{section.content}</p>
      <button onClick={() => onEdit(section)}>수정</button>
      <button onClick={() => onDelete(section.id)}>삭제</button>
    </div>
  );
};

export default ResumeSection;
