import React, { useState } from "react";
import { createSection, updateSection, deleteSection } from "../api/api";

const PortfolioPopup = ({ onClose }) => {
  const [sectionData, setSectionData] = useState({
    title: "",
    content: "",
    id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await createSection(sectionData);
      alert("새 섹션이 추가되었습니다.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("섹션 추가 중 오류가 발생했습니다.");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateSection(sectionData.id, sectionData);
      alert("섹션이 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("섹션 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSection(sectionData.id, sectionData.password);
      alert("섹션이 삭제되었습니다.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("섹션 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={sectionData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="내용"
          value={sectionData.content}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="id"
          placeholder="ID (수정/삭제 시 필수)"
          value={sectionData.id}
          onChange={handleInputChange}
        />
        <div className="button-group">
          <button type="button" onClick={handleAdd}>
            추가하기
          </button>
          <button type="button" onClick={handleUpdate}>
            수정하기
          </button>
          <button type="button" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </form>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default PortfolioPopup;
