import { useState } from 'react'
import {
Building2,
CheckCircle2,
FileText,
Loader2,
MapPin,
Navigation,
Ruler,
Users,
} from 'lucide-react'

const initialForm = {
customer_id: '',
name: '',
site_type: '',
address_line1: '',
address_line2: '',
postal_code: '',
city: '',
country: 'France',
latitude: '',
longitude: '',
surface_area: '',
notes: '',
active: true,
}

const inputClassName =
'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500'

const labelClassName =
'mb-2 flex items-center gap-2 text-sm font-medium text-slate-700'

const iconClassName = 'h-4 w-4 text-sky-500'

export default function SiteForm({
customers = [],
initialValues = initialForm,
onSubmit,
onCancel,
submitting = false,
submitLabel = 'Créer le site',
}) {
const [form, setForm] = useState(() => ({
...initialForm,
...initialValues,
}))

function handleChange(event) {
const { name, value, type, checked } = event.target

setForm((current) => ({
  ...current,
  [name]: type === 'checkbox' ? checked : value,
}))

}

async function handleSubmit(event) {
event.preventDefault()

await onSubmit({
  ...form,
  customer_id: form.customer_id === '' ? null : form.customer_id,
  latitude: form.latitude === '' ? null : form.latitude,
  longitude: form.longitude === '' ? null : form.longitude,
  surface_area: form.surface_area === '' ? null : form.surface_area,
})

}

return ( <form onSubmit={handleSubmit}> <div className="space-y-8"> <section> <div className="mb-5 flex items-center gap-3"> <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600"> <Building2 className="h-4 w-4" /> </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Informations générales
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Identifiez le site et son client.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="customer_id" className={labelClassName}>
            <Users className={iconClassName} />
            Client
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

            {customers.map((customer) => {
              const label =
                customer.company_name ||
                [customer.first_name, customer.last_name]
                  .filter(Boolean)
                  .join(' ') ||
                `Client #${customer.id}`

              return (
                <option key={customer.id} value={customer.id}>
                  {label}
                </option>
              )
            })}
          </select>
        </div>

        <div>
          <label htmlFor="name" className={labelClassName}>
            <MapPin className={iconClassName} />
            Nom du site
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            disabled={submitting}
            required
            placeholder="Ex. Résidence Les Jardins"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="site_type" className={labelClassName}>
            <Building2 className={iconClassName} />
            Type de site
          </label>

          <input
            id="site_type"
            name="site_type"
            type="text"
            value={form.site_type}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Ex. Résidence, jardin, parc..."
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="surface_area" className={labelClassName}>
            <Ruler className={iconClassName} />
            Surface (m²)
          </label>

          <input
            id="surface_area"
            name="surface_area"
            type="number"
            step="any"
            min="0"
            value={form.surface_area}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Ex. 2500"
            className={inputClassName}
          />
        </div>
      </div>
    </section>

    <section className="border-t border-slate-100 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <MapPin className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Adresse du site
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Localisez précisément le lieu d’intervention.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="address_line1" className={labelClassName}>
            <MapPin className={iconClassName} />
            Adresse
          </label>

          <input
            id="address_line1"
            name="address_line1"
            type="text"
            value={form.address_line1}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Numéro et nom de rue"
            className={inputClassName}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address_line2" className={labelClassName}>
            <MapPin className={iconClassName} />
            Complément d'adresse
          </label>

          <input
            id="address_line2"
            name="address_line2"
            type="text"
            value={form.address_line2}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Bâtiment, étage, accès..."
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="postal_code" className={labelClassName}>
            Code postal
          </label>

          <input
            id="postal_code"
            name="postal_code"
            type="text"
            value={form.postal_code}
            onChange={handleChange}
            disabled={submitting}
            placeholder="67000"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="city" className={labelClassName}>
            Ville
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Strasbourg"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="country" className={labelClassName}>
            Pays
          </label>

          <input
            id="country"
            name="country"
            type="text"
            value={form.country}
            onChange={handleChange}
            disabled={submitting}
            className={inputClassName}
          />
        </div>
      </div>
    </section>

    <section className="border-t border-slate-100 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <Navigation className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Coordonnées GPS
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Ajoutez les coordonnées pour faciliter les interventions
            terrain.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="latitude" className={labelClassName}>
            <Navigation className={iconClassName} />
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
            <Navigation className={iconClassName} />
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

    <section className="border-t border-slate-100 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
          <FileText className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Informations complémentaires
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Ajoutez les informations utiles aux équipes.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClassName}>
          <FileText className={iconClassName} />
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          rows="4"
          value={form.notes}
          onChange={handleChange}
          disabled={submitting}
          placeholder="Accès au site, consignes particulières, contraintes terrain..."
          className={`${inputClassName} resize-y`}
        />
      </div>
    </section>

    <section className="border-t border-slate-100 pt-8">
      <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">
              Site actif
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Un site actif peut être utilisé pour les devis, chantiers et
              interventions.
            </p>
          </div>
        </div>

        <label className="relative inline-flex shrink-0 cursor-pointer items-center">
          <input
            name="active"
            type="checkbox"
            checked={form.active}
            onChange={handleChange}
            disabled={submitting}
            className="peer sr-only"
          />

          <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-sky-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />

          <span className="sr-only">Activer le site</span>
        </label>
      </div>
    </section>
  </div>

  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
    <button
      type="button"
      onClick={onCancel}
      disabled={submitting}
      className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Annuler
    </button>

    <button
      type="submit"
      disabled={submitting}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
      {submitting ? 'Enregistrement...' : submitLabel}
    </button>
  </div>
</form>

)
}
