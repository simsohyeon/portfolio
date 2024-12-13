const BASE_URL = "http://localhost:8080/api";

// 포트폴리오 데이터를 타입별로 가져오기
export const fetchPortfolioByType = async (type) => {
  const response = await fetch(`${BASE_URL}/portfolios/type/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data for type: ${type}`);
  }

  return response.json();
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
