import { useEffect, useState } from 'react'
import {
getCurrentUser,
login as loginRequest,
logout as logoutRequest,
} from '../services/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(
  () => Boolean(localStorage.getItem('greenpilot_token'))
)

useEffect(() => {
const token = localStorage.getItem('greenpilot_token')


if (!token) {
  return
}

getCurrentUser()
  .then((data) => {
    setUser(data.user)
  })
  .catch(() => {
    logoutRequest()
    setUser(null)
  })
  .finally(() => {
    setLoading(false)
  })


}, [])

async function login(email, password) {
const data = await loginRequest(email, password)


localStorage.setItem('greenpilot_token', data.token)
setUser(data.user)

return data.user


}

function logout() {
logoutRequest()
setUser(null)
}

return (
<AuthContext.Provider
value={{
user,
loading,
isAuthenticated: Boolean(user),
login,
logout,
}}
>
{children}
</AuthContext.Provider>
)
}
