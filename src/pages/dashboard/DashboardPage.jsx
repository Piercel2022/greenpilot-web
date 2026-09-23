import { useContext, useEffect, useMemo, useState } from "react";
import {
AlertCircle,
ArrowRight,
BarChart3,
CalendarDays,
CheckCircle2,
ClipboardList,
Euro,
FileText,
MapPin,
Plus,
ReceiptText,
TrendingUp,
UsersRound,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import api from "../../services/api";
import { getDashboard } from "../../services/dashboard";

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

const formatCurrency = (value) =>
new Intl.NumberFormat("fr-FR", {
style: "currency",
currency: "EUR",
maximumFractionDigits: 0,
}).format(Number(value) || 0);

const formatMonth = (value) => {
if (!value) return "";

const [year, month] = value.split("-");

if (!year || !month) {
return value;
}

return new Intl.DateTimeFormat("fr-FR", {
month: "short",
year: "2-digit",
}).format(new Date(Number(year), Number(month) - 1, 1));
};

const QUOTE_STATUS_LABELS = {
draft: "Brouillon",
sent: "Envoyé",
accepted: "Accepté",
rejected: "Refusé",
expired: "Expiré",
};

const QUOTE_STATUS_CLASSES = {
draft: "bg-slate-400",
sent: "bg-blue-500",
accepted: "bg-emerald-500",
rejected: "bg-red-500",
expired: "bg-amber-500",
};

function DashboardPage() {
const navigate = useNavigate();
const { user } = useContext(AuthContext);

const [customers, setCustomers] = useState([]);
const [sites, setSites] = useState([]);
const [jobs, setJobs] = useState([]);
const [quotes, setQuotes] = useState([]);
const [invoices, setInvoices] = useState([]);
const [reports, setReports] = useState([]);
const [analytics, setAnalytics] = useState(null);

const [loading, setLoading] = useState(true);
const [analyticsLoading, setAnalyticsLoading] = useState(true);
const [error, setError] = useState("");
const [analyticsError, setAnalyticsError] = useState("");

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

async function loadAnalytics() {
  try {
    setAnalyticsLoading(true);
    setAnalyticsError("");

    const data = await getDashboard();

    if (mounted) {
      setAnalytics(data);
    }
  } catch (requestError) {
    if (!mounted) {
      return;
    }

    setAnalyticsError(
      requestError?.response?.data?.message ||
        requestError?.message ||
        "Impossible de charger les indicateurs du tableau de bord."
    );
  } finally {
    if (mounted) {
      setAnalyticsLoading(false);
    }
  }
}

loadDashboard();
loadAnalytics();

return () => {
  mounted = false;
};

}, []);

const kpis = analytics?.kpis ?? {};

const revenueData = useMemo(
() =>
(analytics?.revenue ?? []).map((item) => ({
...item,
label: formatMonth(item.month),
})),
[analytics?.revenue]
);

const quotesPipelineData = useMemo(
() =>
(analytics?.quotes_pipeline ?? []).map((item) => ({
...item,
label: QUOTE_STATUS_LABELS[item.status] || item.status,
})),
[analytics?.quotes_pipeline]
);

const workloadData = useMemo(
() =>
(analytics?.workload ?? []).map((item) => ({
...item,
label: new Intl.DateTimeFormat("fr-FR", {
weekday: "short",
day: "numeric",
}).format(new Date(`${item.date}T12:00:00`)),
})),
[analytics?.workload]
);

const billingData = useMemo(
() =>
(analytics?.billing ?? []).map((item) => ({
...item,
label: formatMonth(item.month),
})),
[analytics?.billing]
);

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

return ( <div className="space-y-8"> <header className="animate-fade-up"> <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"> <div> <p className="text-sm font-medium text-emerald-600">
Tableau de bord </p>

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

  {analyticsError && (
    <div className="animate-slide-in flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
      <AlertCircle
        size={18}
        className="mt-0.5 shrink-0"
        strokeWidth={2}
      />

      <div>
        <p className="font-medium">Les indicateurs sont indisponibles</p>
        <p className="mt-1 text-amber-600">{analyticsError}</p>
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

  <section className="grid gap-4 sm:grid-cols-2">
    <article className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
          <Euro size={21} strokeWidth={1.9} />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-700">
            Chiffre d'affaires du mois
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {analyticsLoading ? "—" : formatCurrency(kpis.revenue)}
          </p>

          <p className="mt-1 text-xs text-emerald-700/70">
            Factures émises depuis le début du mois
          </p>
        </div>
      </div>
    </article>

    <article className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
          <TrendingUp size={21} strokeWidth={1.9} />
        </div>

        <div>
          <p className="text-sm font-medium text-violet-700">
            Devis en attente
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {analyticsLoading
              ? "—"
              : formatCurrency(kpis.quotes_pending)}
          </p>

          <p className="mt-1 text-xs text-violet-700/70">
            Brouillons et devis envoyés
          </p>
        </div>
      </div>
    </article>
  </section>

  <section className="grid gap-6 xl:grid-cols-2">
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <h2 className="font-semibold text-slate-900">
              Évolution du chiffre d'affaires
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            CA facturé sur les 12 derniers mois.
          </p>
        </div>

        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          12 mois
        </span>
      </div>

      <div className="mt-6 h-72">
        {analyticsLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Chargement du graphique...
          </div>
        ) : revenueData.length === 0 ? (
          <EmptyChart message="Aucune facture sur la période." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) =>
                  `${Math.round(value / 1000)}k€`
                }
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(value),
                  "Chiffre d'affaires",
                ]}
                labelFormatter={(label) => label}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </article>

    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-violet-600" />
          <h2 className="font-semibold text-slate-900">
            Pipeline des devis
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Montant des devis réparti par statut.
        </p>
      </div>

      <div className="mt-6 h-72">
        {analyticsLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Chargement du graphique...
          </div>
        ) : quotesPipelineData.length === 0 ? (
          <EmptyChart message="Aucun devis disponible." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={quotesPipelineData}
                dataKey="amount"
                nameKey="label"
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >
                {quotesPipelineData.map((item) => (
                  <Cell
                    key={item.status}
                    fill={
                      QUOTE_STATUS_CLASSES[item.status]
                        ? {
                            draft: "#94a3b8",
                            sent: "#3b82f6",
                            accepted: "#10b981",
                            rejected: "#ef4444",
                            expired: "#f59e0b",
                          }[item.status]
                        : "#64748b"
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [formatCurrency(value), "Montant"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </article>
  </section>

  <section className="grid gap-6 xl:grid-cols-2">
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-amber-600" />
            <h2 className="font-semibold text-slate-900">
              Charge de travail
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Durée estimée des chantiers planifiés cette semaine.
          </p>
        </div>

        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
          Cette semaine
        </span>
      </div>

      <div className="mt-6 h-72">
        {analyticsLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Chargement du graphique...
          </div>
        ) : workloadData.length === 0 ? (
          <EmptyChart
            icon={CalendarDays}
            message="Aucun chantier planifié cette semaine."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={workloadData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip
                formatter={(value) => [`${value} h`, "Durée estimée"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Bar
                dataKey="hours"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
                maxBarSize={44}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </article>

    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-blue-600" />
          <h2 className="font-semibold text-slate-900">
            Facturé vs encaissé
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Comparaison mensuelle des montants facturés et encaissés.
        </p>
      </div>

      <div className="mt-6 h-72">
        {analyticsLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Chargement du graphique...
          </div>
        ) : billingData.length === 0 ? (
          <EmptyChart message="Aucune donnée de facturation." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={billingData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) =>
                  `${Math.round(value / 1000)}k€`
                }
              />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value),
                  name === "invoiced" ? "Facturé" : "Encaissé",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-slate-600">
                    {value === "invoiced" ? "Facturé" : "Encaissé"}
                  </span>
                )}
              />
              <Bar
                dataKey="invoiced"
                fill="#3b82f6"
                radius={[5, 5, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="paid"
                fill="#10b981"
                radius={[5, 5, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </article>
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

  <section className="grid gap-6 lg:grid-cols-3">
    {quickActions.map((action) => {
      const Icon = action.icon;

      return (
        <button
          key={action.label}
          type="button"
          onClick={() => navigate(action.path)}
          className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.iconBg}`}
          >
            <Icon
              size={21}
              strokeWidth={1.9}
              className={`${action.iconClass} transition-transform duration-200 group-hover:scale-105`}
            />
          </div>

          <h2 className="mt-4 font-semibold text-slate-900">
            {action.label}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {action.description}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
            Accéder
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>
        </button>
      );
    })}
  </section>

  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="font-semibold text-slate-900">
          Vue rapide de l'activité
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Accédez rapidement aux principaux volumes de votre entreprise.
        </p>
      </div>

      <CheckCircle2 size={20} className="text-emerald-500" />
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {activityLinks.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => navigate(item.path)}
            className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-left transition hover:border-slate-200 hover:bg-white"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
            >
              <Icon
                size={17}
                className={item.iconClass}
                strokeWidth={1.9}
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                {item.label}
              </p>

              <p className="mt-0.5 text-lg font-semibold text-slate-900">
                {loading ? "—" : item.value}
              </p>
            </div>

            <ArrowRight
              size={15}
              className="ml-auto text-slate-300 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        );
      })}
    </div>
  </section>
</div>

);
}

function EmptyChart({ message, icon: Icon = BarChart3 }) {
return ( <div className="flex h-full flex-col items-center justify-center rounded-xl bg-slate-50/70 text-center"> <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm"> <Icon size={20} strokeWidth={1.8} /> </div>

  <p className="mt-3 text-sm font-medium text-slate-600">{message}</p>
  <p className="mt-1 text-xs text-slate-400">
    Les données apparaîtront ici dès qu'elles seront disponibles.
  </p>
</div>

);
}

export default DashboardPage;
