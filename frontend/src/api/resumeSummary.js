import api from "./axios";

export const createResumeSummary = async (resumeId) => {
  const response = await api.post(`/resume-summary/${resumeId}`);
  return response.data;
};

export const getResumeSummary = async (resumeId) => {
  const response = await api.get(`/resume-summary/${resumeId}`);
  return response.data;
};