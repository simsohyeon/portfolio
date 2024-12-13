import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";

const Contact = () => {
  const [contactData, setContactData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await fetchPortfolioByType("contact");
        if (data && Array.isArray(data.content)) {
          setContactData(data.content); // 데이터가 배열일 경우 저장
        } else {
          setContactData([]); // 데이터가 없을 경우 빈 배열 설정
        }
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
        setError("Failed to load data. Please try again.");
      }
    };

    loadContact();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!contactData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Contact</h2>
      {contactData.length > 0 ? (
        <ul>
          {contactData.map((contact, index) => (
            <li key={index}>{contact}</li>
          ))}
        </ul>
      ) : (
        <p>No contact information available.</p>
      )}
    </div>
  );
};

export default Contact;
