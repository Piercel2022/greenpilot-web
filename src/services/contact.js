import api from './api'

export const createContactRequest = async (data) => {
  const response = await api.post('/contact_requests', {
    contact_request: data,
  })

  return response.data
}