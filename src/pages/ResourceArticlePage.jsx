import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import {
  getCategoryBySlug,
  getRelatedResources,
  getResourceBySlug,
} from '../data/resources'
import { resourceContent } from '../data/resourceContent'
import ResourceCard from '../components/resources/ResourceCard'
import ResourceCTA from '../components/resources/ResourceCTA'
import ResourceSEO from '../components/seo/ResourceSEO'

export default function ResourceArticlePage() {
  const { category, slug } = useParams()

  const resource = getResourceBySlug(slug)
  const currentCategory = getCategoryBySlug(category)

  if (!resource || !currentCategory || resource.category !== category) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Article introuvable
        </h1>

        <p className="mt-4 text-slate-600">
          Cet article n'existe pas ou n'est plus disponible.
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

  const content = resourceContent[resource.slug] || []
  const relatedResources = getRelatedResources(resource)

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(resource.publishedAt))

  return (
    <main className="bg-white">
      <ResourceSEO title={resource.title} description={resource.excerpt} canonicalPath={`/ressources/${resource.category}/${resource.slug}`} publishedAt={resource.publishedAt} />
      <article>
        <header className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
            <Link
              to="/ressources"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Toutes les ressources
            </Link>

            <div className="mt-8">
              <Link
                to={`/ressources/${currentCategory.slug}`}
                className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                {currentCategory.name}
              </Link>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-6 text-xl leading-8 text-slate-600">
                {resource.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{formattedDate}</span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {resource.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-20">
          <div className="prose prose-slate max-w-none">
            {content.map((section, index) => {
              if (section.type === 'heading') {
                return (
                  <h2
                    key={`${resource.slug}-${index}`}
                    className="mb-4 mt-10 text-2xl font-bold tracking-tight text-slate-900 first:mt-0"
                  >
                    {section.content}
                  </h2>
                )
              }

              return (
                <p
                  key={`${resource.slug}-${index}`}
                  className="mb-6 text-lg leading-8 text-slate-700"
                >
                  {section.content}
                </p>
              )
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              GreenPilot
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Centralisez votre activité de paysage
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Clients, sites, devis, planning, équipes, chantiers et
              facturation : GreenPilot réunit les principales opérations de
              votre entreprise dans un seul environnement.
            </p>

            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Découvrir GreenPilot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      {relatedResources.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                À lire également
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Articles associés
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedResources.map((relatedResource) => (
                <ResourceCard
                  key={relatedResource.slug}
                  resource={relatedResource}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <ResourceCTA />
    </main>
  )
}
