
import { useContext, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileText,
  MapPin,
  Plus,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import api from "../../services/api";

function normalizeCollection(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
}

 function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [customers, setCustomers] = useState([]);
  const [sites, setSites] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          customersResponse,
          sitesResponse,
          quotesResponse,
          jobsResponse,
          invoicesResponse,
          reportsResponse,
        ] = await Promise.all([
          api.get("/customers"),
          api.get("/sites"),
          api.get("/quotes"),
          api.get("/jobs"),
          api.get("/invoices"),
          api.get("/job_reports"),
        ]);

        if (!mounted) {
          return;
        }

        setCustomers(normalizeCollection(customersResponse));
        setSites(normalizeCollection(sitesResponse));
        setQuotes(normalizeCollection(quotesResponse));
        setJobs(normalizeCollection(jobsResponse));
        setInvoices(normalizeCollection(invoicesResponse));
        setReports(normalizeCollection(reportsResponse));
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Impossible de charger les données du tableau de bord."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = [
    {
      label: "Clients",
      value: customers.length,
      description: "Clients enregistrés",
      icon: UsersRound,
      iconClass: "text-blue-600",
      iconBg: "bg-blue-50",
      path: "/customers",
    },
    {
      label: "Sites",
      value: sites.length,
      description: "Sites suivis",
      icon: MapPin,
      iconClass: "text-emerald-600",
      iconBg: "bg-emerald-50",
      path: "/sites",
    },
    {
      label: "Chantiers",
      value: jobs.length,
      description: "Chantiers enregistrés",
      icon: ClipboardList,
      iconClass: "text-amber-600",
      iconBg: "bg-amber-50",
      path: "/jobs",
    },
    {
      label: "Devis",
      value: quotes.length,
      description: "Devis enregistrés",
      icon: FileText,
      iconClass: "text-violet-600",
      iconBg: "bg-violet-50",
      path: "/quotes",
    },
  ];

  const secondaryStats = [
    {
      label: "Factures",
      value: invoices.length,
      icon: ReceiptText,
      iconClass: "text-rose-600",
      iconBg: "bg-rose-50",
      path: "/invoices",
    },
    {
      label: "Rapports terrain",
      value: reports.length,
      icon: ClipboardList,
      iconClass: "text-cyan-600",
      iconBg: "bg-cyan-50",
      path: "/reports",
    },
  ];

  const quickActions = [
    {
      label: "Nouveau client",
      description: "Ajouter un client et son activité",
      icon: UsersRound,
      iconClass: "text-blue-600",
      iconBg: "bg-blue-50",
      path: "/customers/new",
    },
    {
      label: "Nouveau devis",
      description: "Créer rapidement une proposition",
      icon: FileText,
      iconClass: "text-violet-600",
      iconBg: "bg-violet-50",
      path: "/quotes/new",
    },
    {
      label: "Nouveau chantier",
      description: "Planifier une nouvelle intervention",
      icon: ClipboardList,
      iconClass: "text-amber-600",
      iconBg: "bg-amber-50",
      path: "/jobs/new",
    },
  ];

  const activityLinks = [
    {
      label: "Clients",
      value: customers.length,
      icon: UsersRound,
      iconClass: "text-blue-600",
      iconBg: "bg-blue-50",
      path: "/customers",
    },
    {
      label: "Sites",
      value: sites.length,
      icon: MapPin,
      iconClass: "text-emerald-600",
      iconBg: "bg-emerald-50",
      path: "/sites",
    },
    {
      label: "Devis",
      value: quotes.length,
      icon: FileText,
      iconClass: "text-violet-600",
      iconBg: "bg-violet-50",
      path: "/quotes",
    },
    {
      label: "Chantiers",
      value: jobs.length,
      icon: CalendarDays,
      iconClass: "text-amber-600",
      iconBg: "bg-amber-50",
      path: "/jobs",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="animate-fade-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">
              Tableau de bord
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Bonjour{user?.first_name ? ` ${user.first_name}` : ""},
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Retrouvez ici une vue rapide de votre activité GreenPilot et
              accédez directement à vos principales actions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/invoices/new")}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
          >
            <Plus
              size={17}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            Nouvelle facture
          </button>
        </div>
      </header>

      {error && (
        <div className="animate-slide-in flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
            strokeWidth={2}
          />

          <div>
            <p className="font-medium">Une erreur est survenue</p>
            <p className="mt-1 text-red-600">{error}</p>
          </div>
        </div>
      )}

      <section className="animate-stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => navigate(stat.path)}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.9}
                    className={`${stat.iconClass} transition-transform duration-200 group-hover:scale-105`}
                  />
                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-500"
                />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                  {loading ? "—" : stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            </button>
          );
        })}
      </section>

      <section className="animate-stagger grid gap-4 sm:grid-cols-2">
        {secondaryStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => navigate(stat.path)}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.9}
                    className={`${stat.iconClass} transition-transform duration-200 group-hover:scale-105`}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {loading ? "—" : stat.value}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={17}
                className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-500"
              />
            </button>
          );
        })}
      </section>

      <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Votre activité
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Accédez rapidement aux principaux espaces de votre activité.
            </p>
          </div>

          <CalendarDays
            size={20}
            className="text-slate-400"
            strokeWidth={1.8}
          />
        </div>

        <div className="animate-stagger mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {activityLinks.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.9}
                      className={`${item.iconClass} transition-transform duration-200 group-hover:scale-105`}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {loading ? "Chargement..." : `${item.value} élément(s)`}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-500"
                />
              </button>
            );
          })}
        </div>
      </section>

      <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Actions rapides
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Lancez les opérations les plus fréquentes en quelques secondes.
          </p>
        </div>

        <div className="animate-stagger mt-5 grid gap-3 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => navigate(action.path)}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconBg}`}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.9}
                    className={`${action.iconClass} transition-transform duration-200 group-hover:scale-105`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {action.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-500"
                />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
export default DashboardPage;