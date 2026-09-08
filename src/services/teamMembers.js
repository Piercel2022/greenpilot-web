import api from "./api";

export const getTeamMembers = async (teamId) => {
  const response = await api.get(`/teams/${teamId}/members`);
  return response.data;
};

export const getAvailableTeamMembers = async (teamId) => {
  const response = await api.get(`/teams/${teamId}/available_members`);
  return response.data;
};

export const addTeamMember = async (teamId, membershipData) => {
  const response = await api.post(`/teams/${teamId}/members`, {
    team_membership: membershipData,
  });

  return response.data;
};

export const updateTeamMember = async (
  teamId,
  membershipId,
  membershipData,
) => {
  const response = await api.patch(
    `/teams/${teamId}/members/${membershipId}`,
    {
      team_membership: membershipData,
    },
  );

  return response.data;
};

export const removeTeamMember = async (teamId, membershipId) => {
  const response = await api.delete(
    `/teams/${teamId}/members/${membershipId}`,
  );

  return response.data;
};