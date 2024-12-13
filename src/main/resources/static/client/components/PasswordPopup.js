import React, { useState } from "react";
import { validatePassword } from "../api/api";

const PasswordPopup = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validatePassword(password); // 서버에서 비밀번호 검증
      setError("");
      onSuccess(); // 검증 성공 시 콜백 호출
    } catch {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2>비밀번호 입력</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            style={{ padding: "10px", fontSize: "16px", width: "80%", marginBottom: "10px" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              확인
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;
