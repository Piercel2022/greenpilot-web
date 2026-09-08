
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Edit,
  Trash2,
  Wrench,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEquipment,
  getEquipmentItem,
} from "../../services/equipment";

const STATUS_LABELS = {
  available: "Disponible",
  in_use: "En utilisation",
  maintenance: "En maintenance",
  out_of_service: "Hors service",
  retired: "Retiré",
};

const formatDate = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const formatDateTime = (value) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return value;
};

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}

export default function EquipmentShowPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchEquipment = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEquipmentItem(id);

        if (!cancelled) {
          setEquipment(data);
        }
      } catch (err) {
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
  }, [id]);

  const handleDelete = async () => {
    if (!equipment) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer "${equipment.name}" ?`
    );

    if (!confirmed) return;

    try {
      await deleteEquipment(equipment.id);
      navigate("/equipment");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Impossible de supprimer cet équipement."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">Chargement de l’équipement…</p>
      </div>
    );
  }

  if (error && !equipment) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate("/equipment")}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux équipements
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!equipment) {
    return null;
  }

  const statusLabel =
    STATUS_LABELS[equipment.status] || equipment.status || "—";

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/equipment")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            aria-label="Retour aux équipements"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                {equipment.name}
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Détails de l’équipement
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/equipment/${equipment.id}/edit`)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Informations générales
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Identification et caractéristiques de l’équipement.
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                equipment.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {equipment.active ? "Actif" : "Inactif"}
            </span>
          </div>

          <dl className="grid gap-6 sm:grid-cols-2">
            <InfoItem
              label="Nom"
              value={formatValue(equipment.name)}
            />

            <InfoItem
              label="Type"
              value={formatValue(equipment.equipment_type)}
            />

            <InfoItem
              label="Marque"
              value={formatValue(equipment.brand)}
            />

            <InfoItem
              label="Modèle"
              value={formatValue(equipment.model)}
            />

            <InfoItem
              label="Numéro de série"
              value={formatValue(equipment.serial_number)}
            />

            <InfoItem
              label="Statut"
              value={statusLabel}
            />
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <CalendarDays className="h-5 w-5 text-gray-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Achat
              </h2>
              <p className="text-sm text-gray-500">
                Informations d’acquisition.
              </p>
            </div>
          </div>

          <dl className="space-y-5">
            <InfoItem
              label="Date d’achat"
              value={formatDate(equipment.purchase_date)}
            />

            <InfoItem
              label="Prix d’achat"
              value={formatPrice(equipment.purchase_price)}
            />
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Maintenance
              </h2>
              <p className="text-sm text-gray-500">
                Suivi des opérations de maintenance.
              </p>
            </div>
          </div>

          <dl className="grid gap-6 sm:grid-cols-3">
            <InfoItem
              label="Intervalle"
              value={
                equipment.maintenance_interval_days
                  ? `${equipment.maintenance_interval_days} jours`
                  : "—"
              }
            />

            <InfoItem
              label="Dernière maintenance"
              value={formatDateTime(equipment.last_maintenance_at)}
            />

            <InfoItem
              label="Prochaine maintenance"
              value={formatDateTime(equipment.next_maintenance_at)}
            />
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Notes
          </h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {formatValue(equipment.notes)}
          </p>
        </section>
      </div>
    </div>
  );
}