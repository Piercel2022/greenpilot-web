
import api from "./api";

export const getInvoiceItems = async () => {
  const response = await api.get("/invoice_items");
  return response.data;
};

export const getInvoiceItem = async (id) => {
  const response = await api.get(`/invoice_items/${id}`);
  return response.data;
};

export const createInvoiceItem = async (invoiceItem) => {
  const response = await api.post("/invoice_items", {
    invoice_item: invoiceItem,
  });
  return response.data;
};

export const updateInvoiceItem = async (id, invoiceItem) => {
  const response = await api.patch(`/invoice_items/${id}`, {
    invoice_item: invoiceItem,
  });
  return response.data;
};

export const deleteInvoiceItem = async (id) => {
  await api.delete(`/invoice_items/${id}`);
};