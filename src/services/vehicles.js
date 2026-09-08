import api from "./api";

export const getVehicles = async () => {
  const response = await api.get("/vehicles");
  return response.data;
};

export const getVehicle = async (vehicleId) => {
  const response = await api.get(`/vehicles/${vehicleId}`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await api.post("/vehicles", {
    vehicle: vehicleData,
  });

  return response.data;
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  const response = await api.patch(`/vehicles/${vehicleId}`, {
    vehicle: vehicleData,
  });

  return response.data;
};

export const deleteVehicle = async (vehicleId) => {
  const response = await api.delete(`/vehicles/${vehicleId}`);
  return response.data;
};