import api from './api'

export const getQuotes = async () => {
const response = await api.get('/quotes')
return response.data
}

export const getQuote = async (id) => {
const response = await api.get(`/quotes/${id}`)
return response.data
}

export const createQuote = async (quote) => {
const response = await api.post('/quotes', { quote })
return response.data
}

export const updateQuote = async (id, quote) => {
const response = await api.patch(`/quotes/${id}`, { quote })
return response.data
}

export const deleteQuote = async (id) => {
const response = await api.delete(`/quotes/${id}`)
return response.data
}
