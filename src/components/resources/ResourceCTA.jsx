import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ResourceCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 shadow-xl sm:px-10 lg:px-14 lg:py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Passez à l'action
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à mieux piloter votre entreprise de paysage ?
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              GreenPilot centralise vos clients, sites, devis, planning,
              équipes, chantiers et facturation dans un seul outil.
            </p>

            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-400"
              >
                Créer mon compte
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
