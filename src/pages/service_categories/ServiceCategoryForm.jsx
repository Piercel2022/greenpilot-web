import { useState } from 'react'

const initialForm = {
code: '',
name: '',
description: '',
category_type: '',
position: '',
active: true,
}

export default function ServiceCategoryForm({
initialValues = {},
onSubmit,
onCancel,
submitting = false,
submitLabel = 'Enregistrer',
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

function handleSubmit(event) {
event.preventDefault()

onSubmit({
  ...form,
  position: form.position === '' ? null : Number(form.position),
})


}

return ( <form onSubmit={handleSubmit} className="space-y-6"> <div className="grid gap-6 md:grid-cols-2"> <div> <label
         htmlFor="code"
         className="mb-2 block text-sm font-medium text-gray-700"
       >
Code </label> <input
         id="code"
         name="code"
         type="text"
         value={form.code}
         onChange={handleChange}
         required
         disabled={submitting}
         className="w-full rounded-lg border border-gray-300 px-3 py-2"
       /> </div>


    <div>
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Nom
      </label>
      <input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        required
        disabled={submitting}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div>
      <label
        htmlFor="category_type"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Type de catégorie
      </label>
      <input
        id="category_type"
        name="category_type"
        type="text"
        value={form.category_type}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div>
      <label
        htmlFor="position"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Position
      </label>
      <input
        id="position"
        name="position"
        type="number"
        value={form.position}
        onChange={handleChange}
        disabled={submitting}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
      value={form.description}
      onChange={handleChange}
      rows={4}
      disabled={submitting}
      className="w-full rounded-lg border border-gray-300 px-3 py-2"
    />
  </div>

  <div className="flex items-center gap-3">
    <input
      id="active"
      name="active"
      type="checkbox"
      checked={form.active}
      onChange={handleChange}
      disabled={submitting}
      className="h-4 w-4 rounded border-gray-300"
    />
    <label htmlFor="active" className="text-sm font-medium text-gray-700">
      Catégorie active
    </label>
  </div>

  <div className="flex gap-3">
    <button
      type="submit"
      disabled={submitting}
      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {submitting ? 'Enregistrement...' : submitLabel}
    </button>

    <button
      type="button"
      onClick={onCancel}
      disabled={submitting}
      className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Annuler
    </button>
  </div>
</form>

)
}
