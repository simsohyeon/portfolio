// Skill.js
import React from "react";

const Skill = ({ data = [] }) => {
  return (
    <section className="skill-section">
      <h2>Skills</h2>
      <ul>
        {data.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skill;
