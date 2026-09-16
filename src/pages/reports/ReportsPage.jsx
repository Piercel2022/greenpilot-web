
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Edit,
  Eye,
  FileCheck2,
  FileText,
  MapPin,
  Plus,
  Search,
  Send,
  Trash2,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {
  deleteJobReport,
  getJobReports,
} from "../../services/jobReports";

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(new Date(value));
};

const StatusBadge = ({ type, value }) => {
  const config = {
    generated: {
      label: value ? "Généré" : "Non généré",
      icon: FileCheck2,
      activeClass:
        "border-violet-200 bg-violet-50 text-violet-700",
      inactiveClass:
        "border-slate-200 bg-slate-50 text-slate-500",
    },
    sent: {
      label: value ? "Envoyé" : "Non envoyé",
      icon: Send,
      activeClass:
        "border-sky-200 bg-sky-50 text-sky-700",
      inactiveClass:
        "border-slate-200 bg-slate-50 text-slate-500",
    },
    signed: {
      label: value ? "Signé" : "Non signé",
      icon: CheckCircle2,
      activeClass:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      inactiveClass:
        "border-slate-200 bg-slate-50 text-slate-500",
    },
  };

  const current = config[type] || config.generated;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        value
          ? current.activeClass
          : current.inactiveClass
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {current.label}
    </span>
  );
};

const ReportsPage = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [generationFilter, setGenerationFilter] = useState("all");
  const [sentFilter, setSentFilter] = useState("all");
  const [signedFilter, setSignedFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobReports();

        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(
          "Erreur lors du chargement des rapports :",
          err
        );

        setError(
          err.response?.data?.message ||
            "Impossible de charger les rapports."
        );
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return reports.filter((report) => {
      const job = report.job;
      const customer = job?.customer;
      const site = job?.site;

      const matchesSearch =
        !normalizedSearch ||
        report.summary
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        job?.title
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        customer?.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        site?.name
          ?.toLowerCase()
          .includes(normalizedSearch);

      const generated = Boolean(report.generated_at);
      const sent = Boolean(report.sent_to_customer_at);
      const signed = Boolean(report.customer_signed_at);

      const matchesGeneration =
        generationFilter === "all" ||
        (generationFilter === "generated" && generated) ||
        (generationFilter === "not_generated" && !generated);

      const matchesSent =
        sentFilter === "all" ||
        (sentFilter === "sent" && sent) ||
        (sentFilter === "not_sent" && !sent);

      const matchesSigned =
        signedFilter === "all" ||
        (signedFilter === "signed" && signed) ||
        (signedFilter === "unsigned" && !signed);

      return (
        matchesSearch &&
        matchesGeneration &&
        matchesSent &&
        matchesSigned
      );
    });
  }, [
    reports,
    search,
    generationFilter,
    sentFilter,
    signedFilter,
  ]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce rapport ?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteJobReport(id);

      setReports((currentReports) =>
        currentReports.filter((report) => report.id !== id)
      );
    } catch (err) {
      console.error(
        "Erreur lors de la suppression :",
        err
      );

      setError(
        err.response?.data?.message ||
          "Impossible de supprimer le rapport."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
            <FileText className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Rapports
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Consultez et gérez les rapports de vos chantiers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/reports/new")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" />
          Nouveau rapport
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <FileText className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="relative lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un rapport..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
            />
          </div>

          <select
            value={generationFilter}
            onChange={(event) =>
              setGenerationFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
          >
            <option value="all">Génération : Tous</option>
            <option value="generated">Générés</option>
            <option value="not_generated">
              Non générés
            </option>
          </select>

          <select
            value={sentFilter}
            onChange={(event) =>
              setSentFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
          >
            <option value="all">Envoi : Tous</option>
            <option value="sent">Envoyés</option>
            <option value="not_sent">Non envoyés</option>
          </select>

          <select
            value={signedFilter}
            onChange={(event) =>
              setSignedFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50"
          >
            <option value="all">Signature : Tous</option>
            <option value="signed">Signés</option>
            <option value="unsigned">Non signés</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
              <FileText className="h-6 w-6 text-violet-600" />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Chargement des rapports…
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filteredReports.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                <FileText className="h-7 w-7 text-violet-500" />
              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-900">
                Aucun rapport trouvé
              </h2>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Aucun rapport ne correspond aux critères actuels.
              </p>

              <button
                type="button"
                onClick={() => navigate("/reports/new")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                <Plus className="h-4 w-4" />
                Nouveau rapport
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Job
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Client
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Site
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Statuts
                    </th>

                    <th className="sticky right-0 z-20 bg-slate-50 px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-[-8px_0_12px_-12px_rgba(15,23,42,0.35)]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredReports.map((report) => {
                    const job = report.job;
                    const customer = job?.customer;
                    const site = job?.site;

                    return (
                      <tr
                        key={report.id}
                        className="group transition hover:bg-violet-50/30"
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                              <FileText className="h-4 w-4 text-violet-600" />
                            </div>

                            <div>
                              <div className="font-semibold text-slate-900">
                                {job?.title || "Job sans titre"}
                              </div>

                              {report.summary && (
                                <div className="mt-1 max-w-xs truncate text-sm text-slate-500">
                                  {report.summary}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <UserRound className="h-4 w-4 text-slate-400" />
                            {customer?.name || "—"}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <div>
                              <div>
                                {site?.name || "—"}
                              </div>

                              {site?.address && (
                                <div className="mt-0.5 max-w-xs truncate text-xs text-slate-400">
                                  {site.address}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays className="h-4 w-4 text-slate-400" />
                            {formatDate(report.created_at)}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            <StatusBadge
                              type="generated"
                              value={Boolean(
                                report.generated_at
                              )}
                            />

                            <StatusBadge
                              type="sent"
                              value={Boolean(
                                report.sent_to_customer_at
                              )}
                            />

                            <StatusBadge
                              type="signed"
                              value={Boolean(
                                report.customer_signed_at
                              )}
                            />
                          </div>
                        </td>

                        <td className="sticky right-0 z-10 whitespace-nowrap bg-white px-5 py-4 text-right shadow-[-8px_0_12px_-12px_rgba(15,23,42,0.35)] group-hover:bg-violet-50/30">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/reports/${report.id}`
                                )
                              }
                              title="Voir le rapport"
                              aria-label="Voir le rapport"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-sky-50 hover:text-sky-600"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/reports/${report.id}/edit`
                                )
                              }
                              title="Modifier le rapport"
                              aria-label="Modifier le rapport"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-violet-50 hover:text-violet-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(report.id)
                              }
                              title="Supprimer le rapport"
                              aria-label="Supprimer le rapport"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!loading && !error && filteredReports.length > 0 && (
        <p className="text-sm text-slate-500">
          {filteredReports.length} rapport
          {filteredReports.length > 1 ? "s" : ""} affiché
          {filteredReports.length > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
};

export default ReportsPage;