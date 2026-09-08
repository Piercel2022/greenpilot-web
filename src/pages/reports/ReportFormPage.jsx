import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
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
          customer_signature: data.customer_signature || "",
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
          ? new Date(form.sent_to_customer_at).toISOString()
          : null,
        customer_signature:
          form.customer_signature.trim() || null,
        customer_signed_at: form.customer_signed_at
          ? new Date(form.customer_signed_at).toISOString()
          : null,
      };

      let savedReport;

      if (isEditMode) {
        savedReport = await updateJobReport(id, reportData);
      } else {
        savedReport = await createJobReport(reportData);
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
      <div className="p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Chargement du rapport...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
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
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            {isEditMode
              ? "Retour au rapport"
              : "Retour aux rapports"}
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode
              ? "Modifier le rapport"
              : "Nouveau rapport"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {isEditMode
              ? "Modifiez les informations du rapport d'intervention."
              : "Créez un nouveau rapport d'intervention."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Intervention */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Intervention
            </h2>

            <div className="mt-4">
              <label
                htmlFor="job_id"
                className="block text-sm font-medium text-gray-700"
              >
                ID de l'intervention
              </label>

              <input
                id="job_id"
                name="job_id"
                type="text"
                value={form.job_id}
                onChange={handleChange}
                disabled={isEditMode}
                required
                placeholder="UUID de l'intervention"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500"
              />

              <p className="mt-1 text-xs text-gray-500">
                {isEditMode
                  ? "L'intervention ne peut pas être modifiée depuis ce formulaire."
                  : "Saisissez l'UUID d'une intervention existante de votre organisation."}
              </p>
            </div>
          </section>

          {/* Report content */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Contenu du rapport
            </h2>

            <div className="mt-4 space-y-5">
              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Résumé
                </label>

                <textarea
                  id="summary"
                  name="summary"
                  rows={4}
                  value={form.summary}
                  onChange={handleChange}
                  placeholder="Résumé de l'intervention..."
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="work_performed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Travaux réalisés
                </label>

                <textarea
                  id="work_performed"
                  name="work_performed"
                  rows={5}
                  value={form.work_performed}
                  onChange={handleChange}
                  placeholder="Décrivez les travaux réalisés..."
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="observations"
                  className="block text-sm font-medium text-gray-700"
                >
                  Observations
                </label>

                <textarea
                  id="observations"
                  name="observations"
                  rows={5}
                  value={form.observations}
                  onChange={handleChange}
                  placeholder="Observations effectuées sur le terrain..."
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="recommendations"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recommandations
                </label>

                <textarea
                  id="recommendations"
                  name="recommendations"
                  rows={5}
                  value={form.recommendations}
                  onChange={handleChange}
                  placeholder="Recommandations pour le client..."
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </section>

          {/* Status */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">
              Suivi du rapport
            </h2>

            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="generated_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Généré le
                </label>

                <input
                  id="generated_at"
                  name="generated_at"
                  type="datetime-local"
                  value={form.generated_at}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="sent_to_customer_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Envoyé au client le
                </label>

                <input
                  id="sent_to_customer_at"
                  name="sent_to_customer_at"
                  type="datetime-local"
                  value={form.sent_to_customer_at}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="customer_signature"
                  className="block text-sm font-medium text-gray-700"
                >
                  Signature client
                </label>

                <input
                  id="customer_signature"
                  name="customer_signature"
                  type="text"
                  value={form.customer_signature}
                  onChange={handleChange}
                  placeholder="Nom ou signature du client"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="customer_signed_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Signé le
                </label>

                <input
                  id="customer_signed_at"
                  name="customer_signed_at"
                  type="datetime-local"
                  value={form.customer_signed_at}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(
                  isEditMode && report
                    ? `/reports/${report.id}`
                    : "/reports"
                )
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {saving
                ? "Enregistrement..."
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