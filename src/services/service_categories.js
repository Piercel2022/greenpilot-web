import api from './api'

export async function getServiceCategories() {
const response = await api.get('/service_categories')
return response.data
}

export async function getServiceCategory(id) {
const response = await api.get(`/service_categories/${id}`)
return response.data
}

export async function createServiceCategory(serviceCategory) {
const response = await api.post('/service_categories', {
service_category: serviceCategory,
})
return response.data
}

export async function updateServiceCategory(id, serviceCategory) {
const response = await api.patch(`/service_categories/${id}`, {
service_category: serviceCategory,
})
return response.data
}

export async function deleteServiceCategory(id) {
await api.delete(`/service_categories/${id}`)
}
