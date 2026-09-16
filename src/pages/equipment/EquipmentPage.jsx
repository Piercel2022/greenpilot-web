import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Edit,
  Eye,
  Hammer,
  Package,
  Plus,
  Search,
  Trash2,
  Wrench,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteEquipment,
  getEquipment,
} from "../../services/equipment";

const EquipmentPage = () => {
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    const fetchEquipment = async () => {
      try {
        const data = await getEquipment();

        if (!cancelled) {
          setEquipment(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(
          "Erreur lors du chargement des équipements :",
          err,
        );

        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              "Impossible de charger les équipements.",
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
  }, []);

  const filteredEquipment = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return equipment.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.name?.toLowerCase().includes(normalizedSearch) ||
        item.equipment_type
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        item.brand?.toLowerCase().includes(normalizedSearch) ||
        item.model?.toLowerCase().includes(normalizedSearch) ||
        item.serial_number
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && item.active) ||
        (statusFilter === "inactive" && !item.active);

      return matchesSearch && matchesStatus;
    });
  }, [equipment, search, statusFilter]);

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'équipement « ${item.name} » ?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEquipment(item.id);

      setEquipment((current) =>
        current.filter(
          (equipmentItem) => equipmentItem.id !== item.id,
        ),
      );
    } catch (err) {
      console.error(
        "Erreur lors de la suppression :",
        err,
      );

      setError(
        err.response?.data?.error ||
          "Impossible de supprimer cet équipement.",
      );
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Intl.DateTimeFormat("fr-FR").format(
      new Date(date),
    );
  };

  const getStatusLabel = (status) => {
    if (!status) {
      return "—";
    }

    return status
      .toString()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const activeCount = equipment.filter(
    (item) => item.active,
  ).length;

  const inactiveCount = equipment.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
            <Wrench className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Équipements
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gérez votre matériel et suivez sa maintenance.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/equipment/new")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700"
        >
          <Plus className="h-4 w-4" />
          Ajouter un équipement
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Package className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total
              </p>

              <p className="mt-0.5 text-2xl font-semibold text-slate-900">
                {equipment.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Actifs
              </p>

              <p className="mt-0.5 text-2xl font-semibold text-slate-900">
                {activeCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <XCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Inactifs
              </p>

              <p className="mt-0.5 text-2xl font-semibold text-slate-900">
                {inactiveCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Rechercher par nom, type, marque, modèle ou numéro de série..."
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          >
            <option value="all">
              Tous les équipements
            </option>

            <option value="active">
              Actifs
            </option>

            <option value="inactive">
              Inactifs
            </option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Wrench className="h-5 w-5 animate-pulse" />
            </div>

            <p className="text-sm text-slate-500">
              Chargement des équipements...
            </p>
          </div>
        ) : filteredEquipment.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Wrench className="h-7 w-7" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Aucun équipement trouvé
            </h2>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              {search || statusFilter !== "all"
                ? "Modifiez vos critères de recherche."
                : "Commencez par ajouter votre premier équipement."}
            </p>

            {!search && statusFilter === "all" && (
              <button
                type="button"
                onClick={() =>
                  navigate("/equipment/new")
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700"
              >
                <Plus className="h-4 w-4" />
                Ajouter un équipement
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Équipement
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Marque / Modèle
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Statut
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Maintenance
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredEquipment.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-amber-50/30"
                  >
                    {/* Equipment */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                          <Wrench className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {item.name}
                          </p>

                          {item.serial_number && (
                            <p className="mt-1 text-xs text-slate-500">
                              N° série :{" "}
                              {item.serial_number}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Hammer className="h-4 w-4 text-amber-500" />

                        {item.equipment_type || "—"}
                      </div>
                    </td>

                    {/* Brand / Model */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-slate-800">
                        {item.brand || "—"}
                      </div>

                      {item.model && (
                        <div className="mt-1 text-xs text-slate-500">
                          {item.model}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.active
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          {item.active ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}

                          {item.active
                            ? "Actif"
                            : "Inactif"}
                        </span>

                        {item.status && (
                          <span className="text-xs text-slate-500">
                            {getStatusLabel(item.status)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Maintenance */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-start gap-2">
                        <CalendarClock className="mt-0.5 h-4 w-4 text-amber-500" />

                        <div>
                          <div className="text-sm text-slate-700">
                            {item.next_maintenance_at
                              ? formatDate(
                                  item.next_maintenance_at,
                                )
                              : "Non planifiée"}
                          </div>

                          {item.last_maintenance_at && (
                            <div className="mt-1 text-xs text-slate-500">
                              Dernière :{" "}
                              {formatDate(
                                item.last_maintenance_at,
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/equipment/${item.id}`,
                            )
                          }
                          title="Voir"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/equipment/${item.id}/edit`,
                            )
                          }
                          title="Modifier"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item)
                          }
                          title="Supprimer"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
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

      {!loading && filteredEquipment.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ClipboardList className="h-4 w-4" />

          <span>
            {filteredEquipment.length} équipement
            {filteredEquipment.length > 1 ? "s" : ""} affiché
            {filteredEquipment.length > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;