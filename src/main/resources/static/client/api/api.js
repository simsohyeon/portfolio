const BASE_URL = "http://localhost:8080/api";

// 공통 Fetch 함수
const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답 본문이 비어 있는 경우 처리
    const text = await response.text();
    return text ? JSON.parse(text) : { message: "No content" };
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};

// 포트폴리오 데이터를 타입별로 조회
export const fetchPortfolioByType = async (type) => {
  return await handleFetch(`${BASE_URL}/portfolios/type/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 포트폴리오 데이터를 추가
export const addPortfolioSection = async (type, content) => {
  return await handleFetch(`${BASE_URL}/portfolios/type/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, content }),
  });
};

// 포트폴리오 데이터를 수정
export const updatePortfolio = async (type, content) => {
  return await handleFetch(`${BASE_URL}/portfolios/type/${type}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, content }),
  });
};

// 포트폴리오 데이터를 삭제
export const deletePortfolioByType = async (type) => {
  return await handleFetch(`${BASE_URL}/portfolios/type/${type}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 비밀번호 저장 (서버로 암호화된 비밀번호 전송)
export const savePassword = async (password) => {
  const response = await fetch(`${BASE_URL}/auth/save-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password), // 서버로 평문 비밀번호 전송 (서버에서 암호화 처리)
  });

  if (!response.ok) {
    throw new Error("Failed to save password");
  }
};

// 비밀번호 검증 함수
export const validatePassword = async (password) => {
  const response = await fetch(`${BASE_URL}/auth/validate-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }), // JSON 객체로 비밀번호 전송
  });

  if (!response.ok) {
    throw new Error("Invalid password");
  }
};
