import api from "./api";

export async function getPlans() {
  const response = await api.get("/plans");
  return response.data;
}