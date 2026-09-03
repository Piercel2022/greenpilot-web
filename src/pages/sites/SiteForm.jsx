import { useState } from 'react'

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

return ( <form
   onSubmit={handleSubmit}
   className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
 > <div className="grid gap-6 md:grid-cols-2"> <div> <label
         htmlFor="customer_id"
         className="mb-2 block text-sm font-medium text-slate-700"
       >
Client </label>

      <select
        id="customer_id"
        name="customer_id"
        value={form.customer_id}
        onChange={handleChange}
        disabled={submitting}
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
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
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="site_type"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Type de site
      </label>

      <input
        id="site_type"
        name="site_type"
        type="text"
        value={form.site_type}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="address_line1"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Adresse
      </label>

      <input
        id="address_line1"
        name="address_line1"
        type="text"
        value={form.address_line1}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="address_line2"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Complément d'adresse
      </label>

      <input
        id="address_line2"
        name="address_line2"
        type="text"
        value={form.address_line2}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="postal_code"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Code postal
      </label>

      <input
        id="postal_code"
        name="postal_code"
        type="text"
        value={form.postal_code}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="city"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Ville
      </label>

      <input
        id="city"
        name="city"
        type="text"
        value={form.city}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="country"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Pays
      </label>

      <input
        id="country"
        name="country"
        type="text"
        value={form.country}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="latitude"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="longitude"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div>
      <label
        htmlFor="surface_area"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>

    <div className="flex items-center">
      <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
        <input
          name="active"
          type="checkbox"
          checked={form.active}
          onChange={handleChange}
          disabled={submitting}
          className="h-4 w-4 rounded border-slate-300"
        />

        Site actif
      </label>
    </div>

    <div className="md:col-span-2">
      <label
        htmlFor="notes"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Notes
      </label>

      <textarea
        id="notes"
        name="notes"
        rows="4"
        value={form.notes}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
    </div>
  </div>

  <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
    <button
      type="button"
      onClick={onCancel}
      disabled={submitting}
      className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Annuler
    </button>

    <button
      type="submit"
      disabled={submitting}
      className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {submitting ? 'Enregistrement...' : submitLabel}
    </button>
  </div>
</form>

)
}
