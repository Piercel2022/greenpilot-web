import api from "./api";

export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs", { params });
  return response.data;
};

export const getJob = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post("/jobs", { job: jobData });
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.patch(`/jobs/${id}`, { job: jobData });
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};