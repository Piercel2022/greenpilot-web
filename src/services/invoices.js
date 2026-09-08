import api from "./api";

export const getInvoices = async () => {
  const response = await api.get("/invoices");
  return response.data;
};

export const getInvoice = async (invoiceId) => {
  const response = await api.get(`/invoices/${invoiceId}`);
  return response.data;
};

export const createInvoice = async (invoiceData) => {
  const response = await api.post("/invoices", {
    invoice: invoiceData,
  });

  return response.data;
};

export const updateInvoice = async (invoiceId, invoiceData) => {
  const response = await api.patch(`/invoices/${invoiceId}`, {
    invoice: invoiceData,
  });

  return response.data;
};

export const deleteInvoice = async (invoiceId) => {
  const response = await api.delete(`/invoices/${invoiceId}`);
  return response.data;
};