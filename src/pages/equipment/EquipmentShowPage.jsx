import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CalendarClock,
  CircleCheck,
  Clock3,
  Edit,
  Hammer,
  Hash,
  Info,
  Package,
  Receipt,
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

const getStatusClasses = (status) => {
  switch (status) {
    case "available":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "in_use":
      return "border-sky-200 bg-sky-50 text-sky-700";

    case "maintenance":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "out_of_service":
      return "border-red-200 bg-red-50 text-red-700";

    case "retired":
      return "border-slate-200 bg-slate-100 text-slate-600";

    default:
      return "border-slate-200 bg-slate-100 text-slate-600";
  }
};

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon className="h-4 w-4 text-amber-600" />
        )}

        <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </dt>
      </div>

      <dd className="mt-2 text-sm font-semibold text-slate-900">
        {value}
      </dd>
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
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
            <Wrench className="h-6 w-6 text-amber-600" />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Chargement de l’équipement…
          </p>
        </div>
      </div>
    );
  }

  if (error && !equipment) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate("/equipment")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux équipements
        </button>

        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
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
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/equipment")}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            aria-label="Retour aux équipements"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
            <Wrench className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {equipment.name}
              </h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                  equipment.status
                )}`}
              >
                <CircleCheck className="h-3.5 w-3.5" />
                {statusLabel}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Fiche détaillée de l’équipement
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/equipment/${equipment.id}/edit`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* General information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <Package className="h-5 w-5 text-amber-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Informations générales
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Identification et caractéristiques de l’équipement.
                </p>
              </div>
            </div>

            <span
              className={`hidden rounded-full border px-3 py-1 text-xs font-semibold sm:inline-flex sm:items-center sm:gap-1.5 ${
                equipment.active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  equipment.active
                    ? "bg-emerald-500"
                    : "bg-slate-400"
                }`}
              />
              {equipment.active ? "Actif" : "Inactif"}
            </span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <InfoItem
              icon={Package}
              label="Nom"
              value={formatValue(equipment.name)}
            />

            <InfoItem
              icon={Hammer}
              label="Type"
              value={formatValue(equipment.equipment_type)}
            />

            <InfoItem
              icon={Wrench}
              label="Marque"
              value={formatValue(equipment.brand)}
            />

            <InfoItem
              icon={Package}
              label="Modèle"
              value={formatValue(equipment.model)}
            />

            <InfoItem
              icon={Hash}
              label="Numéro de série"
              value={formatValue(equipment.serial_number)}
            />

            <InfoItem
              icon={CircleCheck}
              label="Statut"
              value={statusLabel}
            />
          </dl>
        </section>

        {/* Purchase */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Receipt className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Achat
              </h2>

              <p className="text-sm text-slate-500">
                Informations d’acquisition.
              </p>
            </div>
          </div>

          <dl className="space-y-4">
            <InfoItem
              icon={CalendarDays}
              label="Date d’achat"
              value={formatDate(equipment.purchase_date)}
            />

            <InfoItem
              icon={Receipt}
              label="Prix d’achat"
              value={formatPrice(equipment.purchase_price)}
            />
          </dl>
        </section>

        {/* Maintenance */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Wrench className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Maintenance
              </h2>

              <p className="text-sm text-slate-500">
                Suivi des opérations de maintenance.
              </p>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            <InfoItem
              icon={Clock3}
              label="Intervalle"
              value={
                equipment.maintenance_interval_days
                  ? `${equipment.maintenance_interval_days} jours`
                  : "—"
              }
            />

            <InfoItem
              icon={CalendarClock}
              label="Dernière maintenance"
              value={formatDateTime(equipment.last_maintenance_at)}
            />

            <InfoItem
              icon={CalendarClock}
              label="Prochaine maintenance"
              value={formatDateTime(equipment.next_maintenance_at)}
            />
          </dl>
        </section>

        {/* Notes */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Info className="h-5 w-5 text-slate-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Notes
              </h2>

              <p className="text-sm text-slate-500">
                Informations complémentaires.
              </p>
            </div>
          </div>

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {formatValue(equipment.notes)}
          </p>
        </section>
      </div>
    </div>
  );
}