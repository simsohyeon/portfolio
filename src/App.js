import React, { useState, useEffect } from "react";
import PortfolioView from "./main/resources/static/client/components/PortfolioView";
import PortfolioEdit from "./main/resources/static/client/components/PortfolioEdit";
import PasswordPopup from "./main/resources/static/client/components/PasswordPopup";

const App = () => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [showPasswordPopup, setShowPasswordPopup] = useState(false); // 팝업창 표시 상태

  // 화면 맨 위로 스크롤 함수
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // 수정 모드로 전환될 때 맨 위로 스크롤
  useEffect(() => {
    if (isEditing) {
      scrollToTop();
    }
  }, [isEditing]);

  const handleEditButtonClick = () => {
    setShowPasswordPopup(true); // 팝업창 표시
  };

  const handlePasswordSuccess = () => {
    setShowPasswordPopup(false);
    setIsEditing(true); // 수정 모드로 전환
  };

  return (
    <div className="App">
      {isEditing ? (
        <PortfolioEdit
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <PortfolioView />
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
              onClick={handleEditButtonClick}
            >
              이력서 수정하기
            </button>
          </div>
        </div>
      )}

      {/* 비밀번호 팝업 */}
      {showPasswordPopup && (
        <PasswordPopup
          onSuccess={handlePasswordSuccess}
          onCancel={() => setShowPasswordPopup(false)}
        />
      )}
    </div>
  );
};

export default App;
