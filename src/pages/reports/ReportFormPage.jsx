
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  FileText,
  Info,
  MailCheck,
  Save,
  Send,
  UserRoundCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createJobReport,
  getJobReport,
  updateJobReport,
} from "../../services/jobReports";

const INITIAL_FORM = {
  job_id: "",
  summary: "",
  work_performed: "",
  observations: "",
  recommendations: "",
  generated_at: "",
  sent_to_customer_at: "",
  customer_signature: "",
  customer_signed_at: "",
};

const toDateTimeLocal = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};

const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
      <Icon className="h-4 w-4 text-violet-600" />
    </div>

    <div>
      <h2 className="text-base font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>
      )}
    </div>
  </div>
);

const FieldLabel = ({ htmlFor, children, icon: Icon }) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
  >
    {Icon && (
      <Icon className="h-4 w-4 text-slate-400" />
    )}

    {children}
  </label>
);

const textareaClassName =
  "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-50";

const inputClassName =
  "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

function ReportFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobReport(id);

        setReport(data);

        setForm({
          job_id: data.job_id || "",
          summary: data.summary || "",
          work_performed: data.work_performed || "",
          observations: data.observations || "",
          recommendations: data.recommendations || "",
          generated_at: toDateTimeLocal(data.generated_at),
          sent_to_customer_at: toDateTimeLocal(
            data.sent_to_customer_at
          ),
          customer_signature:
            data.customer_signature || "",
          customer_signed_at: toDateTimeLocal(
            data.customer_signed_at
          ),
        });
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
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!form.job_id.trim()) {
      setError("L'intervention est obligatoire.");
      return;
    }

    try {
      setSaving(true);

      const reportData = {
        job_id: form.job_id.trim(),
        summary: form.summary.trim() || null,
        work_performed: form.work_performed.trim() || null,
        observations: form.observations.trim() || null,
        recommendations: form.recommendations.trim() || null,
        generated_at: form.generated_at
          ? new Date(form.generated_at).toISOString()
          : null,
        sent_to_customer_at: form.sent_to_customer_at
          ? new Date(
              form.sent_to_customer_at
            ).toISOString()
          : null,
        customer_signature:
          form.customer_signature.trim() || null,
        customer_signed_at: form.customer_signed_at
          ? new Date(
              form.customer_signed_at
            ).toISOString()
          : null,
      };

      let savedReport;

      if (isEditMode) {
        savedReport = await updateJobReport(
          id,
          reportData
        );
      } else {
        savedReport = await createJobReport(
          reportData
        );
      }

      navigate(`/reports/${savedReport.id}`);
    } catch (err) {
      console.error(err);

      const messages = err?.response?.data?.messages;

      setError(
        Array.isArray(messages)
          ? messages.join(" ")
          : err?.response?.data?.message ||
              err?.response?.data?.error ||
              "Impossible d'enregistrer le rapport."
      );
    } finally {
      setSaving(false);
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
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-100" />
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

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              navigate(
                isEditMode && report
                  ? `/reports/${report.id}`
                  : "/reports"
              )
            }
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />

            {isEditMode
              ? "Retour au rapport"
              : "Retour aux rapports"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50">
              <FileText className="h-5 w-5 text-violet-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {isEditMode
                  ? "Modifier le rapport"
                  : "Nouveau rapport"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {isEditMode
                  ? "Modifiez les informations du rapport d'intervention."
                  : "Créez un nouveau rapport d'intervention."}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Intervention */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={FileCheck2}
              title="Intervention"
              description="Associez le rapport à une intervention existante."
            />

            <div className="mt-5">
              <FieldLabel
                htmlFor="job_id"
                icon={FileText}
              >
                ID de l'intervention
              </FieldLabel>

              <input
                id="job_id"
                name="job_id"
                type="text"
                value={form.job_id}
                onChange={handleChange}
                disabled={isEditMode}
                required
                placeholder="UUID de l'intervention"
                className={inputClassName}
              />

              <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                <p className="text-xs leading-5 text-slate-500">
                  {isEditMode
                    ? "L'intervention ne peut pas être modifiée depuis ce formulaire."
                    : "Saisissez l'UUID d'une intervention existante de votre organisation."}
                </p>
              </div>
            </div>
          </section>

          {/* Report content */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={FileText}
              title="Contenu du rapport"
              description="Documentez précisément l'intervention réalisée sur le terrain."
            />

            <div className="mt-5 space-y-5">
              <div>
                <FieldLabel
                  htmlFor="summary"
                  icon={FileText}
                >
                  Résumé
                </FieldLabel>

                <textarea
                  id="summary"
                  name="summary"
                  rows={4}
                  value={form.summary}
                  onChange={handleChange}
                  placeholder="Résumé de l'intervention..."
                  className={textareaClassName}
                />
              </div>

              <div>
                <FieldLabel
                  htmlFor="work_performed"
                  icon={CheckCircle2}
                >
                  Travaux réalisés
                </FieldLabel>

                <textarea
                  id="work_performed"
                  name="work_performed"
                  rows={5}
                  value={form.work_performed}
                  onChange={handleChange}
                  placeholder="Décrivez les travaux réalisés..."
                  className={textareaClassName}
                />
              </div>

              <div>
                <FieldLabel
                  htmlFor="observations"
                  icon={FileText}
                >
                  Observations
                </FieldLabel>

                <textarea
                  id="observations"
                  name="observations"
                  rows={5}
                  value={form.observations}
                  onChange={handleChange}
                  placeholder="Observations effectuées sur le terrain..."
                  className={textareaClassName}
                />
              </div>

              <div>
                <FieldLabel
                  htmlFor="recommendations"
                  icon={FileCheck2}
                >
                  Recommandations
                </FieldLabel>

                <textarea
                  id="recommendations"
                  name="recommendations"
                  rows={5}
                  value={form.recommendations}
                  onChange={handleChange}
                  placeholder="Recommandations pour le client..."
                  className={textareaClassName}
                />
              </div>
            </div>
          </section>

          {/* Status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={Send}
              title="Suivi du rapport"
              description="Suivez la génération, l'envoi et la signature du rapport."
            />

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <FieldLabel
                  htmlFor="generated_at"
                  icon={FileCheck2}
                >
                  Généré le
                </FieldLabel>

                <input
                  id="generated_at"
                  name="generated_at"
                  type="datetime-local"
                  value={form.generated_at}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div>
                <FieldLabel
                  htmlFor="sent_to_customer_at"
                  icon={MailCheck}
                >
                  Envoyé au client le
                </FieldLabel>

                <input
                  id="sent_to_customer_at"
                  name="sent_to_customer_at"
                  type="datetime-local"
                  value={form.sent_to_customer_at}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div>
                <FieldLabel
                  htmlFor="customer_signature"
                  icon={UserRoundCheck}
                >
                  Signature client
                </FieldLabel>

                <input
                  id="customer_signature"
                  name="customer_signature"
                  type="text"
                  value={form.customer_signature}
                  onChange={handleChange}
                  placeholder="Nom ou signature du client"
                  className={inputClassName}
                />
              </div>

              <div>
                <FieldLabel
                  htmlFor="customer_signed_at"
                  icon={CalendarClock}
                >
                  Signé le
                </FieldLabel>

                <input
                  id="customer_signed_at"
                  name="customer_signed_at"
                  type="datetime-local"
                  value={form.customer_signed_at}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() =>
                navigate(
                  isEditMode && report
                    ? `/reports/${report.id}`
                    : "/reports"
                )
              }
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />

              {saving
                ? "Enregistrement…"
                : isEditMode
                  ? "Enregistrer les modifications"
                  : "Créer le rapport"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportFormPage;