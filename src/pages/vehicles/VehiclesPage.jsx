import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  CarFront,
  Eye,
  Filter,
  Gauge,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { deleteVehicle, getVehicles } from "../../services/vehicles";

const STATUS_FILTERS = {
  all: "Tous",
  active: "Actifs",
  inactive: "Inactifs",
};

const getVehicleLabel = (vehicle) => {
  if (vehicle.brand && vehicle.model) {
    return `${vehicle.brand} ${vehicle.model}`;
  }

  return vehicle.brand || vehicle.model || "—";
};

const getVehicleTypeLabel = (vehicleType) => {
  if (!vehicleType) {
    return "—";
  }

  return vehicleType;
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getVehicles();
        setVehicles(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Impossible de charger les véhicules.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && vehicle.active) ||
        (statusFilter === "inactive" && !vehicle.active);

      if (!matchesStatus) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        vehicle.name,
        vehicle.registration_number,
        vehicle.vehicle_type,
        vehicle.brand,
        vehicle.model,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [vehicles, search, statusFilter]);

  const activeVehicles = vehicles.filter((vehicle) => vehicle.active).length;
  const inactiveVehicles = vehicles.length - activeVehicles;

  const handleDelete = async (vehicle) => {
    const confirmed = window.confirm(
      `Supprimer le véhicule « ${vehicle.name} » ? Cette action est irréversible.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(vehicle.id);
      setError("");

      await deleteVehicle(vehicle.id);

      setVehicles((currentVehicles) =>
        currentVehicles.filter(
          (currentVehicle) => currentVehicle.id !== vehicle.id,
        ),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Impossible de supprimer le véhicule.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <CarFront className="h-6 w-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Véhicules
              </h1>

              <span className="hidden rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700 sm:inline-flex">
                Parc
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Gérez les véhicules utilisés pour vos interventions.
            </p>
          </div>
        </div>

        <Link
          to="/vehicles/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Nouveau véhicule
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-medium">Une erreur est survenue</p>
            <p className="mt-1 text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Statistics */}
      {!loading && vehicles.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {vehicles.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <CarFront className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Actifs
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {activeVehicles}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Activity className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Inactifs
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {inactiveVehicles}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-slate-200 bg-slate-50/60 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un véhicule..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              >
                {Object.entries(STATUS_FILTERS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex min-h-80 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-cyan-600">
              <Gauge className="h-4 w-4 animate-pulse" />
              Chargement des véhicules...
            </div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
              <CarFront className="h-7 w-7" />
            </div>

            <h2 className="text-base font-semibold text-slate-900">
              Aucun véhicule trouvé
            </h2>

            <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
              {search || statusFilter !== "all"
                ? "Aucun véhicule ne correspond aux critères sélectionnés."
                : "Commencez par ajouter votre premier véhicule à votre parc."}
            </p>

            {!search && statusFilter === "all" && (
              <Link
                to="/vehicles/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                <Plus className="h-4 w-4" />
                Ajouter un véhicule
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Véhicule
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Immatriculation
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Modèle
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Statut
                  </th>

                  <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="group transition hover:bg-cyan-50/30"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-100">
                          <CarFront className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {vehicle.name}
                          </p>

                          {vehicle.year && (
                            <p className="mt-0.5 text-xs text-slate-500">
                              Année {vehicle.year}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                        {vehicle.registration_number || "—"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {getVehicleTypeLabel(vehicle.vehicle_type)}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-slate-700">
                          {getVehicleLabel(vehicle)}
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          vehicle.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            vehicle.active
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {vehicle.active ? "Actif" : "Inactif"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/vehicles/${vehicle.id}`}
                          title="Voir le véhicule"
                          aria-label="Voir le véhicule"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          to={`/vehicles/${vehicle.id}/edit`}
                          title="Modifier le véhicule"
                          aria-label="Modifier le véhicule"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          title="Supprimer le véhicule"
                          aria-label="Supprimer le véhicule"
                          onClick={() => handleDelete(vehicle)}
                          disabled={deletingId === vehicle.id}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && vehicles.length > 0 && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>
            {filteredVehicles.length} véhicule
            {filteredVehicles.length > 1 ? "s" : ""} affiché
            {filteredVehicles.length > 1 ? "s" : ""} sur {vehicles.length}.
          </p>

          {statusFilter !== "all" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700">
              <Filter className="h-3.5 w-3.5" />
              Filtre actif
            </span>
          )}
        </div>
      )}
    </div>
  );
}