import api from "./axios";

export const matchResume = async (resumeId, jobDescription) => {
  const response = await api.post(
    `/job-analysis/${resumeId}`,
    {
      job_description: jobDescription,
    }
  );

  return response.data;
};

export const getJobMatch = async (resumeId) => {
  const response = await api.get(
    `/job-analysis/${resumeId}`
  );

  return response.data;
};