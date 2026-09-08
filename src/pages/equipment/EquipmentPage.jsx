
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  Eye,
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
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              "Impossible de charger les équipements."
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
      `Voulez-vous vraiment supprimer l'équipement « ${item.name} » ?`
    );

    if (!confirmed) return;

    try {
      await deleteEquipment(item.id);

      setEquipment((current) =>
        current.filter(
          (equipmentItem) => equipmentItem.id !== item.id
        )
      );
    } catch (err) {
      console.error(
        "Erreur lors de la suppression :",
        err
      );

      setError(
        err.response?.data?.error ||
          "Impossible de supprimer cet équipement."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Intl.DateTimeFormat("fr-FR").format(
      new Date(date)
    );
  };

  const getStatusLabel = (status) => {
    if (!status) return "—";

    return status
      .toString()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const activeCount = equipment.filter(
    (item) => item.active
  ).length;

  const inactiveCount = equipment.length - activeCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Wrench size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Équipements
              </h1>

              <p className="text-sm text-gray-500">
                Gérez votre matériel et suivez sa maintenance.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/equipment/new")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          Ajouter un équipement
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">
            Total
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {equipment.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={17}
              className="text-green-600"
            />

            <p className="text-sm text-gray-500">
              Actifs
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {activeCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <XCircle
              size={17}
              className="text-gray-500"
            />

            <p className="text-sm text-gray-500">
              Inactifs
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {inactiveCount}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Rechercher par nom, type, marque, modèle ou numéro de série..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
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

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>{error}</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Chargement des équipements...
          </div>
        ) : filteredEquipment.length === 0 ? (
          <div className="p-10 text-center">
            <Wrench
              size={36}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Aucun équipement trouvé
            </h2>

            <p className="mt-1 text-sm text-gray-500">
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
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                <Plus size={17} />
                Ajouter un équipement
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Équipement
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Marque / Modèle
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Statut
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Maintenance
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredEquipment.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.name}
                        </p>

                        {item.serial_number && (
                          <p className="mt-1 text-xs text-gray-500">
                            N° série :{" "}
                            {item.serial_number}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {item.equipment_type || "—"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {item.brand || "—"}
                      </div>

                      {item.model && (
                        <div className="text-xs text-gray-500">
                          {item.model}
                        </div>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.active
                            ? "Actif"
                            : "Inactif"}
                        </span>

                        {item.status && (
                          <span className="text-xs text-gray-500">
                            {getStatusLabel(item.status)}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {item.next_maintenance_at
                          ? formatDate(
                              item.next_maintenance_at
                            )
                          : "Non planifiée"}
                      </div>

                      {item.last_maintenance_at && (
                        <div className="mt-1 text-xs text-gray-500">
                          Dernière :{" "}
                          {formatDate(
                            item.last_maintenance_at
                          )}
                        </div>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/equipment/${item.id}`
                            )
                          }
                          title="Voir"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/equipment/${item.id}/edit`
                            )
                          }
                          title="Modifier"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item)
                          }
                          title="Supprimer"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
                        >
                          <Trash2 size={17} />
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
        <div className="text-sm text-gray-500">
          {filteredEquipment.length} équipement
          {filteredEquipment.length > 1
            ? "s"
            : ""}{" "}
          affiché
          {filteredEquipment.length > 1
            ? "s"
            : ""}
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;