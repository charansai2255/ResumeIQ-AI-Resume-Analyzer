
import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await api.get("/dashboard/recent-activity");
  return response.data;
};

export const getATSTrend = async () => {
    const response = await api.get("/dashboard/ats-trend");
    return response.data;
};