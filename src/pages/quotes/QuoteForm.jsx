import { useState } from 'react'

const initialForm = {
customer_id: '',
site_id: '',
number: '',
title: '',
description: '',
issue_date: '',
valid_until: '',
status: 'draft',
discount_amount: '',
estimated_cost: '',
estimated_margin_percentage: '',
estimated_margin_amount: '',
subtotal: '',
tax_amount: '',
total_amount: '',
notes: '',
accepted_at: '',
rejected_at: '',
}

function QuoteForm({
customers = [],
sites = [],
initialValues = {},
onSubmit,
onCancel,
submitting = false,
submitLabel = 'Enregistrer',
}) {
const [form, setForm] = useState({
...initialForm,
...initialValues,
})

const filteredSites = sites.filter(
(site) => String(site.customer_id) === String(form.customer_id),
)

const handleChange = (event) => {
const { name, value } = event.target


setForm((current) => {
  if (name === 'customer_id') {
    return {
      ...current,
      customer_id: value,
      site_id: '',
    }
  }

  return {
    ...current,
    [name]: value,
  }
})


}

const handleSubmit = (event) => {
event.preventDefault()


onSubmit({
  ...form,
  discount_amount: form.discount_amount === '' ? 0 : form.discount_amount,
  estimated_cost: form.estimated_cost === '' ? 0 : form.estimated_cost,
  estimated_margin_percentage:
    form.estimated_margin_percentage === ''
      ? null
      : form.estimated_margin_percentage,
  estimated_margin_amount:
    form.estimated_margin_amount === '' ? 0 : form.estimated_margin_amount,
  subtotal: form.subtotal === '' ? 0 : form.subtotal,
  tax_amount: form.tax_amount === '' ? 0 : form.tax_amount,
  total_amount: form.total_amount === '' ? 0 : form.total_amount,
  valid_until: form.valid_until === '' ? null : form.valid_until,
  accepted_at: form.accepted_at === '' ? null : form.accepted_at,
  rejected_at: form.rejected_at === '' ? null : form.rejected_at,
})

}

return ( <form onSubmit={handleSubmit} className="space-y-6"> <div className="grid grid-cols-1 gap-6 md:grid-cols-2"> <div> <label
         htmlFor="customer_id"
         className="mb-2 block text-sm font-medium text-gray-700"
       >
Client </label>

      <select
        id="customer_id"
        name="customer_id"
        value={form.customer_id}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
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
        htmlFor="site_id"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Site
      </label>

      <select
        id="site_id"
        name="site_id"
        value={form.site_id}
        onChange={handleChange}
        required
        disabled={!form.customer_id}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-100"
      >
        <option value="">
          {form.customer_id
            ? 'Sélectionner un site'
            : 'Sélectionner d’abord un client'}
        </option>

        {filteredSites.map((site) => (
          <option key={site.id} value={site.id}>
            {site.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label
        htmlFor="number"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Numéro du devis
      </label>

      <input
        id="number"
        name="number"
        type="text"
        value={form.number}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="title"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Titre
      </label>

      <input
        id="title"
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="issue_date"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Date d’émission
      </label>

      <input
        id="issue_date"
        name="issue_date"
        type="date"
        value={form.issue_date}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="valid_until"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Valable jusqu’au
      </label>

      <input
        id="valid_until"
        name="valid_until"
        type="date"
        value={form.valid_until}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="status"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Statut
      </label>

      <select
        id="status"
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        <option value="draft">Brouillon</option>
      </select>
    </div>

    <div>
      <label
        htmlFor="discount_amount"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Remise
      </label>

      <input
        id="discount_amount"
        name="discount_amount"
        type="number"
        min="0"
        step="0.01"
        value={form.discount_amount}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="estimated_cost"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Coût estimé
      </label>

      <input
        id="estimated_cost"
        name="estimated_cost"
        type="number"
        min="0"
        step="0.01"
        value={form.estimated_cost}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="estimated_margin_percentage"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Marge estimée (%)
      </label>

      <input
        id="estimated_margin_percentage"
        name="estimated_margin_percentage"
        type="number"
        step="0.01"
        value={form.estimated_margin_percentage}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="estimated_margin_amount"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Marge estimée (€)
      </label>

      <input
        id="estimated_margin_amount"
        name="estimated_margin_amount"
        type="number"
        step="0.01"
        value={form.estimated_margin_amount}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="subtotal"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Sous-total
      </label>

      <input
        id="subtotal"
        name="subtotal"
        type="number"
        min="0"
        step="0.01"
        value={form.subtotal}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="tax_amount"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        TVA
      </label>

      <input
        id="tax_amount"
        name="tax_amount"
        type="number"
        min="0"
        step="0.01"
        value={form.tax_amount}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="total_amount"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Montant total
      </label>

      <input
        id="total_amount"
        name="total_amount"
        type="number"
        min="0"
        step="0.01"
        value={form.total_amount}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>
  </div>

  <div>
    <label
      htmlFor="description"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Description
    </label>

    <textarea
      id="description"
      name="description"
      rows="4"
      value={form.description}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
    />
  </div>

  <div>
    <label
      htmlFor="notes"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Notes
    </label>

    <textarea
      id="notes"
      name="notes"
      rows="4"
      value={form.notes}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
    />
  </div>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <label
        htmlFor="accepted_at"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Date d’acceptation
      </label>

      <input
        id="accepted_at"
        name="accepted_at"
        type="datetime-local"
        value={form.accepted_at}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div>
      <label
        htmlFor="rejected_at"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Date de rejet
      </label>

      <input
        id="rejected_at"
        name="rejected_at"
        type="datetime-local"
        value={form.rejected_at}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>
  </div>

  <div className="flex justify-end gap-3">
    <button
      type="button"
      onClick={onCancel}
      disabled={submitting}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Annuler
    </button>

    <button
      type="submit"
      disabled={submitting}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {submitting ? 'Enregistrement...' : submitLabel}
    </button>
  </div>
</form>

)
}

export default QuoteForm
