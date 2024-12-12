import React, { useEffect, useState } from "react";
import { fetchResume } from "../api/api"; // API 호출 함수 가져오기

const ResumeView = () => {
  const [resumeData, setResumeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await fetchResume();
        if (data && data.length > 0) {
          setResumeData(data); // 배열 전체를 저장
        } else {
          setError("No data found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("API 요청 실패:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadResume();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {resumeData.map((resume, index) => (
        <div key={index}>
          <h2>About</h2>
          <p>{resume.about?.about}</p>

          <h2>Skills</h2>
          <ul>
            {resume.skills?.map((skill, skillIndex) => (
              <li key={skillIndex}>{skill}</li>
            ))}
          </ul>

          <h2>Projects</h2>
          <ul>
            {resume.projects?.map((project, projectIndex) => (
              <li key={projectIndex}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>

          <h2>Contact</h2>
          <ul>
            {resume.contact?.map((contact, contactIndex) => (
              <li key={contactIndex}>{contact}</li>
            ))}
          </ul>

          <hr /> {/* 각 이력서 항목 사이에 구분선 */}
        </div>
      ))}
    </div>
  );
};

export default ResumeView;
