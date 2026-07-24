import api from "./axios";

export const createCoverLetter = async (resumeId, data) => {
  const response = await api.post(
    `/cover-letter/${resumeId}`,
    data
  );

  return response.data;
};

export const getCoverLetter = async (resumeId) => {
  const response = await api.get(
    `/cover-letter/${resumeId}`
  );

  return response.data;
};