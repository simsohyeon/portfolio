import React, { useEffect, useState } from "react";
import { fetchResume } from "../api/api";

const ResumeView = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await fetchResume(); // API 호출
        console.log("API 응답 데이터:", data); // 디버깅용 로그
        setResumeData(data); // 상태 업데이트
        setLoading(false); // 로딩 완료
      } catch (err) {
        console.error("API 요청 실패:", err);
        setError(err.message); // 에러 상태 업데이트
        setLoading(false);
      }
    };

    loadResume();
  }, []);

  if (loading) return <p>Loading...</p>; // 로딩 중
  if (error) return <p>Error: {error}</p>; // 에러 발생 시
  if (!resumeData) return <p>데이터가 없습니다.</p>; // 데이터 없음 처리

  return (
    <div>
      <h2>About</h2>
      <p>{resumeData.about}</p>

      <h2>Skills</h2>
      <ul>
        {resumeData.skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {resumeData.projects?.map((project, index) => (
          <li key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>

      <h2>Contact</h2>
      <ul>
        {resumeData.contact?.map((contact, index) => (
          <li key={index}>{contact}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeView;
