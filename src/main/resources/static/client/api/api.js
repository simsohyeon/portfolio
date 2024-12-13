const BASE_URL = "http://localhost:8080/api/portfolios";

export const fetchPortfolioByType = async (type) => {
  const response = await fetch(`${BASE_URL}/type/${type}`, {
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
