import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ClipboardList,
  Hammer,
  Laptop,
  Users,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { resourceCategories } from '../../data/resources'

const icons = {
  gestion: BriefcaseBusiness,
  planning: ClipboardList,
  devis: Calculator,
  chantiers: Hammer,
  rentabilite: BarChart3,
  management: Users,
  digitalisation: Laptop,
  temoignages: Wrench,
}

export default function ResourceCategories() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Explorer par sujet
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Des ressources pensées pour les professionnels du paysage.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Retrouvez nos conseils autour de la gestion, du planning, des
            devis, des chantiers, des équipes et de la rentabilité.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resourceCategories.map((category) => {
            const Icon = icons[category.slug] || Wrench

            return (
              <Link
                key={category.slug}
                to={`/ressources/${category.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-semibold text-slate-950">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Explorer
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
