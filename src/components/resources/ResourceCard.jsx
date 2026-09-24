import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryBySlug } from '../../data/resources'

export default function ResourceCard({ resource, featured = false }) {
  const category = getCategoryBySlug(resource.category)

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg ${
        featured ? 'lg:p-7' : ''
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {category?.name}
        </span>

        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Clock3 className="h-3.5 w-3.5" />
          {resource.readTime}
        </span>
      </div>

      <h3
        className={`font-semibold tracking-tight text-slate-950 ${
          featured ? 'text-2xl leading-tight' : 'text-xl leading-snug'
        }`}
      >
        {resource.title}
      </h3>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
        {resource.excerpt}
      </p>

      <div className="mt-6">
        <Link
          to={`/ressources/${resource.category}/${resource.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition group-hover:gap-3"
        >
          Lire l'article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
