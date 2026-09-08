
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  Pencil,
  Trash2,
} from "lucide-react";

import { deleteVehicle, getVehicle } from "../../services/vehicles";

const getValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return value;
};

export default function VehicleShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getVehicle(id);
        setVehicle(data);
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
  }, [id]);

  const handleDelete = async () => {
    if (!vehicle) {
      return;
    }

    const confirmed = window.confirm(
      `Supprimer le véhicule « ${vehicle.name} » ? Cette action est irréversible.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteVehicle(vehicle.id);

      navigate("/vehicles");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de supprimer le véhicule.",
      );
    } finally {
      setDeleting(false);
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

  if (!vehicle) {
    return (
      <div className="space-y-6">
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux véhicules
        </Link>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              {vehicle.name}
            </h1>

            <p className="text-sm text-slate-500">
              Détails du véhicule
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/vehicles/${vehicle.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {deleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Véhicule
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                {vehicle.name}
              </h2>
            </div>

            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                vehicle.active
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {vehicle.active ? "Actif" : "Inactif"}
            </span>
          </div>

          <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Immatriculation
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {getValue(vehicle.registration_number)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Type
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {getValue(vehicle.vehicle_type)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Marque
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {getValue(vehicle.brand)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Modèle
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {getValue(vehicle.model)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Année
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {getValue(vehicle.year)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Carburant
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {getValue(vehicle.fuel_type)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Caractéristiques
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Consommation
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {vehicle.fuel_consumption !== null &&
                vehicle.fuel_consumption !== undefined &&
                vehicle.fuel_consumption !== ""
                  ? `${vehicle.fuel_consumption} L/100 km`
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Capacité
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {getValue(vehicle.capacity)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Notes
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {getValue(vehicle.notes)}
        </p>
      </div>
    </div>
  );
}