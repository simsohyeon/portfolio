import React from "react";

const AwardEdit = ({ award = [], onAwardChange }) => {
  // 수상 데이터 추가
  const handleAddAward = () => {
    onAwardChange([
      ...award,
      {
        title: "",
        organization: "",
        date: "",
        description: "",
      },
    ]);
  };

  // 수상 데이터 수정
  const handleUpdateAward = (index, field, value) => {
    const updatedAwards = [...award];
    updatedAwards[index][field] = value;
    onAwardChange(updatedAwards);
  };

  // 수상 데이터 삭제
  const handleRemoveAward = (index) => {
    const updatedAwards = award.filter((_, i) => i !== index);
    onAwardChange(updatedAwards);
  };

  return (
    <div>
      <h2>Awards</h2>
      <button onClick={handleAddAward}>Add Award</button>
      {award.length > 0 ? (
        award.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px" }}>
            <h3>Award #{index + 1}</h3>
            <input
              type="text"
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleUpdateAward(index, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Organization"
              value={item.organization}
              onChange={(e) => handleUpdateAward(index, "organization", e.target.value)}
            />
            <input
              type="date"
              placeholder="Date"
              value={item.date}
              onChange={(e) => handleUpdateAward(index, "date", e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleUpdateAward(index, "description", e.target.value)}
            />
            <button onClick={() => handleRemoveAward(index)} style={{ color: "red" }}>
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No awards available. Add a new award.</p>
      )}
    </div>
  );
};

export default AwardEdit;
