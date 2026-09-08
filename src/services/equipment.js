
import api from "./api";

export const getEquipment = async () => {
  const response = await api.get("/equipment");
  return response.data;
};

export const getEquipmentItem = async (equipmentId) => {
  const response = await api.get(`/equipment/${equipmentId}`);
  return response.data;
};

export const createEquipment = async (equipmentData) => {
  const response = await api.post("/equipment", {
    equipment: equipmentData,
  });

  return response.data;
};

export const updateEquipment = async (equipmentId, equipmentData) => {
  const response = await api.patch(`/equipment/${equipmentId}`, {
    equipment: equipmentData,
  });

  return response.data;
};

export const deleteEquipment = async (equipmentId) => {
  const response = await api.delete(`/equipment/${equipmentId}`);
  return response.data;
};