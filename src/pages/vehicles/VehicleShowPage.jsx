import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  CheckCircle2,
  CircleGauge,
  Fuel,
  Gauge,
  Pencil,
  Ruler,
  Tag,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";

import { deleteVehicle, getVehicle } from "../../services/vehicles";

const getValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return value;
};

function InfoItem({ icon: Icon, label, value, iconClassName = "text-cyan-600" }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-cyan-100 hover:bg-cyan-50/30">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/70 ${iconClassName}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-medium text-slate-800">
            {getValue(value)}
          </p>
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex min-h-[320px] items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <CarFront className="h-5 w-5 animate-pulse" />
          </div>

          <p className="text-sm text-slate-500">
            Chargement du véhicule...
          </p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-cyan-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux véhicules
        </Link>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/vehicles"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
            title="Retour aux véhicules"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
            <CarFront className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {vehicle.name}
              </h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  vehicle.active
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                }`}
              >
                {vehicle.active ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <XCircle className="h-3.5 w-3.5" />
                )}

                {vehicle.active ? "Actif" : "Inactif"}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Détails et caractéristiques du véhicule
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/vehicles/${vehicle.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {deleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main information */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Truck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">
                  Véhicule
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {vehicle.name}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoItem
              icon={Tag}
              label="Immatriculation"
              value={vehicle.registration_number}
            />

            <InfoItem
              icon={Truck}
              label="Type"
              value={vehicle.vehicle_type}
            />

            <InfoItem
              icon={CarFront}
              label="Marque"
              value={vehicle.brand}
            />

            <InfoItem
              icon={Tag}
              label="Modèle"
              value={vehicle.model}
            />

            <InfoItem
              icon={CalendarDays}
              label="Année"
              value={vehicle.year}
            />

            <InfoItem
              icon={Fuel}
              label="Carburant"
              value={vehicle.fuel_type}
            />
          </div>
        </div>

        {/* Characteristics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Gauge className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">
                Caractéristiques
              </p>

              <h2 className="mt-1 text-base font-semibold text-slate-900">
                Données techniques
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-cyan-600 shadow-sm ring-1 ring-slate-200/70">
                  <CircleGauge className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Consommation
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {vehicle.fuel_consumption !== null &&
                    vehicle.fuel_consumption !== undefined &&
                    vehicle.fuel_consumption !== ""
                      ? `${vehicle.fuel_consumption} L/100 km`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-cyan-600 shadow-sm ring-1 ring-slate-200/70">
                  <Ruler className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Capacité
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {getValue(vehicle.capacity)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
            <Pencil className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">
              Informations complémentaires
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-900">
              Notes
            </h2>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-4">
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {getValue(vehicle.notes)}
          </p>
        </div>
      </div>
    </div>
  );
}