import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CarFront,
  Eye,
  Pencil,
  Plus,
  Search,
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
        currentVehicles.filter((currentVehicle) => currentVehicle.id !== vehicle.id),
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CarFront className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Véhicules
              </h1>
              <p className="text-sm text-slate-500">
                Gérez les véhicules utilisés pour vos interventions.
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/vehicles/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Nouveau véhicule
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un véhicule..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            {Object.entries(STATUS_FILTERS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center px-6 py-16">
            <p className="text-sm text-slate-500">
              Chargement des véhicules...
            </p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <CarFront className="h-6 w-6" />
            </div>

            <h2 className="text-base font-semibold text-slate-900">
              Aucun véhicule trouvé
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              {search || statusFilter !== "all"
                ? "Aucun véhicule ne correspond aux critères sélectionnés."
                : "Commencez par ajouter votre premier véhicule."}
            </p>

            {!search && statusFilter === "all" && (
              <Link
                to="/vehicles/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Ajouter un véhicule
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Véhicule
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Immatriculation
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Modèle
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Statut
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <CarFront className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {vehicle.name}
                          </p>

                          {vehicle.year && (
                            <p className="text-xs text-slate-500">
                              {vehicle.year}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                      {vehicle.registration_number}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {getVehicleTypeLabel(vehicle.vehicle_type)}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {getVehicleLabel(vehicle)}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          vehicle.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {vehicle.active ? "Actif" : "Inactif"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/vehicles/${vehicle.id}`}
                          title="Voir"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          to={`/vehicles/${vehicle.id}/edit`}
                          title="Modifier"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          title="Supprimer"
                          onClick={() => handleDelete(vehicle)}
                          disabled={deletingId === vehicle.id}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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
        <p className="text-sm text-slate-500">
          {filteredVehicles.length} véhicule
          {filteredVehicles.length > 1 ? "s" : ""} affiché
          {filteredVehicles.length > 1 ? "s" : ""} sur {vehicles.length}.
        </p>
      )}
    </div>
  );
}