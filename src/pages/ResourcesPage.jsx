import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getFeaturedResources,
  resources,
} from '../data/resources'
import ResourceCard from '../components/resources/ResourceCard'
import ResourceCategories from '../components/resources/ResourceCategories'
import ResourceCTA from '../components/resources/ResourceCTA'
import ResourceSEO from '../components/seo/ResourceSEO'

export default function ResourcesPage() {
  const featuredResources = getFeaturedResources()
  const latestResources = resources.slice(0, 6)

  return (
    <main className="bg-white">
      <ResourceSEO title="Ressources pour les entreprises de paysage" description="Conseils, méthodes et bonnes pratiques pour gérer, planifier et développer une entreprise de paysage." canonicalPath="/ressources" type="website" />
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
              <BookOpen className="h-3.5 w-3.5" />
              Ressources GreenPilot
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Mieux gérer une entreprise de paysage, simplement.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Conseils pratiques, méthodes et retours d'expérience pour
              améliorer votre gestion, votre planning, vos devis, vos
              chantiers et votre rentabilité.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#articles"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
              >
                Découvrir les articles
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                to="/register"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Découvrir GreenPilot
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                À la une
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Les articles à découvrir
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Des contenus conçus pour répondre aux problèmes concrets
              rencontrés au quotidien par les entreprises du paysage.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
                featured
              />
            ))}
          </div>
        </div>
      </section>

      <ResourceCategories />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Tous les articles
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Les dernières ressources
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
              />
            ))}
          </div>
        </div>
      </section>

      <ResourceCTA />
    </main>
  )
}
