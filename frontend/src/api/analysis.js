import api from "./axios";

export const analyzeResume = async (resumeId) => {
  const response = await api.post(`/analysis/${resumeId}`);
  return response.data;
};

export const getAnalysis = async (resumeId) => {
  const response = await api.get(`/analysis/${resumeId}`);
  return response.data;
};