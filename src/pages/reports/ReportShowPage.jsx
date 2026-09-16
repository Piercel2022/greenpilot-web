
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Edit,
  FileCheck2,
  FileText,
  MailCheck,
  MapPin,
  Send,
  Trash2,
  UserRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteJobReport,
  downloadJobReportPdf,
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

const StatusBadge = ({ label, active, icon: Icon }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
      active
        ? "border-violet-200 bg-violet-50 text-violet-700"
        : "border-slate-200 bg-slate-50 text-slate-500"
    }`}
  >
    <Icon className="h-3.5 w-3.5" />
    {label}
  </span>
);

const InfoItem = ({ label, value, icon: Icon }) => (
  <div className="flex gap-3">
    {Icon && (
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
    )}

    <div className={Icon ? "min-w-0" : ""}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm text-slate-900">
        {value || "—"}
      </p>
    </div>
  </div>
);

const ReportSection = ({ title, icon: Icon, children }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
        <Icon className="h-4 w-4 text-violet-600" />
      </div>

      <h2 className="text-base font-semibold text-slate-900">
        {title}
      </h2>
    </div>

    <div className="mt-5">{children}</div>
  </section>
);

const ReportText = ({ value }) => (
  <div className="whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-sm leading-6 text-slate-700">
    {value || "Aucune information renseignée."}
  </div>
);

function ReportShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
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

  const handleDownloadPdf = async () => {
    if (!report || downloadingPdf) return;

    try {
      setDownloadingPdf(true);
      setError("");

      const blob = await downloadJobReportPdf(report.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `rapport-intervention-${report.id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Impossible de télécharger le rapport PDF."
      );
    } finally {
      setDownloadingPdf(false);
    }
  };

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
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
            <FileText className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-100" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex min-h-[260px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
                <FileText className="h-6 w-6 text-violet-600" />
              </div>

              <p className="text-sm font-medium text-slate-500">
                Chargement du rapport…
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/reports")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux rapports
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100">
              <FileText className="h-4 w-4 text-red-600" />
            </div>

            <div>
              <h1 className="text-base font-semibold text-red-800">
                Impossible de charger le rapport
              </h1>

              <p className="mt-2 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
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
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/reports")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux rapports
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50">
              <FileText className="h-5 w-5 text-violet-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Rapport d'intervention
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {job?.title || "Intervention sans titre"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download
              className={`h-4 w-4 ${downloadingPdf ? "animate-pulse" : ""}`}
            />
            {downloadingPdf ? "Téléchargement…" : "Télécharger le PDF"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/reports/${report.id}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <FileText className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-violet-600" />

              <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                Intervention
              </p>
            </div>

            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {job?.title || "—"}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {job?.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
                  <Clock3 className="h-3.5 w-3.5" />
                  {job.status}
                </span>
              )}

              <StatusBadge
                label="Généré"
                active={isGenerated}
                icon={FileCheck2}
              />

              <StatusBadge
                label="Envoyé"
                active={isSent}
                icon={Send}
              />

              <StatusBadge
                label="Signé"
                active={isSigned}
                icon={CheckCircle2}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
            <CalendarDays className="h-4 w-4 text-violet-500" />

            <span>
              {job?.scheduled_date
                ? formatDate(job.scheduled_date)
                : "Date non planifiée"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
              <UserRound className="h-4 w-4 text-sky-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Client
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Client associé à l'intervention
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <InfoItem
              label="Nom"
              value={customer?.name}
              icon={UserRound}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <MapPin className="h-4 w-4 text-emerald-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Site
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Lieu de réalisation de l'intervention
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <InfoItem
              label="Nom"
              value={site?.name}
              icon={MapPin}
            />

            <InfoItem
              label="Adresse"
              value={site?.address}
              icon={MapPin}
            />
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <ReportSection title="Résumé" icon={FileText}>
          <ReportText value={report.summary} />
        </ReportSection>

        <ReportSection
          title="Travaux réalisés"
          icon={CheckCircle2}
        >
          <ReportText value={report.work_performed} />
        </ReportSection>

        <ReportSection title="Observations" icon={FileText}>
          <ReportText value={report.observations} />
        </ReportSection>

        <ReportSection
          title="Recommandations"
          icon={FileCheck2}
        >
          <ReportText value={report.recommendations} />
        </ReportSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Signature client
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Validation du rapport par le client
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <InfoItem
              label="Signature"
              value={report.customer_signature}
              icon={CheckCircle2}
            />

            <InfoItem
              label="Date de signature"
              value={formatDate(report.customer_signed_at, true)}
              icon={CalendarDays}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
              <Send className="h-4 w-4 text-sky-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Suivi du rapport
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Historique de génération et d'envoi
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <InfoItem
              label="Généré le"
              value={formatDate(report.generated_at, true)}
              icon={FileCheck2}
            />

            <InfoItem
              label="Envoyé au client le"
              value={formatDate(report.sent_to_customer_at, true)}
              icon={MailCheck}
            />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
            <Clock3 className="h-4 w-4 text-slate-500" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Informations système
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Métadonnées du rapport
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <InfoItem
            label="Créé le"
            value={formatDate(report.created_at, true)}
            icon={CalendarDays}
          />

          <InfoItem
            label="Dernière modification"
            value={formatDate(report.updated_at, true)}
            icon={Clock3}
          />
        </div>
      </section>
    </div>
  );
}

export default ReportShowPage;
