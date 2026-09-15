import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Hash,
  Hammer,
  Package,
  Save,
  Tag,
  Wrench,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEquipment,
  getEquipmentItem,
  updateEquipment,
} from "../../services/equipment";

const STATUS_OPTIONS = [
  {
    value: "available",
    label: "Disponible",
  },
  {
    value: "in_use",
    label: "En utilisation",
  },
  {
    value: "maintenance",
    label: "En maintenance",
  },
  {
    value: "out_of_service",
    label: "Hors service",
  },
  {
    value: "retired",
    label: "Retiré",
  },
];

const INITIAL_FORM = {
  name: "",
  equipment_type: "",
  brand: "",
  model: "",
  serial_number: "",
  purchase_date: "",
  purchase_price: "",
  status: "available",
  maintenance_interval_days: "",
  last_maintenance_at: "",
  next_maintenance_at: "",
  notes: "",
  active: true,
};

const FIELD_CLASS =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-50";

const EquipmentFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    let cancelled = false;

    const fetchEquipment = async () => {
      try {
        const data = await getEquipmentItem(id);

        if (cancelled) return;

        setForm({
          name: data.name ?? "",
          equipment_type: data.equipment_type ?? "",
          brand: data.brand ?? "",
          model: data.model ?? "",
          serial_number: data.serial_number ?? "",
          purchase_date: data.purchase_date
            ? data.purchase_date.slice(0, 10)
            : "",
          purchase_price: data.purchase_price ?? "",
          status: data.status ?? "available",
          maintenance_interval_days:
            data.maintenance_interval_days ?? "",
          last_maintenance_at: data.last_maintenance_at
            ? data.last_maintenance_at.slice(0, 16)
            : "",
          next_maintenance_at: data.next_maintenance_at
            ? data.next_maintenance_at.slice(0, 16)
            : "",
          notes: data.notes ?? "",
          active: data.active ?? true,
        });
      } catch (err) {
        console.error(
          "Erreur lors du chargement de l'équipement :",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              "Impossible de charger cet équipement."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchEquipment();

    return () => {
      cancelled = true;
    };
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Le nom de l'équipement est obligatoire.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        equipment_type: form.equipment_type.trim() || null,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        serial_number: form.serial_number.trim() || null,
        purchase_date: form.purchase_date || null,
        purchase_price:
          form.purchase_price === ""
            ? null
            : Number(form.purchase_price),
        status: form.status,
        maintenance_interval_days:
          form.maintenance_interval_days === ""
            ? null
            : Number(form.maintenance_interval_days),
        last_maintenance_at:
          form.last_maintenance_at || null,
        next_maintenance_at:
          form.next_maintenance_at || null,
        notes: form.notes.trim() || null,
        active: form.active,
      };

      const equipment = isEditMode
        ? await updateEquipment(id, payload)
        : await createEquipment(payload);

      navigate(`/equipment/${equipment.id}`);
    } catch (err) {
      console.error(
        "Erreur lors de l'enregistrement de l'équipement :",
        err
      );

      const errors = err.response?.data?.errors;

      if (Array.isArray(errors)) {
        setError(errors.join(", "));
      } else if (typeof errors === "object" && errors) {
        setError(Object.values(errors).flat().join(", "));
      } else {
        setError(
          err.response?.data?.error ||
            "Impossible d'enregistrer l'équipement."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
            <Wrench className="h-6 w-6 text-amber-600" />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Chargement de l'équipement...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/equipment")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          title="Retour"
          aria-label="Retour aux équipements"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
          <Wrench className="h-5 w-5 text-amber-600" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEditMode
              ? "Modifier l'équipement"
              : "Nouvel équipement"}
          </h1>

          <p className="text-sm text-slate-500">
            {isEditMode
              ? "Mettez à jour les informations de cet équipement."
              : "Ajoutez un équipement à votre parc matériel."}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Package className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Informations générales
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Identifiez et décrivez l'équipement.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Package className="h-4 w-4 text-amber-600" />
                Nom *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ex. Tondeuse autoportée"
                className={FIELD_CLASS}
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="equipment_type"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Hammer className="h-4 w-4 text-amber-600" />
                Type d'équipement
              </label>

              <input
                id="equipment_type"
                name="equipment_type"
                type="text"
                value={form.equipment_type}
                onChange={handleChange}
                placeholder="Ex. Tondeuse"
                className={FIELD_CLASS}
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-amber-600" />
                Statut
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={FIELD_CLASS}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Tag className="h-4 w-4 text-amber-600" />
                Marque
              </label>

              <input
                id="brand"
                name="brand"
                type="text"
                value={form.brand}
                onChange={handleChange}
                placeholder="Ex. Husqvarna"
                className={FIELD_CLASS}
              />
            </div>

            {/* Model */}
            <div>
              <label
                htmlFor="model"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Wrench className="h-4 w-4 text-amber-600" />
                Modèle
              </label>

              <input
                id="model"
                name="model"
                type="text"
                value={form.model}
                onChange={handleChange}
                placeholder="Ex. P 525D"
                className={FIELD_CLASS}
              />
            </div>

            {/* Serial number */}
            <div>
              <label
                htmlFor="serial_number"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Hash className="h-4 w-4 text-amber-600" />
                Numéro de série
              </label>

              <input
                id="serial_number"
                name="serial_number"
                type="text"
                value={form.serial_number}
                onChange={handleChange}
                placeholder="Ex. SN-2026-001"
                className={FIELD_CLASS}
              />
            </div>
          </div>
        </section>

        {/* Purchase */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <CircleDollarSign className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Achat
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Informations liées à l'acquisition du matériel.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* Purchase date */}
            <div>
              <label
                htmlFor="purchase_date"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CalendarDays className="h-4 w-4 text-amber-600" />
                Date d'achat
              </label>

              <input
                id="purchase_date"
                name="purchase_date"
                type="date"
                value={form.purchase_date}
                onChange={handleChange}
                className={FIELD_CLASS}
              />
            </div>

            {/* Purchase price */}
            <div>
              <label
                htmlFor="purchase_price"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CircleDollarSign className="h-4 w-4 text-amber-600" />
                Prix d'achat
              </label>

              <div className="relative">
                <input
                  id="purchase_price"
                  name="purchase_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.purchase_price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`${FIELD_CLASS} pr-12`}
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  €
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Wrench className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Maintenance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Planifiez et suivez les opérations de maintenance.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* Maintenance interval */}
            <div>
              <label
                htmlFor="maintenance_interval_days"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CalendarClock className="h-4 w-4 text-amber-600" />
                Intervalle de maintenance
              </label>

              <div className="relative">
                <input
                  id="maintenance_interval_days"
                  name="maintenance_interval_days"
                  type="number"
                  min="0"
                  step="1"
                  value={form.maintenance_interval_days}
                  onChange={handleChange}
                  placeholder="Ex. 90"
                  className={`${FIELD_CLASS} pr-16`}
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  jours
                </span>
              </div>
            </div>

            {/* Last maintenance */}
            <div>
              <label
                htmlFor="last_maintenance_at"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CalendarClock className="h-4 w-4 text-amber-600" />
                Dernière maintenance
              </label>

              <input
                id="last_maintenance_at"
                name="last_maintenance_at"
                type="datetime-local"
                value={form.last_maintenance_at}
                onChange={handleChange}
                className={FIELD_CLASS}
              />
            </div>

            {/* Next maintenance */}
            <div>
              <label
                htmlFor="next_maintenance_at"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <CalendarClock className="h-4 w-4 text-amber-600" />
                Prochaine maintenance
              </label>

              <input
                id="next_maintenance_at"
                name="next_maintenance_at"
                type="datetime-local"
                value={form.next_maintenance_at}
                onChange={handleChange}
                className={FIELD_CLASS}
              />
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <FileText className="h-5 w-5 text-slate-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Notes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ajoutez des informations complémentaires.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="notes"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <FileText className="h-4 w-4 text-slate-500" />
              Notes complémentaires
            </label>

            <textarea
              id="notes"
              name="notes"
              rows="5"
              value={form.notes}
              onChange={handleChange}
              placeholder="Informations complémentaires sur cet équipement..."
              className={`${FIELD_CLASS} resize-y`}
            />
          </div>
        </section>

        {/* Active status */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id="active"
              name="active"
              type="checkbox"
              checked={form.active}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />

            <span>
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Équipement actif
              </span>

              <span className="mt-1 block text-xs leading-5 text-slate-500">
                Cet équipement est actuellement utilisé dans
                l'organisation.
              </span>
            </span>
          </label>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/equipment")}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {saving
              ? "Enregistrement..."
              : isEditMode
                ? "Enregistrer les modifications"
                : "Créer l'équipement"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentFormPage;