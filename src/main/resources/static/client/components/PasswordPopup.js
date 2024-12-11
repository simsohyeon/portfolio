import React, { useState } from "react";
import { validatePassword } from "../api/api";

const PasswordPopup = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = await validatePassword(password);
      if (isValid) {
        window.location.href = "/resume-editor"; // 이력서 수정 페이지로 이동
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="password-popup">
      <div className="popup-content">
        <h2>비밀번호 입력</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <div className="popup-actions">
            <button type="submit">확인</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;
