const BASE_URL = "http://localhost:8080/api/resumes";

export const fetchResume = async () => {
  const response = await fetch(`${BASE_URL}/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch resume data");
  }
  return response.json();
};

export const saveResume = async (resumeData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resumeData),
  });
  if (!response.ok) {
    throw new Error("Failed to save resume data");
  }
  return response.json();
};

export const updateResume = async (id, resumeData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resumeData),
  });
  if (!response.ok) {
    throw new Error("Failed to update resume data");
  }
  return response.json();
};
