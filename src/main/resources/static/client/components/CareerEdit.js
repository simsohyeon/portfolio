import React from "react";

const CareerEdit = ({ career = [], onCareerChange }) => {
  // 경력 추가
  const handleAddCareer = () => {
    onCareerChange([
      ...career,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        responsibilities: [""], // 초기 책임 항목으로 빈 문자열 추가
      },
    ]);
  };

  // 경력 데이터 수정
  const handleUpdateCareer = (index, field, value) => {
    const updatedCareers = [...career];
    updatedCareers[index][field] = value;
    onCareerChange(updatedCareers);
  };

  // 책임 항목 추가
  const handleAddResponsibility = (index) => {
    const updatedCareers = [...career];
    updatedCareers[index].responsibilities.push("");
    onCareerChange(updatedCareers);
  };

  // 책임 항목 수정
  const handleUpdateResponsibility = (careerIndex, responsibilityIndex, value) => {
    const updatedCareers = [...career];
    updatedCareers[careerIndex].responsibilities[responsibilityIndex] = value;
    onCareerChange(updatedCareers);
  };

  // 책임 항목 삭제
  const handleRemoveResponsibility = (careerIndex, responsibilityIndex) => {
    const updatedCareers = [...career];
    updatedCareers[careerIndex].responsibilities.splice(responsibilityIndex, 1);
    onCareerChange(updatedCareers);
  };

  // 경력 삭제
  const handleRemoveCareer = (index) => {
    const updatedCareers = career.filter((_, i) => i !== index);
    onCareerChange(updatedCareers);
  };

  return (
    <div>
      <h2>Career</h2>
      <button onClick={handleAddCareer}>Add Career</button>
      {career.length > 0 ? (
        career.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px" }}>
            <h3>Career #{index + 1}</h3>
            <input
              type="text"
              placeholder="Company"
              value={item.company}
              onChange={(e) => handleUpdateCareer(index, "company", e.target.value)}
            />
            <input
              type="text"
              placeholder="Position"
              value={item.position}
              onChange={(e) => handleUpdateCareer(index, "position", e.target.value)}
            />
            <input
              type="text"
              placeholder="Start Date"
              value={item.start_date}
              onChange={(e) => handleUpdateCareer(index, "start_date", e.target.value)}
            />
            <input
              type="text"
              placeholder="End Date"
              value={item.end_date}
              onChange={(e) => handleUpdateCareer(index, "end_date", e.target.value)}
            />

            <h4>Responsibilities</h4>
            <ul>
              {item.responsibilities.map((task, taskIndex) => (
                <li key={taskIndex}>
                  <input
                    type="text"
                    placeholder="Responsibility"
                    value={task}
                    onChange={(e) =>
                      handleUpdateResponsibility(index, taskIndex, e.target.value)
                    }
                  />
                  <button onClick={() => handleRemoveResponsibility(index, taskIndex)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => handleAddResponsibility(index)}>Add Responsibility</button>
            <button onClick={() => handleRemoveCareer(index)} style={{ color: "red" }}>
              Remove Career
            </button>
          </div>
        ))
      ) : (
        <p>No career data available. Add a new career entry.</p>
      )}
    </div>
  );
};

export default CareerEdit;
