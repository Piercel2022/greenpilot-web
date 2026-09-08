import api from "./api";

export const getTeams = async (params = {}) => {
  const response = await api.get("/teams", { params });
  return response.data;
};

export const getTeam = async (id) => {
  const response = await api.get(`/teams/${id}`);
  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await api.post("/teams", {
    team: teamData,
  });

  return response.data;
};

export const updateTeam = async (id, teamData) => {
  const response = await api.patch(`/teams/${id}`, {
    team: teamData,
  });

  return response.data;
};

export const deleteTeam = async (id) => {
  const response = await api.delete(`/teams/${id}`);
  return response.data;
};