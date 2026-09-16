
import { useMemo, useState } from "react";
import {
  AlertCircle,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CloudSun,
  FileText,
  MapPin,
  MapPinned,
  Save,
  StickyNote,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

const initialForm = {
  customer_id: "",
  site_id: "",
  title: "",
  description: "",
  job_type: "",
  status: "planned",
  priority: "normal",
  scheduled_date: "",
  scheduled_start_at: "",
  scheduled_end_at: "",
  estimated_duration_minutes: "",
  address: "",
  latitude: "",
  longitude: "",
  customer_notes: "",
  internal_notes: "",
  weather_notes: "",
  weather_risk: "unknown",
};

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

const labelClassName =
  "mb-2 block text-sm font-medium text-slate-700";

function getCustomerLabel(customer) {
  return (
    customer.company_name ||
    [customer.first_name, customer.last_name].filter(Boolean).join(" ") ||
    `Client #${customer.id}`
  );
}

function getSiteLabel(site) {
  return site.name || `Site #${site.id}`;
}

function getSiteAddress(site) {
  return [
    site.address_line1,
    site.address_line2,
    [site.postal_code, site.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
}

function combineDateAndTime(date, time) {
  if (!date || !time) return null;

  return `${date}T${time}`;
}

function normalizeNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

function normalizePayload(form) {
  return {
    customer_id: form.customer_id || null,
    site_id: form.site_id || null,
    title: form.title.trim(),
    description: form.description.trim() || null,
    job_type: form.job_type.trim(),
    status: form.status,
    priority: form.priority,
    scheduled_date: form.scheduled_date || null,
    scheduled_start_at: combineDateAndTime(
      form.scheduled_date,
      form.scheduled_start_at
    ),
    scheduled_end_at: combineDateAndTime(
      form.scheduled_date,
      form.scheduled_end_at
    ),
    estimated_duration_minutes: normalizeNumber(
      form.estimated_duration_minutes
    ),
    address: form.address.trim() || null,
    latitude: normalizeNumber(form.latitude),
    longitude: normalizeNumber(form.longitude),
    customer_notes: form.customer_notes.trim() || null,
    internal_notes: form.internal_notes.trim() || null,
    weather_notes: form.weather_notes.trim() || null,
    weather_risk: form.weather_risk,
  };
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}) {
  return (
    <label htmlFor={htmlFor} className={labelClassName}>
      {children}
      {required && <span className="ml-1 text-amber-600">*</span>}
    </label>
  );
}

export default function JobForm({
  customers = [],
  sites = [],
  initialValues = initialForm,
  onSubmit,
  onCancel,
  submitting = false,
  submitLabel = "Créer l’intervention",
}) {
  const [form, setForm] = useState({
    ...initialForm,
    ...initialValues,
  });

  const [error, setError] = useState("");

  const availableSites = useMemo(() => {
    if (!form.customer_id) return [];

    return sites.filter(
      (site) => String(site.customer_id) === String(form.customer_id)
    );
  }, [sites, form.customer_id]);

  const selectedCustomer = useMemo(
    () =>
      customers.find(
        (customer) => String(customer.id) === String(form.customer_id)
      ),
    [customers, form.customer_id]
  );

  const selectedSite = useMemo(
    () =>
      sites.find(
        (site) => String(site.id) === String(form.site_id)
      ),
    [sites, form.site_id]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "customer_id") {
      setForm((current) => ({
        ...current,
        customer_id: value,
        site_id: "",
      }));

      return;
    }

    if (name === "site_id") {
      const selectedSite = sites.find(
        (site) => String(site.id) === String(value)
      );

      setForm((current) => ({
        ...current,
        site_id: value,
        address:
          selectedSite && !current.address
            ? getSiteAddress(selectedSite)
            : current.address,
        latitude:
          selectedSite && !current.latitude
            ? selectedSite.latitude ?? ""
            : current.latitude,
        longitude:
          selectedSite && !current.longitude
            ? selectedSite.longitude ?? ""
            : current.longitude,
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.customer_id) {
      setError("Veuillez sélectionner un client.");
      return;
    }

    if (!form.site_id) {
      setError("Veuillez sélectionner un site.");
      return;
    }

    if (!form.title.trim()) {
      setError("Le titre de l’intervention est obligatoire.");
      return;
    }

    if (!form.job_type.trim()) {
      setError("Le type d’intervention est obligatoire.");
      return;
    }

    if (
      form.scheduled_start_at &&
      form.scheduled_end_at &&
      form.scheduled_end_at < form.scheduled_start_at
    ) {
      setError("L’heure de fin doit être après l’heure de début.");
      return;
    }

    try {
      await onSubmit(normalizePayload(form));
    } catch (submitError) {
      const responseMessage = submitError?.response?.data?.errors;

      if (Array.isArray(responseMessage)) {
        setError(responseMessage.join(", "));
      } else if (typeof responseMessage === "string") {
        setError(responseMessage);
      } else if (submitError?.response?.data?.error) {
        setError(submitError.response.data.error);
      } else if (submitError?.message) {
        setError(submitError.message);
      } else {
        setError(
          "Une erreur est survenue lors de l’enregistrement de l’intervention."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-red-200 border-l-4 border-l-red-500 bg-white shadow-sm">
          <div className="flex items-start gap-3 px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
              <AlertCircle className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                Vérifiez les informations
              </p>

              <p className="mt-1 text-sm leading-5 text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={BriefcaseBusiness}
            title="Informations générales"
            description="Définissez le client, le site et les informations principales de l’intervention."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="customer_id" required>
                Client
              </FieldLabel>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  id="customer_id"
                  name="customer_id"
                  value={form.customer_id}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  className={`${inputClassName} pl-10`}
                >
                  <option value="">Sélectionner un client</option>

                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {getCustomerLabel(customer)}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCustomer && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />
                  Client sélectionné
                </p>
              )}
            </div>

            <div>
              <FieldLabel htmlFor="site_id" required>
                Site
              </FieldLabel>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  id="site_id"
                  name="site_id"
                  value={form.site_id}
                  onChange={handleChange}
                  disabled={submitting || !form.customer_id}
                  required
                  className={`${inputClassName} pl-10`}
                >
                  <option value="">
                    {form.customer_id
                      ? "Sélectionner un site"
                      : "Sélectionnez d’abord un client"}
                  </option>

                  {availableSites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {getSiteLabel(site)}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSite && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-amber-500" />
                  {getSiteLabel(selectedSite)}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <FieldLabel htmlFor="title" required>
                Titre de l’intervention
              </FieldLabel>

              <div className="relative">
                <FileText className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  placeholder="Ex. Entretien du jardin principal"
                  className={`${inputClassName} pl-10`}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="job_type" required>
                Type d’intervention
              </FieldLabel>

              <div className="relative">
                <Wrench className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="job_type"
                  name="job_type"
                  type="text"
                  value={form.job_type}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  placeholder="Ex. Entretien, taille, création..."
                  className={`${inputClassName} pl-10`}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="status">
                Statut
              </FieldLabel>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={submitting}
                className={inputClassName}
              >
                <option value="planned">Planifiée</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>

            <div>
              <FieldLabel htmlFor="priority">
                Priorité
              </FieldLabel>

              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                disabled={submitting}
                className={inputClassName}
              >
                <option value="low">Faible</option>
                <option value="normal">Normale</option>
                <option value="high">Haute</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <FieldLabel htmlFor="description">
                Description
              </FieldLabel>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Décrivez les travaux à réaliser..."
                className={inputClassName}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={CalendarDays}
            title="Planification"
            description="Indiquez la date, les horaires et la durée estimée de l’intervention."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="scheduled_date">
                Date prévue
              </FieldLabel>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="scheduled_date"
                  name="scheduled_date"
                  type="date"
                  value={form.scheduled_date}
                  onChange={handleChange}
                  disabled={submitting}
                  className={`${inputClassName} pl-10`}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="estimated_duration_minutes">
                Durée estimée
              </FieldLabel>

              <div className="relative">
                <Clock3 className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="estimated_duration_minutes"
                  name="estimated_duration_minutes"
                  type="number"
                  min="0"
                  value={form.estimated_duration_minutes}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Ex. 180"
                  className={`${inputClassName} pl-10`}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                En minutes
              </p>
            </div>

            <div>
              <FieldLabel htmlFor="scheduled_start_at">
                Heure de début
              </FieldLabel>

              <div className="relative">
                <Clock3 className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="scheduled_start_at"
                  name="scheduled_start_at"
                  type="time"
                  value={form.scheduled_start_at}
                  onChange={handleChange}
                  disabled={submitting}
                  className={`${inputClassName} pl-10`}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="scheduled_end_at">
                Heure de fin
              </FieldLabel>

              <div className="relative">
                <Clock3 className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="scheduled_end_at"
                  name="scheduled_end_at"
                  type="time"
                  value={form.scheduled_end_at}
                  onChange={handleChange}
                  disabled={submitting}
                  className={`${inputClassName} pl-10`}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={MapPinned}
            title="Lieu d’intervention"
            description="L’adresse et les coordonnées peuvent être récupérées automatiquement depuis le site sélectionné."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <FieldLabel htmlFor="address">
                Adresse
              </FieldLabel>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Adresse de l’intervention"
                  className={`${inputClassName} pl-10`}
                />
              </div>

              {selectedSite && getSiteAddress(selectedSite) && (
                <p className="mt-2 text-xs text-slate-400">
                  Adresse du site : {getSiteAddress(selectedSite)}
                </p>
              )}
            </div>

            <div>
              <FieldLabel htmlFor="latitude">
                Latitude
              </FieldLabel>

              <input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                value={form.latitude}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Ex. 48.5734"
                className={inputClassName}
              />
            </div>

            <div>
              <FieldLabel htmlFor="longitude">
                Longitude
              </FieldLabel>

              <input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                value={form.longitude}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Ex. 7.7521"
                className={inputClassName}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={CloudSun}
            title="Météo"
            description="Ajoutez le niveau de risque et les informations météo utiles à l’équipe terrain."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="weather_risk">
                Risque météo
              </FieldLabel>

              <select
                id="weather_risk"
                name="weather_risk"
                value={form.weather_risk}
                onChange={handleChange}
                disabled={submitting}
                className={inputClassName}
              >
                <option value="unknown">Inconnu</option>
                <option value="low">Faible</option>
                <option value="medium">Moyen</option>
                <option value="high">Élevé</option>
              </select>
            </div>

            <div>
              <FieldLabel htmlFor="weather_notes">
                Notes météo
              </FieldLabel>

              <div className="relative">
                <CloudSun className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                <input
                  id="weather_notes"
                  name="weather_notes"
                  type="text"
                  value={form.weather_notes}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Ex. Risque de pluie en fin d’après-midi"
                  className={`${inputClassName} pl-10`}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            icon={StickyNote}
            title="Notes"
            description="Ajoutez les informations utiles aux équipes et au suivi client."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="customer_notes">
                Notes client
              </FieldLabel>

              <textarea
                id="customer_notes"
                name="customer_notes"
                rows="5"
                value={form.customer_notes}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Informations communiquées par le client..."
                className={inputClassName}
              />
            </div>

            <div>
              <FieldLabel htmlFor="internal_notes">
                Notes internes
              </FieldLabel>

              <textarea
                id="internal_notes"
                name="internal_notes"
                rows="5"
                value={form.internal_notes}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Informations réservées à l’équipe..."
                className={inputClassName}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
        >
          <X className="h-4 w-4" />
          Annuler
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}