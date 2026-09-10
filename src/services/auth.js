
import api from './api'

export async function login(email, password) {
  const response = await api.post('/auth/login', {
    email,
    password,
  })

  return response.data
}

export async function register(formData) {
  const response = await api.post('/auth/register', {
    first_name: formData.first_name,
    last_name: formData.last_name,
    organization_name: formData.organization_name,
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.password_confirmation,
  })

  return response.data
}

export async function getCurrentUser() {
  const response = await api.get('/auth/me')

  return response.data
}

export function logout() {
  localStorage.removeItem('greenpilot_token')
}