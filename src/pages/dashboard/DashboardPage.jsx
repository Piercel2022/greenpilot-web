import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileText,
  Plus,
  ReceiptText,
  UsersRound,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { getCustomers } from "../../services/customers";
import { getSites } from "../../services/sites";
import { getQuotes } from "../../services/quotes";
import { getJobs } from "../../services/jobs";
import { getInvoices } from "../../services/invoices";
import { getJobReports } from "../../services/jobReports";

const normalizeCollection = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return [];
};

const statCards = [
  {
    key: "customers",
    label: "Clients",
    description: "Clients enregistrés",
    icon: UsersRound,
    href: "/customers",
  },
  {
    key: "sites",
    label: "Sites",
    description: "Sites gérés",
    icon: MapPin,
    href: "/sites",
  },
  {
    key: "jobs",
    label: "Interventions",
    description: "Interventions enregistrées",
    icon: CalendarDays,
    href: "/jobs",
  },
  {
    key: "quotes",
    label: "Devis",
    description: "Devis enregistrés",
    icon: FileText,
    href: "/quotes",
  },
];

const quickActions = [
  {
    label: "Nouveau client",
    description: "Ajouter un client",
    icon: UsersRound,
    href: "/customers/new",
  },
  {
    label: "Nouveau devis",
    description: "Créer un devis",
    icon: FileText,
    href: "/quotes/new",
  },
  {
    label: "Nouvelle intervention",
    description: "Planifier une intervention",
    icon: CalendarDays,
    href: "/jobs/new",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    customers: [],
    sites: [],
    jobs: [],
    quotes: [],
    invoices: [],
    reports: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          customersResponse,
          sitesResponse,
          jobsResponse,
          quotesResponse,
          invoicesResponse,
          reportsResponse,
        ] = await Promise.all([
          getCustomers(),
          getSites(),
          getJobs(),
          getQuotes(),
          getInvoices(),
          getJobReports(),
        ]);

        if (!mounted) {
          return;
        }

        setData({
          customers: normalizeCollection(customersResponse),
          sites: normalizeCollection(sitesResponse),
          jobs: normalizeCollection(jobsResponse),
          quotes: normalizeCollection(quotesResponse),
          invoices: normalizeCollection(invoicesResponse),
          reports: normalizeCollection(reportsResponse),
        });
      } catch (requestError) {
        console.error("Erreur lors du chargement du dashboard :", requestError);

        if (mounted) {
          setError(
            "Impossible de charger les données du dashboard. Veuillez réessayer."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = {
    customers: data.customers.length,
    sites: data.sites.length,
    jobs: data.jobs.length,
    quotes: data.quotes.length,
  };

  const secondaryStats = [
    {
      label: "Factures",
      value: data.invoices.length,
      description: "Factures enregistrées",
      icon: ReceiptText,
      href: "/invoices",
    },
    {
      label: "Rapports",
      value: data.reports.length,
      description: "Rapports d'intervention",
      icon: ClipboardList,
      href: "/reports",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <section>
          <p className="text-sm font-medium text-slate-500">
            Vue d'ensemble
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Bonjour {user?.first_name || "et bienvenue"}
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Voici un aperçu de votre activité GreenPilot.
          </p>
        </section>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="text-sm font-medium">{error}</p>
              <p className="mt-1 text-xs text-red-600">
                Vérifiez votre connexion et vos droits d'accès à l'API.
              </p>
            </div>
          </div>
        )}

        {/* Main stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <button
                key={stat.key}
                type="button"
                onClick={() => navigate(stat.href)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-slate-100 p-2.5">
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {loading ? "—" : stats[stat.key]}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {stat.description}
                </p>
              </button>
            );
          })}
        </section>

        {/* Secondary stats */}
        <section className="grid gap-4 sm:grid-cols-2">
          {secondaryStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <button
                key={stat.label}
                type="button"
                onClick={() => navigate(stat.href)}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-slate-100 p-2.5">
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {loading ? "—" : stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
              </button>
            );
          })}
        </section>

        {/* Dashboard content */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Activity */}
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Activité
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Vue synthétique des données de votre organisation.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="rounded-lg border border-slate-200 p-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Interventions
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {loading
                        ? "Chargement..."
                        : `${data.jobs.length} intervention${
                            data.jobs.length > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate("/quotes")}
                className="rounded-lg border border-slate-200 p-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Devis
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {loading
                        ? "Chargement..."
                        : `${data.quotes.length} devis${
                            data.quotes.length > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate("/invoices")}
                className="rounded-lg border border-slate-200 p-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <ReceiptText className="h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Facturation
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {loading
                        ? "Chargement..."
                        : `${data.invoices.length} facture${
                            data.invoices.length > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate("/reports")}
                className="rounded-lg border border-slate-200 p-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Rapports
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {loading
                        ? "Chargement..."
                        : `${data.reports.length} rapport${
                            data.reports.length > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </article>

          {/* Quick actions */}
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Actions rapides
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Accédez rapidement aux principales actions.
            </p>

            <div className="mt-5 space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => navigate(action.href)}
                    className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="rounded-md bg-slate-100 p-2">
                      <Icon className="h-4 w-4 text-slate-700" />
                    </div>

                    <div className="flex-1">
                      <span className="block text-sm font-medium text-slate-700">
                        {action.label}
                      </span>

                      <span className="mt-1 block text-xs text-slate-500">
                        {action.description}
                      </span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => navigate("/invoices/new")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Nouvelle facture
            </button>
          </article>
        </section>
      </div>
    </div>
  );
}