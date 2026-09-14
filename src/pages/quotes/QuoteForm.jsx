import { useState } from 'react'
import {
CalendarDays,
CheckCircle2,
CircleDollarSign,
FileText,
Loader2,
MapPin,
ReceiptText,
Ruler,
Users,
} from 'lucide-react'

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

const inputClassName =
'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500'

const labelClassName =
'mb-2 flex items-center gap-2 text-sm font-medium text-slate-700'

const iconClassName = 'h-4 w-4 text-violet-500'

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

return ( <form onSubmit={handleSubmit}> <div className="space-y-8"> <section> <div className="mb-5 flex items-center gap-3"> <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600"> <ReceiptText className="h-4 w-4" /> </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Références commerciales
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Identifiez le devis et rattachez-le au bon client et au bon
            site.
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
          <label htmlFor="site_id" className={labelClassName}>
            <MapPin className={iconClassName} />
            Site
          </label>

          <select
            id="site_id"
            name="site_id"
            value={form.site_id}
            onChange={handleChange}
            required
            disabled={!form.customer_id || submitting}
            className={inputClassName}
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
          <label htmlFor="number" className={labelClassName}>
            <FileText className={iconClassName} />
            Numéro du devis
          </label>

          <input
            id="number"
            name="number"
            type="text"
            value={form.number}
            onChange={handleChange}
            disabled={submitting}
            required
            placeholder="Ex. DEV-2026-001"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="title" className={labelClassName}>
            <FileText className={iconClassName} />
            Titre
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            disabled={submitting}
            required
            placeholder="Ex. Entretien annuel du jardin"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="issue_date" className={labelClassName}>
            <CalendarDays className={iconClassName} />
            Date d’émission
          </label>

          <input
            id="issue_date"
            name="issue_date"
            type="date"
            value={form.issue_date}
            onChange={handleChange}
            disabled={submitting}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="valid_until" className={labelClassName}>
            <CalendarDays className={iconClassName} />
            Valable jusqu’au
          </label>

          <input
            id="valid_until"
            name="valid_until"
            type="date"
            value={form.valid_until}
            onChange={handleChange}
            disabled={submitting}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="status" className={labelClassName}>
            <CheckCircle2 className={iconClassName} />
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
            <option value="draft">Brouillon</option>
          </select>
        </div>
      </div>
    </section>

    <section className="border-t border-slate-100 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <CircleDollarSign className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Montants et rentabilité
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Renseignez les éléments financiers du devis et la marge
            estimée.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="discount_amount" className={labelClassName}>
            <CircleDollarSign className={iconClassName} />
            Remise (€)
          </label>

          <input
            id="discount_amount"
            name="discount_amount"
            type="number"
            min="0"
            step="0.01"
            value={form.discount_amount}
            onChange={handleChange}
            disabled={submitting}
            placeholder="0,00"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="estimated_cost" className={labelClassName}>
            <CircleDollarSign className={iconClassName} />
            Coût estimé (€)
          </label>

          <input
            id="estimated_cost"
            name="estimated_cost"
            type="number"
            min="0"
            step="0.01"
            value={form.estimated_cost}
            onChange={handleChange}
            disabled={submitting}
            placeholder="0,00"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="estimated_margin_percentage"
            className={labelClassName}
          >
            <Ruler className={iconClassName} />
            Marge estimée (%)
          </label>

          <input
            id="estimated_margin_percentage"
            name="estimated_margin_percentage"
            type="number"
            step="0.01"
            value={form.estimated_margin_percentage}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Ex. 35"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="estimated_margin_amount"
            className={labelClassName}
          >
            <CircleDollarSign className={iconClassName} />
            Marge estimée (€)
          </label>

          <input
            id="estimated_margin_amount"
            name="estimated_margin_amount"
            type="number"
            step="0.01"
            value={form.estimated_margin_amount}
            onChange={handleChange}
            disabled={submitting}
            placeholder="0,00"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="subtotal" className={labelClassName}>
            <CircleDollarSign className={iconClassName} />
            Sous-total (€)
          </label>

          <input
            id="subtotal"
            name="subtotal"
            type="number"
            min="0"
            step="0.01"
            value={form.subtotal}
            onChange={handleChange}
            disabled={submitting}
            placeholder="0,00"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="tax_amount" className={labelClassName}>
            <ReceiptText className={iconClassName} />
            TVA (€)
          </label>

          <input
            id="tax_amount"
            name="tax_amount"
            type="number"
            min="0"
            step="0.01"
            value={form.tax_amount}
            onChange={handleChange}
            disabled={submitting}
            placeholder="0,00"
            className={inputClassName}
          />
        </div>

        <div className="md:col-span-2">
          <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
            <label htmlFor="total_amount" className={labelClassName}>
              <CircleDollarSign className="h-4 w-4 text-violet-600" />
              Montant total (€)
            </label>

            <input
              id="total_amount"
              name="total_amount"
              type="number"
              min="0"
              step="0.01"
              value={form.total_amount}
              onChange={handleChange}
              disabled={submitting}
              placeholder="0,00"
              className="w-full rounded-xl border border-violet-200 bg-white px-3.5 py-3 text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-slate-100 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <FileText className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Description et notes
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Décrivez la prestation et ajoutez les informations utiles au
            suivi du devis.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="description" className={labelClassName}>
            <FileText className={iconClassName} />
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            disabled={submitting}
            placeholder="Décrivez les prestations proposées, les travaux prévus ou le contenu de la proposition..."
            className={`${inputClassName} resize-y`}
          />
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
            placeholder="Informations internes, conditions particulières, consignes..."
            className={`${inputClassName} resize-y`}
          />
        </div>
      </div>
    </section>

    <section className="border-t border-slate-100 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <CalendarDays className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Suivi de décision
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Conservez les dates de décision lorsque le devis évolue.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="accepted_at" className={labelClassName}>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Date d’acceptation
          </label>

          <input
            id="accepted_at"
            name="accepted_at"
            type="datetime-local"
            value={form.accepted_at}
            onChange={handleChange}
            disabled={submitting}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="rejected_at" className={labelClassName}>
            <CheckCircle2 className="h-4 w-4 text-red-500" />
            Date de rejet
          </label>

          <input
            id="rejected_at"
            name="rejected_at"
            type="datetime-local"
            value={form.rejected_at}
            onChange={handleChange}
            disabled={submitting}
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
      className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Annuler
    </button>

    <button
      type="submit"
      disabled={submitting}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
      {submitting ? 'Enregistrement...' : submitLabel}
    </button>
  </div>
</form>

)
}

export default QuoteForm
