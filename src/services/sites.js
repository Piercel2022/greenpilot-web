import api from './api'

export async function getSites() {
const response = await api.get('/sites')

return response.data
}

export async function getSite(id) {
const response = await api.get(`/sites/${id}`)

return response.data
}

export async function createSite(site) {
const response = await api.post('/sites', {
site,
})

return response.data
}

export async function updateSite(id, site) {
const response = await api.patch(`/sites/${id}`, {
site,
})

return response.data
}

export async function deleteSite(id) {
await api.delete(`/sites/${id}`)
}
