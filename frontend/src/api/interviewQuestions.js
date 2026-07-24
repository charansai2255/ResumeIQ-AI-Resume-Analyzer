import api from "./axios";

export const createInterviewQuestions = async (resumeId, data) => {
  const response = await api.post(
    `/interview-questions/${resumeId}`,
    data
  );

  return response.data;
};

export const getInterviewQuestions = async (resumeId) => {
  const response = await api.get(
    `/interview-questions/${resumeId}`
  );

  return response.data;
};