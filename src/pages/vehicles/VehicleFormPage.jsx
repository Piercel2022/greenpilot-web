
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CarFront, Save } from "lucide-react";

import {
  createVehicle,
  getVehicle,
  updateVehicle,
} from "../../services/vehicles";

const INITIAL_FORM = {
  name: "",
  registration_number: "",
  vehicle_type: "",
  brand: "",
  model: "",
  year: "",
  fuel_type: "",
  fuel_consumption: "",
  capacity: "",
  active: true,
  notes: "",
};

export default function VehicleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadVehicle = async () => {
      try {
        setLoading(true);
        setError("");

        const vehicle = await getVehicle(id);

        setForm({
          name: vehicle.name || "",
          registration_number: vehicle.registration_number || "",
          vehicle_type: vehicle.vehicle_type || "",
          brand: vehicle.brand || "",
          model: vehicle.model || "",
          year: vehicle.year ?? "",
          fuel_type: vehicle.fuel_type || "",
          fuel_consumption: vehicle.fuel_consumption ?? "",
          capacity: vehicle.capacity ?? "",
          active: vehicle.active ?? true,
          notes: vehicle.notes || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Impossible de charger le véhicule.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        year: form.year === "" ? null : Number(form.year),
        fuel_consumption:
          form.fuel_consumption === ""
            ? null
            : Number(form.fuel_consumption),
        capacity: form.capacity === "" ? null : Number(form.capacity),
      };

      const vehicle = isEditMode
        ? await updateVehicle(id, payload)
        : await createVehicle(payload);

      navigate(`/vehicles/${vehicle.id}`);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;

      if (Array.isArray(apiErrors)) {
        setError(apiErrors.join(", "));
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Impossible d'enregistrer le véhicule.",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 py-16">
        <p className="text-sm text-slate-500">
          Chargement du véhicule...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/vehicles"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          title="Retour aux véhicules"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <CarFront className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {isEditMode ? "Modifier le véhicule" : "Nouveau véhicule"}
          </h1>

          <p className="text-sm text-slate-500">
            {isEditMode
              ? "Modifiez les informations de ce véhicule."
              : "Ajoutez un véhicule à votre flotte."}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="space-y-8 p-6">
          <section>
            <h2 className="text-base font-semibold text-slate-900">
              Informations générales
            </h2>

            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Nom du véhicule *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ex. Utilitaire équipe Nord"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="registration_number"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Immatriculation *
                </label>

                <input
                  id="registration_number"
                  name="registration_number"
                  type="text"
                  value={form.registration_number}
                  onChange={handleChange}
                  required
                  placeholder="Ex. AB-123-CD"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="vehicle_type"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Type de véhicule
                </label>

                <input
                  id="vehicle_type"
                  name="vehicle_type"
                  type="text"
                  value={form.vehicle_type}
                  onChange={handleChange}
                  placeholder="Ex. Fourgon, camion, utilitaire..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Marque
                </label>

                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Ex. Renault"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Modèle
                </label>

                <input
                  id="model"
                  name="model"
                  type="text"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="Ex. Kangoo"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Année
                </label>

                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="Ex. 2024"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-base font-semibold text-slate-900">
              Caractéristiques
            </h2>

            <div className="mt-4 grid gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="fuel_type"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Carburant
                </label>

                <input
                  id="fuel_type"
                  name="fuel_type"
                  type="text"
                  value={form.fuel_type}
                  onChange={handleChange}
                  placeholder="Ex. Diesel"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="fuel_consumption"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Consommation
                </label>

                <input
                  id="fuel_consumption"
                  name="fuel_consumption"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.fuel_consumption}
                  onChange={handleChange}
                  placeholder="L/100 km"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="capacity"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Capacité
                </label>

                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="Ex. 3.5"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-base font-semibold text-slate-900">
              Statut et notes
            </h2>

            <div className="mt-4 space-y-5">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />

                <span>
                  <span className="block text-sm font-medium text-slate-700">
                    Véhicule actif
                  </span>

                  <span className="block text-xs text-slate-500">
                    Un véhicule inactif reste enregistré mais n'est plus
                    considéré comme disponible.
                  </span>
                </span>
              </label>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Informations complémentaires..."
                  className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
          <Link
            to="/vehicles"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Annuler
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />

            {saving
              ? "Enregistrement..."
              : isEditMode
                ? "Enregistrer les modifications"
                : "Créer le véhicule"}
          </button>
        </div>
      </form>
    </div>
  );
}