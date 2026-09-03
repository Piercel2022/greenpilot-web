import api from './api'

export async function getServiceItems() {
const response = await api.get('/service_items')
return response.data
}

export async function getServiceItem(id) {
const response = await api.get(`/service_items/${id}`)
return response.data
}

export async function createServiceItem(serviceItem) {
const response = await api.post('/service_items', {
service_item: serviceItem,
})
return response.data
}

export async function updateServiceItem(id, serviceItem) {
const response = await api.patch(`/service_items/${id}`, {
service_item: serviceItem,
})
return response.data
}

export async function deleteServiceItem(id) {
await api.delete(`/service_items/${id}`)
}
