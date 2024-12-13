import React, { useState } from "react";
import PortfolioView from "./main/resources/static/client/components/PortfolioView";
import PortfolioEdit from "./main/resources/static/client/components/PortfolioEdit";
import PasswordPopup from "./main/resources/static/client/components/PasswordPopup";

const App = () => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [showPasswordPopup, setShowPasswordPopup] = useState(false); // 팝업창 표시 상태

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
