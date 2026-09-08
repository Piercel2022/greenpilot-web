import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTeam,
  getTeam,
  updateTeam,
} from "../../services/teams";

const EMPTY_FORM = {
  name: "",
  code: "",
  description: "",
  color: "",
  active: true,
};

const normalizeTeam = (team) => ({
  name: team?.name || "",
  code: team?.code || "",
  description: team?.description || "",
  color: team?.color || "",
  active: team?.active !== false,
});

export default function TeamFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    let cancelled = false;

    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTeam(id);

        if (!cancelled) {
          setForm(normalizeTeam(data));
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load team:", err);

          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Impossible de charger cette équipe."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTeam();

    return () => {
      cancelled = true;
    };
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Le nom de l'équipe est obligatoire.";
    }

    if (!form.code.trim()) {
      errors.code = "Le code de l'équipe est obligatoire.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const teamData = {
        name: form.name.trim(),
        code: form.code.trim(),
        description: form.description.trim() || null,
        color: form.color || null,
        active: form.active,
      };

      if (isEditMode) {
        await updateTeam(id, teamData);
        navigate(`/teams/${id}`);
      } else {
        const createdTeam = await createTeam(teamData);
        navigate(`/teams/${createdTeam.id}`);
      }
    } catch (err) {
      console.error("Failed to save team:", err);

      const messages = err.response?.data?.messages;

      if (Array.isArray(messages) && messages.length > 0) {
        setError(messages.join(" "));
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Impossible d'enregistrer cette équipe."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={18} className="animate-spin" />
          Chargement de l'équipe...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() =>
            navigate(isEditMode ? `/teams/${id}` : "/teams")
          }
          className="mt-0.5 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          title="Retour"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {isEditMode ? "Modifier l'équipe" : "Nouvelle équipe"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {isEditMode
              ? "Modifiez les informations de cette équipe."
              : "Créez une équipe pour organiser vos collaborateurs terrain."}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-medium">Impossible d'enregistrer l'équipe</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white"
      >
        <div className="space-y-6 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Nom <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex. Équipe Alpha"
                className={`mt-2 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                  validationErrors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
                }`}
              />

              {validationErrors.name && (
                <p className="mt-1.5 text-xs text-red-600">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-slate-700"
              >
                Code <span className="text-red-500">*</span>
              </label>

              <input
                id="code"
                name="code"
                type="text"
                value={form.code}
                onChange={handleChange}
                placeholder="Ex. EQ-001"
                className={`mt-2 block w-full rounded-lg border px-3.5 py-2.5 font-mono text-sm text-slate-900 uppercase outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:ring-2 ${
                  validationErrors.code
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-slate-400 focus:ring-slate-100"
                }`}
              />

              {validationErrors.code && (
                <p className="mt-1.5 text-xs text-red-600">
                  {validationErrors.code}
                </p>
              )}

              <p className="mt-1.5 text-xs text-slate-400">
                Le code doit être unique dans votre organisation.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Décrivez le rôle ou la spécialité de cette équipe..."
              className="mt-2 block w-full resize-y rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-slate-700"
              >
                Couleur
              </label>

              <div className="mt-2 flex items-center gap-3">
                <input
                  id="color"
                  name="color"
                  type="color"
                  value={form.color || "#0f172a"}
                  onChange={handleChange}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                />

                <input
                  type="text"
                  value={form.color}
                  onChange={handleChange}
                  name="color"
                  placeholder="#0f172a"
                  className="block w-full rounded-lg border border-slate-200 px-3.5 py-2.5 font-mono text-sm text-slate-900 outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                Cette couleur pourra identifier l'équipe dans le Planning.
              </p>
            </div>

            <div className="flex items-center">
              <label
                htmlFor="active"
                className="flex cursor-pointer items-start gap-3"
              >
                <input
                  id="active"
                  name="active"
                  type="checkbox"
                  checked={form.active}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />

                <span>
                  <span className="block text-sm font-medium text-slate-700">
                    Équipe active
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    Une équipe inactive reste enregistrée mais peut être
                    masquée des opérations courantes.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate(isEditMode ? `/teams/${id}` : "/teams")
            }
            disabled={saving}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={17} />
                {isEditMode ? "Enregistrer les modifications" : "Créer l'équipe"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}