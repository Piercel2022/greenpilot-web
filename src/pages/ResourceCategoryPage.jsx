import { ArrowLeft, BookOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import {
  getCategoryBySlug,
  getResourcesByCategory,
} from '../data/resources'
import ResourceCard from '../components/resources/ResourceCard'
import ResourceCTA from '../components/resources/ResourceCTA'
import ResourceSEO from '../components/seo/ResourceSEO'
export default function ResourceCategoryPage() {
  const { category } = useParams()

  const currentCategory = getCategoryBySlug(category)
  const categoryResources = getResourcesByCategory(category)

  if (!currentCategory) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <BookOpen className="mx-auto mb-6 h-12 w-12 text-emerald-600" />

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Catégorie introuvable
        </h1>

        <p className="mt-4 text-slate-600">
          Cette catégorie de ressources n'existe pas ou n'est plus disponible.
        </p>

        <Link
          to="/ressources"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux ressources
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-white">
      <ResourceSEO title={`${currentCategory.name} — Conseils pour les entreprises de paysage`} description={currentCategory.description} canonicalPath={`/ressources/${currentCategory.slug}`} type="website"/>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            to="/ressources"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les ressources
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              Ressources · {currentCategory.name}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {currentCategory.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Articles
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Nos ressources sur {currentCategory.name.toLowerCase()}
          </h2>
        </div>

        {categoryResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-600">
              Les premiers articles de cette catégorie arrivent bientôt.
            </p>
          </div>
        )}
      </section>

      <ResourceCTA />
    </main>
    
  )
}
