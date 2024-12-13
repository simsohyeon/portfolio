import React from "react";

const EditButton = ({ onClick }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={onClick}
      >
        이력서 수정하기
      </button>
    </div>
  );
};

export default EditButton;
