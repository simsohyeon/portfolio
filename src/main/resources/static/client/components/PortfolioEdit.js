import React, { useState } from "react";

const PortfolioEdit = ({ resumeData, onSave, onCancel }) => {
  const [personalInfo, setPersonalInfo] = useState(resumeData.personalInfo || {});
  const [summary, setSummary] = useState(resumeData.summary || {});
  const [myCareer, setMyCareer] = useState(resumeData.myCareer || "");
  const [careers, setCareers] = useState(resumeData.careers || []);
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [projects, setProjects] = useState(resumeData.projects || []);
  const [certifications, setCertifications] = useState(resumeData.certifications || []);

  // Input 핸들러
  const handleInputChange = (setter, field) => (e) => {
    setter((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // 추가/삭제 핸들러
  const handleAddItem = (setter, defaultItem) => {
    setter((prev) => [...prev, { id: Date.now(), ...defaultItem }]);
  };

  const handleDeleteItem = (setter, id) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="resume-edit">
      <h2>이력서 수정</h2>

      {/* 개인 정보 섹션 */}
      <div className="section">
        <h3>개인 정보</h3>
        <input
          type="text"
          placeholder="이름"
          value={personalInfo.name || ""}
          onChange={handleInputChange(setPersonalInfo, "name")}
        />
        <input
          type="text"
          placeholder="성별"
          value={personalInfo.gender || ""}
          onChange={handleInputChange(setPersonalInfo, "gender")}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={personalInfo.phone || ""}
          onChange={handleInputChange(setPersonalInfo, "phone")}
        />
        <input
          type="email"
          placeholder="이메일"
          value={personalInfo.email || ""}
          onChange={handleInputChange(setPersonalInfo, "email")}
        />
        <input
          type="text"
          placeholder="주소"
          value={personalInfo.address || ""}
          onChange={handleInputChange(setPersonalInfo, "address")}
        />
      </div>

      {/* 요약 정보 섹션 */}
      <div className="section">
        <h3>요약 정보</h3>
        <input
          type="text"
          placeholder="학력사항"
          value={summary.education || ""}
          onChange={handleInputChange(setSummary, "education")}
        />
        <input
          type="text"
          placeholder="경력사항"
          value={summary.career || ""}
          onChange={handleInputChange(setSummary, "career")}
        />
      </div>

      {/* My Career */}
      <div className="section">
        <h3>My Career</h3>
        <textarea
          placeholder="나의 커리어를 입력하세요"
          value={myCareer}
          onChange={(e) => setMyCareer(e.target.value)}
        />
      </div>

      {/* 경력 섹션 */}
      <div className="section">
        <h3>경력</h3>
        {careers.map((career) => (
          <div key={career.id} className="career-item">
            <input
              type="text"
              placeholder="회사명"
              value={career.company || ""}
              onChange={(e) =>
                setCareers((prev) =>
                  prev.map((c) =>
                    c.id === career.id ? { ...c, company: e.target.value } : c
                  )
                )
              }
            />
            <input
              type="text"
              placeholder="직무"
              value={career.role || ""}
              onChange={(e) =>
                setCareers((prev) =>
                  prev.map((c) =>
                    c.id === career.id ? { ...c, role: e.target.value } : c
                  )
                )
              }
            />
            <button onClick={() => handleDeleteItem(setCareers, career.id)}>
              삭제
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            handleAddItem(setCareers, { company: "", role: "", duration: "" })
          }
        >
          경력 추가
        </button>
      </div>

      {/* 저장 및 취소 버튼 */}
      <div className="actions">
        <button
          onClick={() =>
            onSave({
              personalInfo,
              summary,
              myCareer,
              careers,
              skills,
              projects,
              certifications,
            })
          }
        >
          저장
        </button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default PortfolioEdit;
