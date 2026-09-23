
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16 lg:px-8 lg:py-28">
        {/* Content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-sm font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            La plateforme de pilotage pour les entreprises de paysage
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Pilotez votre entreprise de paysage depuis un seul endroit.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Clients, sites, devis, équipes, chantiers et facturation.
            GreenPilot rassemble les opérations essentielles de votre
            entreprise dans une seule plateforme.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Se connecter
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <a
              href="#modules"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              Découvrir la plateforme
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Une seule plateforme
            </span>

            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Pensée pour le paysage
            </span>

            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Simple à prendre en main
            </span>
          </div>
        </div>

        {/* Real Dashboard preview */}
        <div className="relative min-w-0 lg:-mr-24">
          <div className="absolute -inset-10 rounded-[2rem] bg-green-100/70 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard GreenPilot — vue d'ensemble de l'activité"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;