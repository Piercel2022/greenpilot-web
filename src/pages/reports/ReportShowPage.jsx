import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Edit,
  FileText,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteJobReport,
  getJobReport,
} from "../../services/jobReports";

const formatDate = (value, withTime = false) => {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      ...(withTime ? { timeStyle: "short" } : {}),
    }).format(new Date(value));
  } catch {
    return "—";
  }
};

const StatusBadge = ({ label, active }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
      active
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-500"
    }`}
  >
    {label}
  </span>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </p>
    <p className="mt-1 text-sm text-gray-900">{value || "—"}</p>
  </div>
);

const ReportSection = ({ title, children }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-base font-semibold text-gray-900">{title}</h2>

    <div className="mt-4">
      {children}
    </div>
  </section>
);

const ReportText = ({ value }) => (
  <div className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
    {value || "Aucune information renseignée."}
  </div>
);

 function ReportShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobReport(id);
        setReport(data);
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Impossible de charger le rapport."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleDelete = async () => {
    if (!report) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce rapport ? Cette action est irréversible."
    );

    if (!confirmed) return;

    try {
      await deleteJobReport(report.id);
      navigate("/reports");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Impossible de supprimer le rapport."
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Chargement du rapport...
          </p>
        </div>
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate("/reports")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Retour aux rapports
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-base font-semibold text-red-800">
            Impossible de charger le rapport
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  const job = report.job;
  const customer = job?.customer;
  const site = job?.site;

  const isGenerated = Boolean(report.generated_at);
  const isSent = Boolean(report.sent_to_customer_at);
  const isSigned = Boolean(report.customer_signed_at);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/reports")}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={18} />
              Retour aux rapports
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <FileText size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Rapport d'intervention
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {job?.title || "Intervention sans titre"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/reports/${report.id}/edit`)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Edit size={17} />
              Modifier
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Trash2 size={17} />
              Supprimer
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Intervention summary */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Intervention
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                {job?.title || "—"}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {job?.status && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {job.status}
                  </span>
                )}

                <StatusBadge
                  label="Généré"
                  active={isGenerated}
                />

                <StatusBadge
                  label="Envoyé"
                  active={isSent}
                />

                <StatusBadge
                  label="Signé"
                  active={isSigned}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={17} />

              <span>
                {job?.scheduled_date
                  ? formatDate(job.scheduled_date)
                  : "Date non planifiée"}
              </span>
            </div>
          </div>
        </div>

        {/* Client / Site */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Client
            </h2>

            <div className="mt-4 space-y-4">
              <InfoItem
                label="Nom"
                value={customer?.name}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Site
            </h2>

            <div className="mt-4 space-y-4">
              <InfoItem
                label="Nom"
                value={site?.name}
              />

              <InfoItem
                label="Adresse"
                value={site?.address}
              />
            </div>
          </div>
        </div>

        {/* Report content */}
        <div className="space-y-6">
          <ReportSection title="Résumé">
            <ReportText value={report.summary} />
          </ReportSection>

          <ReportSection title="Travaux réalisés">
            <ReportText value={report.work_performed} />
          </ReportSection>

          <ReportSection title="Observations">
            <ReportText value={report.observations} />
          </ReportSection>

          <ReportSection title="Recommandations">
            <ReportText value={report.recommendations} />
          </ReportSection>
        </div>

        {/* Signature / status */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Signature client
            </h2>

            <div className="mt-4 space-y-4">
              <InfoItem
                label="Signature"
                value={report.customer_signature}
              />

              <InfoItem
                label="Date de signature"
                value={formatDate(
                  report.customer_signed_at,
                  true
                )}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Suivi du rapport
            </h2>

            <div className="mt-4 space-y-4">
              <InfoItem
                label="Généré le"
                value={formatDate(
                  report.generated_at,
                  true
                )}
              />

              <InfoItem
                label="Envoyé au client le"
                value={formatDate(
                  report.sent_to_customer_at,
                  true
                )}
              />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-sm font-semibold text-gray-900">
            Informations système
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <InfoItem
              label="Créé le"
              value={formatDate(report.created_at, true)}
            />

            <InfoItem
              label="Dernière modification"
              value={formatDate(report.updated_at, true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportShowPage;