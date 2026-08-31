import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import CustomersPage from '../pages/customers/CustomersPage'
import AppLayout from '../layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'

export default function AppRouter() {
return ( <BrowserRouter> <Routes>
<Route path="/login" element={<LoginPage />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
</BrowserRouter>

)
}
