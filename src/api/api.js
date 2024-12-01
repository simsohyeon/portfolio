const API_BASE_URL = "http://localhost:8080/api/sections";

// 섹션 데이터를 가져오는 함수 정의
export const getSections = async () => {
  const response = await fetch(`${API_BASE_URL}/sections`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// 추가 예시로 다른 CRUD 함수들
export const createSection = async (section) => {
  const response = await fetch(`${API_BASE_URL}/sections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(section),
  });
  return response.json();
};

export const updateSection = async (id, section) => {
  const response = await fetch(`${API_BASE_URL}/sections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(section),
  });
  return response.json();
};

export const deleteSection = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sections/${id}`, {
    method: "DELETE",
  });
  return response.text();
};

export const validatePassword = async (password) => {
  const response = await fetch(`${API_BASE_URL}/validate-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error("비밀번호 검증 실패");
  }

  const result = await response.json();
  return result.isValid; // 서버에서 true/false 반환
};


