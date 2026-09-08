import { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Eye,
  FileText,
  Search,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { deleteJobReport, getJobReports } from "../../services/jobReports";

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(new Date(value));
};

const StatusBadge = ({ type, value }) => {
  let label = "Non";

  if (type === "generated") {
    label = value ? "Généré" : "Non généré";
  }

  if (type === "sent") {
    label = value ? "Envoyé" : "Non envoyé";
  }

  if (type === "signed") {
    label = value ? "Signé" : "Non signé";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        value
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
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
        console.error("Erreur lors du chargement des rapports :", err);

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
        report.summary?.toLowerCase().includes(normalizedSearch) ||
        job?.title?.toLowerCase().includes(normalizedSearch) ||
        customer?.name?.toLowerCase().includes(normalizedSearch) ||
        site?.name?.toLowerCase().includes(normalizedSearch);

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
      await deleteJobReport(id);

      setReports((currentReports) =>
        currentReports.filter((report) => report.id !== id)
      );
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);

      window.alert(
        err.response?.data?.message ||
          "Impossible de supprimer le rapport."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Rapports
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Consultez et gérez les rapports de vos chantiers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/reports/new")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <FileText className="h-4 w-4" />
          Nouveau rapport
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="relative lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <select
            value={generationFilter}
            onChange={(event) =>
              setGenerationFilter(event.target.value)
            }
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="all">Génération : Tous</option>
            <option value="generated">Générés</option>
            <option value="not_generated">Non générés</option>
          </select>

          <select
            value={sentFilter}
            onChange={(event) => setSentFilter(event.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="all">Signature : Tous</option>
            <option value="signed">Signés</option>
            <option value="unsigned">Non signés</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Chargement des rapports...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="mx-auto h-10 w-10 text-gray-300" />

              <h2 className="mt-4 text-base font-medium text-gray-900">
                Aucun rapport trouvé
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Aucun rapport ne correspond aux critères actuels.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Job
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Client
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Site
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Statuts
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredReports.map((report) => {
                    const job = report.job;
                    const customer = job?.customer;
                    const site = job?.site;

                    return (
                      <tr
                        key={report.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {job?.title || "Job sans titre"}
                          </div>

                          {report.summary && (
                            <div className="mt-1 max-w-xs truncate text-sm text-gray-500">
                              {report.summary}
                            </div>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                          {customer?.name || "—"}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-700">
                            {site?.name || "—"}
                          </div>

                          {site?.address && (
                            <div className="max-w-xs truncate text-xs text-gray-400">
                              {site.address}
                            </div>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {formatDate(report.created_at)}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            <StatusBadge
                              type="generated"
                              value={Boolean(report.generated_at)}
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

                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/reports/${report.id}`)
                              }
                              title="Voir"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
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
                              title="Modifier"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(report.id)}
                              title="Supprimer"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
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
    </div>
  );
};

export default ReportsPage;