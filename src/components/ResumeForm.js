import React, { useState } from "react";

const ResumeForm = ({ section, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(section || { title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="resume-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="내용"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <button type="submit">저장</button>
        <button type="button" onClick={onClose}>
          취소
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
