import React from "react";

const SkillsEdit = ({ skills, onSkillsChange }) => {
  const handleAddSkill = () => {
    onSkillsChange([...skills, ""]); // 빈 값 추가
  };

  const handleChangeSkill = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    onSkillsChange(updatedSkills);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onSkillsChange(updatedSkills);
  };

  return (
    <div>
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChangeSkill(index, e.target.value)}
            />
            <button onClick={() => handleRemoveSkill(index)}>삭제</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddSkill}>스킬 추가</button>
    </div>
  );
};

export default SkillsEdit;
