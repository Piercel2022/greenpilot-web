
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import Register from "../pages/auth/Register";
import DashboardPage from "../pages/dashboard/DashboardPage";

import CustomersPage from "../pages/customers/CustomersPage";
import CustomerFormPage from "../pages/customers/CustomerFormPage";
import CustomerShowPage from "../pages/customers/CustomerShowPage";
import CustomerEditPage from "../pages/customers/CustomerEditPage";

import SitesPage from "../pages/sites/SitesPage";
import SiteFormPage from "../pages/sites/SiteFormPage";
import SiteShowPage from "../pages/sites/SiteShowPage";
import SiteEditPage from "../pages/sites/SiteEditPage";

import ServiceCategoriesPage from "../pages/service_categories/ServiceCategoriesPage";
import ServiceCategoryFormPage from "../pages/service_categories/ServiceCategoryFormPage";
import ServiceCategoryShowPage from "../pages/service_categories/ServiceCategoryShowPage";
import ServiceCategoryEditPage from "../pages/service_categories/ServiceCategoryEditPage";

import ServiceItemsPage from "../pages/service_items/ServiceItemsPage";
import ServiceItemFormPage from "../pages/service_items/ServiceItemFormPage";
import ServiceItemShowPage from "../pages/service_items/ServiceItemShowPage";
import ServiceItemEditPage from "../pages/service_items/ServiceItemEditPage";

import QuotesPage from "../pages/quotes/QuotesPage";
import QuoteFormPage from "../pages/quotes/QuoteFormPage";
import QuoteShowPage from "../pages/quotes/QuoteShowPage";
import QuoteEditPage from "../pages/quotes/QuoteEditPage";

import JobsPage from "../pages/jobs/JobsPage";
import JobFormPage from "../pages/jobs/JobFormPage";
import JobShowPage from "../pages/jobs/JobShowPage";
import JobEditPage from "../pages/jobs/JobEditPage";

import TeamsPage from "../pages/teams/TeamsPage";
import TeamFormPage from "../pages/teams/TeamFormPage";
import TeamShowPage from "../pages/teams/TeamShowPage";

import VehiclesPage from "../pages/vehicles/VehiclesPage";
import VehicleFormPage from "../pages/vehicles/VehicleFormPage";
import VehicleShowPage from "../pages/vehicles/VehicleShowPage";

import EquipmentPage from "../pages/equipment/EquipmentPage";
import EquipmentFormPage from "../pages/equipment/EquipmentFormPage";
import EquipmentShowPage from "../pages/equipment/EquipmentShowPage";

import InvoicesPage from "../pages/invoices/InvoicesPage";
import InvoiceFormPage from "../pages/invoices/InvoiceFormPage";
import InvoiceShowPage from "../pages/invoices/InvoiceShowPage";

import ReportsPage from "../pages/reports/ReportsPage";
import ReportShowPage from "../pages/reports/ReportShowPage";
import ReportFormPage from "../pages/reports/ReportFormPage";

import ContactPage from "../pages/ContactPage";
import HelpPage from "../pages/HelpPage";
import PricingPage from "../pages/PricingPage";
import FeaturesPage from "../pages/FeaturesPage";
import ClientsSitesPage from "../pages/features/ClientsSitesPage";

import LegalNoticePage from "../pages/LegalNoticePage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";


import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/aide" element={<HelpPage />} />
        <Route path="/tarifs" element={<PricingPage />} />
        <Route path="/fonctionnalites" element={<FeaturesPage />} />
        <Route path="/fonctionnalites/clients-sites" element={<ClientsSitesPage />} />
        <Route path="/mentions-legales" element={<LegalNoticePage />} />
        <Route path="/confidentialite" element={<PrivacyPage />} />
        <Route path="/cgu" element={<TermsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/new" element={<CustomerFormPage />} />
            <Route path="/customers/:id" element={<CustomerShowPage />} />
            <Route
              path="/customers/:id/edit"
              element={<CustomerEditPage />}
            />

            <Route path="/sites" element={<SitesPage />} />
            <Route path="/sites/new" element={<SiteFormPage />} />
            <Route path="/sites/:id" element={<SiteShowPage />} />
            <Route path="/sites/:id/edit" element={<SiteEditPage />} />

            <Route
              path="/service-categories"
              element={<ServiceCategoriesPage />}
            />
            <Route
              path="/service-categories/new"
              element={<ServiceCategoryFormPage />}
            />
            <Route
              path="/service-categories/:id"
              element={<ServiceCategoryShowPage />}
            />
            <Route
              path="/service-categories/:id/edit"
              element={<ServiceCategoryEditPage />}
            />

            <Route path="/service-items" element={<ServiceItemsPage />} />
            <Route
              path="/service-items/new"
              element={<ServiceItemFormPage />}
            />
            <Route
              path="/service-items/:id"
              element={<ServiceItemShowPage />}
            />
            <Route
              path="/service-items/:id/edit"
              element={<ServiceItemEditPage />}
            />

            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/quotes/new" element={<QuoteFormPage />} />
            <Route path="/quotes/:id" element={<QuoteShowPage />} />
            <Route path="/quotes/:id/edit" element={<QuoteEditPage />} />

            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/new" element={<JobFormPage />} />
            <Route path="/jobs/:id" element={<JobShowPage />} />
            <Route path="/jobs/:id/edit" element={<JobEditPage />} />

            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/new" element={<TeamFormPage />} />
            <Route path="/teams/:id" element={<TeamShowPage />} />
            <Route path="/teams/:id/edit" element={<TeamFormPage />} />

            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/vehicles/new" element={<VehicleFormPage />} />
            <Route path="/vehicles/:id" element={<VehicleShowPage />} />
            <Route path="/vehicles/:id/edit" element={<VehicleFormPage />}/>

            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/equipment/new" element={<EquipmentFormPage />} />
            <Route path="/equipment/:id" element={<EquipmentShowPage />} />
            <Route path="/equipment/:id/edit" element={<EquipmentFormPage />} />

            
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/invoices/new" element={<InvoiceFormPage />} />
            <Route path="/invoices/:id" element={<InvoiceShowPage />} />
            <Route path="/invoices/:id/edit" element={<InvoiceFormPage />} />

            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/:id" element={<ReportShowPage />} />
            <Route path="/reports/new" element={<ReportFormPage />} />
            <Route path="/reports/:id/edit" element={<ReportFormPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}