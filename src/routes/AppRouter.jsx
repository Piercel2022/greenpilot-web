import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from "../pages/HomePage";
import LoginPage from '../pages/auth/LoginPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import CustomersPage from '../pages/customers/CustomersPage'
import CustomerFormPage from '../pages/customers/CustomerFormPage'
import CustomerShowPage from '../pages/customers/CustomerShowPage'
import CustomerEditPage from '../pages/customers/CustomerEditPage'
import AppLayout from '../layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import SitesPage from '../pages/sites/SitesPage'
import SiteFormPage from '../pages/sites/SiteFormPage'
import SiteShowPage from '../pages/sites/SiteShowPage'
import SiteEditPage from '../pages/sites/SiteEditPage'
import ServiceCategoriesPage from '../pages/service_categories/ServiceCategoriesPage'
import ServiceCategoryFormPage from '../pages/service_categories/ServiceCategoryFormPage'
import ServiceCategoryShowPage from '../pages/service_categories/ServiceCategoryShowPage'
import ServiceCategoryEditPage from '../pages/service_categories/ServiceCategoryEditPage'
import ServiceItemsPage from '../pages/service_items/ServiceItemsPage'
import ServiceItemFormPage from '../pages/service_items/ServiceItemFormPage'
import ServiceItemShowPage from '../pages/service_items/ServiceItemShowPage'
import ServiceItemEditPage from '../pages/service_items/ServiceItemEditPage'
import QuoteFormPage from '../pages/quotes/QuoteFormPage'
import QuotesPage from '../pages/quotes/QuotesPage'
import QuoteEditPage from '../pages/quotes/QuoteEditPage'
import QuoteShowPage from '../pages/quotes/QuoteShowPage'


export default function AppRouter() {
return ( <BrowserRouter> <Routes>

<Route path="/" element={<HomePage />} />
<Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
      
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/customers" element={<CustomersPage />} />

        <Route path="/customers/new" element={<CustomerFormPage />} />

        <Route path="/customers/:id" element={<CustomerShowPage />} />

        <Route path="/customers/:id/edit" element={<CustomerEditPage />} />

        <Route path="/sites" element={<SitesPage />} />

        <Route path="/sites/new" element={<SiteFormPage />} />

        <Route path="/sites/:id" element={<SiteShowPage />} />

        <Route path="/sites/:id/edit" element={<SiteEditPage />} />
        <Route path="/service-categories" element={<ServiceCategoriesPage />} />

        <Route path="/service-categories/new" element={<ServiceCategoryFormPage />} />

        <Route path="/service-categories/:id" element={<ServiceCategoryShowPage />} />

        <Route path="/service-categories/:id/edit" element={<ServiceCategoryEditPage />} />
        
       <Route path="/service-items" element={<ServiceItemsPage />} />

       <Route path="/service-items/new" element={<ServiceItemFormPage />} />

       <Route path="/service-items/:id" element={<ServiceItemShowPage />} />

       <Route path="/service-items/:id/edit" element={<ServiceItemEditPage />} />
       <Route path="/quotes" element={<QuotesPage />} />
       <Route path="/quotes/new" element={<QuoteFormPage />} />
       <Route path="/quotes/:id" element={<QuoteShowPage />} />
       <Route path="/quotes/:id/edit" element={<QuoteEditPage />} />



      </Route>


    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
</BrowserRouter>

)
}
