
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
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
          purchase_price:
            data.purchase_price ?? "",
          status: data.status ?? "available",
          maintenance_interval_days:
            data.maintenance_interval_days ?? "",
          last_maintenance_at:
            data.last_maintenance_at
              ? data.last_maintenance_at.slice(0, 16)
              : "",
          next_maintenance_at:
            data.next_maintenance_at
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
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
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
        equipment_type:
          form.equipment_type.trim() || null,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        serial_number:
          form.serial_number.trim() || null,
        purchase_date:
          form.purchase_date || null,
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
        setError(
          Object.values(errors)
            .flat()
            .join(", ")
        );
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
        <p className="text-sm text-gray-500">
          Chargement de l'équipement...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/equipment")}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          title="Retour"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <Wrench size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode
              ? "Modifier l'équipement"
              : "Nouvel équipement"}
          </h1>

          <p className="text-sm text-gray-500">
            {isEditMode
              ? "Mettez à jour les informations de cet équipement."
              : "Ajoutez un équipement à votre parc matériel."}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Informations générales
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="equipment_type"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Type d'équipement
              </label>

              <input
                id="equipment_type"
                name="equipment_type"
                type="text"
                value={form.equipment_type}
                onChange={handleChange}
                placeholder="Ex. Tondeuse"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Statut
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
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

            <div>
              <label
                htmlFor="brand"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Marque
              </label>

              <input
                id="brand"
                name="brand"
                type="text"
                value={form.brand}
                onChange={handleChange}
                placeholder="Ex. Husqvarna"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="model"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Modèle
              </label>

              <input
                id="model"
                name="model"
                type="text"
                value={form.model}
                onChange={handleChange}
                placeholder="Ex. P 525D"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="serial_number"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Numéro de série
              </label>

              <input
                id="serial_number"
                name="serial_number"
                type="text"
                value={form.serial_number}
                onChange={handleChange}
                placeholder="Ex. SN-2026-001"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Achat
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="purchase_date"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Date d'achat
              </label>

              <input
                id="purchase_date"
                name="purchase_date"
                type="date"
                value={form.purchase_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="purchase_price"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  €
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Maintenance
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="maintenance_interval_days"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Intervalle de maintenance
              </label>

              <div className="relative">
                <input
                  id="maintenance_interval_days"
                  name="maintenance_interval_days"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    form.maintenance_interval_days
                  }
                  onChange={handleChange}
                  placeholder="Ex. 90"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-16 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  jours
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="last_maintenance_at"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Dernière maintenance
              </label>

              <input
                id="last_maintenance_at"
                name="last_maintenance_at"
                type="datetime-local"
                value={form.last_maintenance_at}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="next_maintenance_at"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Prochaine maintenance
              </label>

              <input
                id="next_maintenance_at"
                name="next_maintenance_at"
                type="datetime-local"
                value={form.next_maintenance_at}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Notes
          </h2>

          <div className="mt-5">
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Notes complémentaires
            </label>

            <textarea
              id="notes"
              name="notes"
              rows="5"
              value={form.notes}
              onChange={handleChange}
              placeholder="Informations complémentaires sur cet équipement..."
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              id="active"
              name="active"
              type="checkbox"
              checked={form.active}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />

            <span>
              <span className="block text-sm font-medium text-gray-900">
                Équipement actif
              </span>

              <span className="block text-xs text-gray-500">
                Cet équipement est actuellement utilisé
                dans l'organisation.
              </span>
            </span>
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/equipment")}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

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