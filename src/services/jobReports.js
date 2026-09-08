import api from "./api";

export const getJobReports = async () => {
  const response = await api.get("/job_reports");
  return response.data;
};

export const getJobReport = async (id) => {
  const response = await api.get(`/job_reports/${id}`);
  return response.data;
};

export const createJobReport = async (reportData) => {
  const response = await api.post("/job_reports", {
    job_report: reportData,
  });

  return response.data;
};

export const updateJobReport = async (id, reportData) => {
  const response = await api.patch(`/job_reports/${id}`, {
    job_report: reportData,
  });

  return response.data;
};

export const deleteJobReport = async (id) => {
  await api.delete(`/job_reports/${id}`);
};