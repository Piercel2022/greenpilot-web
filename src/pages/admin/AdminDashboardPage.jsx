
import { useEffect, useState } from "react";
import {
  Building2,
  CreditCard,
  Euro,
  Loader2,
  Users,
} from "lucide-react";
import { getAdminDashboard } from "../../services/adminDashboard";

const formatCurrency = (cents) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
};

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(new Date(value));
};

const STATUS_LABELS = {
  active: "Actif",
  trialing: "Essai",
  past_due: "Paiement en retard",
  canceled: "Annulé",
  incomplete: "Incomplet",
};

const STATUS_CLASSES = {
  active: "bg-emerald-50 text-emerald-700",
  trialing: "bg-blue-50 text-blue-700",
  past_due: "bg-amber-50 text-amber-700",
  canceled: "bg-slate-100 text-slate-600",
  incomplete: "bg-red-50 text-red-700",
};

function StatCard({ label, value, icon: Icon }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const data = await getAdminDashboard();

        if (mounted) {
          setDashboard(data);
          setError(null);
        }
      } catch (err) {
        console.error("Unable to load admin dashboard:", err);

        if (mounted) {
          const status = err.response?.status;

          if (status === 403) {
            setError(
              "Vous n'êtes pas autorisé à accéder au Control Center."
            );
          } else if (status === 401) {
            setError("Votre session a expiré. Veuillez vous reconnecter.");
          } else {
            setError(
              "Impossible de charger le Control Center. Veuillez réessayer."
            );
          }
        }
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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
            Chargement du Control Center...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Control Center
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const plans = dashboard?.plans ?? [];
  const organizations = dashboard?.recent_organizations ?? [];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        {/* HEADER */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            GreenPilot
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Control Center
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Vue globale de la plateforme GreenPilot, des organisations et des
            abonnements.
          </p>
        </header>

        {/* KPIs */}
        <section className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              label="Organisations"
              value={dashboard.organizations_count}
              icon={Building2}
            />

            <StatCard
              label="Utilisateurs"
              value={dashboard.users_count}
              icon={Users}
            />

            <StatCard
              label="Abonnements actifs"
              value={dashboard.active_subscriptions_count}
              icon={CreditCard}
            />

            <StatCard
              label="Essais en cours"
              value={dashboard.trialing_subscriptions_count}
              icon={CreditCard}
            />

            <StatCard
              label="MRR"
              value={formatCurrency(dashboard.mrr_cents)}
              icon={Euro}
            />
          </div>
        </section>

        {/* PLANS */}
        <section className="mt-10">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Abonnements par plan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Répartition des abonnements actifs entre les offres GreenPilot.
            </p>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-900">
                    {plan.name}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {plan.slug}
                  </span>
                </div>

                <p className="mt-6 text-3xl font-bold text-slate-900">
                  {plan.subscriptions_count}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  abonnement
                  {plan.subscriptions_count > 1 ? "s" : ""} actif
                  {plan.subscriptions_count > 1 ? "s" : ""}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* RECENT ORGANIZATIONS */}
        <section className="mt-10">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Organisations récentes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Les 10 dernières organisations créées sur GreenPilot.
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {organizations.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-slate-500">
                  Aucune organisation récente.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Organisation
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Plan
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Statut
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Créée le
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {organizations.map((organization) => {
                      const status = organization.subscription?.status;
                      const plan = organization.subscription?.plan;

                      return (
                        <tr key={organization.id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="text-sm font-medium text-slate-900">
                              {organization.name}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="text-sm text-slate-600">
                              {plan ?? "—"}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {status ? (
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  STATUS_CLASSES[status] ??
                                  "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {STATUS_LABELS[status] ?? status}
                              </span>
                            ) : (
                              <span className="text-sm text-slate-400">
                                —
                              </span>
                            )}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                            {formatDate(organization.created_at)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}