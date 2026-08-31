import { useState } from 'react'

const initialForm = {
customer_type: 'individual',
company_name: '',
first_name: '',
last_name: '',
email: '',
phone: '',
mobile: '',
notes: '',
active: true,
}

export default function CustomerForm({ onSubmit, onCancel, submitting = false }) {
const [form, setForm] = useState(initialForm)

function handleChange(event) {
const { name, value, type, checked } = event.target


setForm((current) => ({
  ...current,
  [name]: type === 'checkbox' ? checked : value,
}))

}

async function handleSubmit(event) {
event.preventDefault()
await onSubmit(form)
}

return ( <form
   onSubmit={handleSubmit}
   className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
 > <div className="grid gap-6 md:grid-cols-2"> <div> <label
         htmlFor="customer_type"
         className="mb-2 block text-sm font-medium text-slate-700"
       >
Type de client </label>

```
      <select
        id="customer_type"
        name="customer_type"
        value={form.customer_type}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      >
        <option value="individual">Particulier</option>
        <option value="company">Entreprise</option>
      </select>
    </div>

    <div>
      <label
        htmlFor="company_name"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Société
      </label>

      <input
        id="company_name"
        name="company_name"
        type="text"
        value={form.company_name}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </div>

    <div>
      <label
        htmlFor="first_name"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Prénom
      </label>

      <input
        id="first_name"
        name="first_name"
        type="text"
        value={form.first_name}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </div>

    <div>
      <label
        htmlFor="last_name"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Nom
      </label>

      <input
        id="last_name"
        name="last_name"
        type="text"
        value={form.last_name}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </div>

    <div>
      <label
        htmlFor="email"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Email
      </label>

      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </div>

    <div>
      <label
        htmlFor="phone"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Téléphone
      </label>

      <input
        id="phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </div>

    <div>
      <label
        htmlFor="mobile"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Mobile
      </label>

      <input
        id="mobile"
        name="mobile"
        type="tel"
        value={form.mobile}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </div>

    <div className="flex items-center">
      <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
        <input
          name="active"
          type="checkbox"
          checked={form.active}
          onChange={handleChange}
          className="h-4 w-4 rounded border-slate-300"
        />
        Client actif
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
      {submitting ? 'Création...' : 'Créer le client'}
    </button>
  </div>
</form>

)
}
