import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute() {
const { loading, isAuthenticated } = useAuth()

if (loading) {
return ( <div className="flex min-h-screen items-center justify-center">
Chargement... </div>
)
}

if (!isAuthenticated) {
return <Navigate to="/login" replace />
}

return <Outlet />
}
