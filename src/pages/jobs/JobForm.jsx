import { useMemo, useState } from "react";

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
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50";

const labelClassName = "mb-2 block text-sm font-medium text-slate-700";

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
        setError("Une erreur est survenue lors de la création de l’intervention.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <section>
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Informations générales
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Définissez le client, le site et les informations principales de
              l’intervention.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="customer_id" className={labelClassName}>
                Client *
              </label>

              <select
                id="customer_id"
                name="customer_id"
                value={form.customer_id}
                onChange={handleChange}
                disabled={submitting}
                required
                className={inputClassName}
              >
                <option value="">Sélectionner un client</option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {getCustomerLabel(customer)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="site_id" className={labelClassName}>
                Site *
              </label>

              <select
                id="site_id"
                name="site_id"
                value={form.site_id}
                onChange={handleChange}
                disabled={submitting || !form.customer_id}
                required
                className={inputClassName}
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

            <div className="md:col-span-2">
              <label htmlFor="title" className={labelClassName}>
                Titre de l’intervention *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                disabled={submitting}
                required
                placeholder="Ex. Entretien du jardin principal"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="job_type" className={labelClassName}>
                Type d’intervention *
              </label>

              <input
                id="job_type"
                name="job_type"
                type="text"
                value={form.job_type}
                onChange={handleChange}
                disabled={submitting}
                required
                placeholder="Ex. Entretien, taille, création..."
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="status" className={labelClassName}>
                Statut
              </label>

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
              <label htmlFor="priority" className={labelClassName}>
                Priorité
              </label>

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
          </div>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Planification
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Indiquez la date, les horaires et la durée estimée.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="scheduled_date" className={labelClassName}>
                Date prévue
              </label>

              <input
                id="scheduled_date"
                name="scheduled_date"
                type="date"
                value={form.scheduled_date}
                onChange={handleChange}
                disabled={submitting}
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="estimated_duration_minutes"
                className={labelClassName}
              >
                Durée estimée (minutes)
              </label>

              <input
                id="estimated_duration_minutes"
                name="estimated_duration_minutes"
                type="number"
                min="0"
                value={form.estimated_duration_minutes}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Ex. 180"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="scheduled_start_at" className={labelClassName}>
                Heure de début
              </label>

              <input
                id="scheduled_start_at"
                name="scheduled_start_at"
                type="time"
                value={form.scheduled_start_at}
                onChange={handleChange}
                disabled={submitting}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="scheduled_end_at" className={labelClassName}>
                Heure de fin
              </label>

              <input
                id="scheduled_end_at"
                name="scheduled_end_at"
                type="time"
                value={form.scheduled_end_at}
                onChange={handleChange}
                disabled={submitting}
                className={inputClassName}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Lieu d’intervention
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              L’adresse peut être récupérée automatiquement depuis le site
              sélectionné.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="address" className={labelClassName}>
                Adresse
              </label>

              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Adresse de l’intervention"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="latitude" className={labelClassName}>
                Latitude
              </label>

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
              <label htmlFor="longitude" className={labelClassName}>
                Longitude
              </label>

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

        <section className="border-t border-slate-200 pt-8">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Météo
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Évaluez le risque météo prévu pour cette intervention.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="weather_risk" className={labelClassName}>
                Risque météo
              </label>

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
              <label htmlFor="weather_notes" className={labelClassName}>
                Notes météo
              </label>

              <input
                id="weather_notes"
                name="weather_notes"
                type="text"
                value={form.weather_notes}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Ex. Risque de pluie en fin d’après-midi"
                className={inputClassName}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Notes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ajoutez les informations utiles aux équipes et au suivi client.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="customer_notes" className={labelClassName}>
                Notes client
              </label>

              <textarea
                id="customer_notes"
                name="customer_notes"
                rows="4"
                value={form.customer_notes}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Informations communiquées par le client..."
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="internal_notes" className={labelClassName}>
                Notes internes
              </label>

              <textarea
                id="internal_notes"
                name="internal_notes"
                rows="4"
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

      <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Enregistrement..." : submitLabel}
        </button>
      </div>
    </form>
  );
}