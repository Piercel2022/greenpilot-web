import { Link } from "react-router-dom";

 function HeroSection() {
return ( <section className="overflow-hidden bg-slate-50"> <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
{/* Content */} <div className="max-w-2xl"> <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-sm font-medium text-green-700"> <span className="h-2 w-2 rounded-full bg-green-600" />
La plateforme de pilotage pour les entreprises de paysage </div>

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
          to="/register"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          Commencer avec GreenPilot
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </Link>

        <a
          href="#plateforme"
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

    {/* Product preview placeholder */}
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-green-100/60 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex h-12 items-center gap-2 border-b border-slate-200 px-4">
          <span className="h-3 w-3 rounded-full bg-slate-200" />
          <span className="h-3 w-3 rounded-full bg-slate-200" />
          <span className="h-3 w-3 rounded-full bg-slate-200" />

          <div className="ml-4 h-7 flex-1 rounded-md bg-slate-50" />
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-48 rounded bg-slate-100" />
            </div>

            <div className="h-9 w-24 rounded-lg bg-green-100" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <div className="h-3 w-20 rounded bg-slate-100" />
              <div className="mt-3 h-8 w-16 rounded bg-slate-200" />
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <div className="h-3 w-20 rounded bg-slate-100" />
              <div className="mt-3 h-8 w-20 rounded bg-green-100" />
            </div>

            <div className="rounded-xl border border-slate-200 p-5 sm:col-span-2">
              <div className="mb-5 h-3 w-28 rounded bg-slate-100" />

              <div className="space-y-3">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-5/6 rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-green-100" />
                <div className="h-3 w-3/4 rounded bg-slate-100" />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
            <p className="text-sm font-medium text-slate-500">
              Aperçu du Dashboard GreenPilot
            </p>
            <p className="mt-1 text-xs text-slate-400">
              La capture réelle de votre application sera intégrée ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

);
}
export default HeroSection;