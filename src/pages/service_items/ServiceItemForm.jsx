import { useState } from 'react'

const initialForm = {
service_category_id: '',
code: '',
name: '',
description: '',
default_quantity: '',
default_unit_price: '',
default_margin_percentage: '',
labor_cost: '',
material_cost: '',
equipment_cost: '',
overhead_cost: '',
estimated_duration_minutes: '',
unit: '',
position: '',
active: true,
}

function ServiceItemForm({
initialValues = {},
categories = [],
onSubmit,
onCancel,
submitting = false,
submitLabel = 'Enregistrer',
}) {
const [form, setForm] = useState(() => ({
...initialForm,
...initialValues,
}))
const [error, setError] = useState('')

const handleChange = (event) => {
const { name, value, type, checked } = event.target


setForm((current) => ({
  ...current,
  [name]: type === 'checkbox' ? checked : value,
}))


}

const handleSubmit = async (event) => {
event.preventDefault()
setError('')


if (!form.service_category_id) {
  setError('La catégorie est obligatoire.')
  return
}

if (!form.code.trim()) {
  setError('Le code est obligatoire.')
  return
}

if (!form.name.trim()) {
  setError('Le nom est obligatoire.')
  return
}

const payload = {
  ...form,
  service_category_id: form.service_category_id || null,
  code: form.code.trim(),
  name: form.name.trim(),
  description: form.description.trim(),
  default_quantity:
    form.default_quantity === '' ? null : Number(form.default_quantity),
  default_unit_price:
    form.default_unit_price === '' ? null : Number(form.default_unit_price),
  default_margin_percentage:
    form.default_margin_percentage === ''
      ? null
      : Number(form.default_margin_percentage),
  labor_cost: form.labor_cost === '' ? null : Number(form.labor_cost),
  material_cost:
    form.material_cost === '' ? null : Number(form.material_cost),
  equipment_cost:
    form.equipment_cost === '' ? null : Number(form.equipment_cost),
  overhead_cost:
    form.overhead_cost === '' ? null : Number(form.overhead_cost),
  estimated_duration_minutes:
    form.estimated_duration_minutes === ''
      ? null
      : Number(form.estimated_duration_minutes),
  unit: form.unit.trim(),
  position: form.position === '' ? null : Number(form.position),
}

try {
  await onSubmit(payload)
} catch (submitError) {
  setError(
    submitError.response?.data?.errors?.join(', ') ||
      submitError.response?.data?.error ||
      'Une erreur est survenue.',
  )
}


}

return ( <form onSubmit={handleSubmit} className="space-y-6">
{error && ( <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
{error} </div>
)}

  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <label
        htmlFor="service_category_id"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Catégorie *
      </label>
      <select
        id="service_category_id"
        name="service_category_id"
        value={form.service_category_id}
        onChange={handleChange}
        disabled={submitting}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      >
        <option value="">Sélectionner une catégorie</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.code} — {category.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label
        htmlFor="code"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Code *
      </label>
      <input
        id="code"
        name="code"
        type="text"
        value={form.code}
        onChange={handleChange}
        disabled={submitting}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div className="md:col-span-2">
      <label
        htmlFor="name"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Nom *
      </label>
      <input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        disabled={submitting}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div className="md:col-span-2">
      <label
        htmlFor="description"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows="3"
        value={form.description}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>
  </div>

  <section>
    <h2 className="mb-4 text-lg font-semibold text-gray-900">
      Paramètres par défaut
    </h2>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <label
          htmlFor="default_quantity"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Quantité par défaut
        </label>
        <input
          id="default_quantity"
          name="default_quantity"
          type="number"
          step="any"
          min="0"
          value={form.default_quantity}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="default_unit_price"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Prix unitaire
        </label>
        <input
          id="default_unit_price"
          name="default_unit_price"
          type="number"
          step="0.01"
          min="0"
          value={form.default_unit_price}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="default_margin_percentage"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Marge par défaut (%)
        </label>
        <input
          id="default_margin_percentage"
          name="default_margin_percentage"
          type="number"
          step="0.01"
          min="0"
          value={form.default_margin_percentage}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="unit"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Unité
        </label>
        <input
          id="unit"
          name="unit"
          type="text"
          value={form.unit}
          onChange={handleChange}
          disabled={submitting}
          placeholder="hour, m², forfait..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
    </div>
  </section>

  <section>
    <h2 className="mb-4 text-lg font-semibold text-gray-900">
      Structure des coûts
    </h2>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <label
          htmlFor="labor_cost"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Main-d'œuvre
        </label>
        <input
          id="labor_cost"
          name="labor_cost"
          type="number"
          step="0.01"
          min="0"
          value={form.labor_cost}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="material_cost"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Matériaux
        </label>
        <input
          id="material_cost"
          name="material_cost"
          type="number"
          step="0.01"
          min="0"
          value={form.material_cost}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="equipment_cost"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Équipement
        </label>
        <input
          id="equipment_cost"
          name="equipment_cost"
          type="number"
          step="0.01"
          min="0"
          value={form.equipment_cost}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="overhead_cost"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Frais généraux
        </label>
        <input
          id="overhead_cost"
          name="overhead_cost"
          type="number"
          step="0.01"
          min="0"
          value={form.overhead_cost}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
    </div>
  </section>

  <section>
    <h2 className="mb-4 text-lg font-semibold text-gray-900">
      Planification
    </h2>

    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label
          htmlFor="estimated_duration_minutes"
          className="mb-1 block text-sm font-medium text-gray-700"
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
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="position"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Position
        </label>
        <input
          id="position"
          name="position"
          type="number"
          min="0"
          value={form.position}
          onChange={handleChange}
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
    </div>
  </section>

  <label className="flex items-center gap-2">
    <input
      name="active"
      type="checkbox"
      checked={form.active}
      onChange={handleChange}
      disabled={submitting}
      className="h-4 w-4"
    />
    <span className="text-sm font-medium text-gray-700">
      Service actif
    </span>
  </label>

  <div className="flex gap-3">
    <button
      type="submit"
      disabled={submitting}
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {submitting ? 'Enregistrement...' : submitLabel}
    </button>

    <button
      type="button"
      onClick={onCancel}
      disabled={submitting}
      className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700"
    >
      Annuler
    </button>
  </div>
</form>

)
}

export default ServiceItemForm
