function ProductPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-green-50/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-sm font-medium text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Découvrez UseGreenPilot
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Toute votre activité.
            <span className="block text-green-600">
              Une seule interface.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Clients, sites, devis, planning, chantiers, facturation et
            rentabilité : GreenPilot rassemble les informations essentielles
            de votre entreprise au même endroit.
          </p>
        </div>

        {/* Product showcase */}
        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          {/* Outer glow */}
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-green-200/40 blur-3xl"
            aria-hidden="true"
          />

          {/* Browser frame */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)]">
            {/* Browser header */}
            <div className="flex h-12 items-center border-b border-slate-200 bg-white px-4">
              {/* Browser controls */}
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
              </div>

              {/* Address bar */}
              <div className="ml-5 flex h-7 flex-1 items-center rounded-md bg-slate-50 px-3">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-green-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  </div>

                  <span className="truncate text-xs text-slate-400">
                    app.usegreenpilot.pro/dashboard
                  </span>
                </div>
              </div>

              <div className="ml-4 hidden text-xs font-medium text-slate-400 sm:block">
                UseGreenPilot
              </div>
            </div>

            {/* Dashboard image */}
            <div className="bg-slate-100 p-2 sm:p-4 lg:p-5">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src="/images/dashboard-preview2.png"
                  alt="Dashboard UseGreenPilot avec vue globale de l'activité"
                  className="block h-auto w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Floating product badge */}
          <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-xl sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
              <svg
                className="h-5 w-5 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3v18h18" />
                <path d="m7 16 4-5 3 3 5-7" />
              </svg>
            </div>

            <div className="text-left">
              <p className="text-xs font-medium text-slate-500">
                Votre activité
              </p>
              <p className="text-sm font-semibold text-slate-900">
                Visible en un coup d'œil
              </p>
            </div>
          </div>
        </div>

        {/* Product value points */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 border-t border-slate-200 pt-12 sm:grid-cols-3">
          {/* Point 1 */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <svg
                className="h-5 w-5 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Une vision centralisée
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Toutes les informations importantes de votre entreprise
                accessibles depuis un seul espace.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <svg
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3v18h18" />
                <path d="m7 16 4-5 3 3 5-7" />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Des indicateurs utiles
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Suivez vos chiffres et votre activité sans multiplier les
                outils ou les fichiers.
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <svg
                className="h-5 w-5 text-amber-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Moins de gestion
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Passez moins de temps à chercher vos informations et plus de
                temps à piloter votre activité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPreviewSection;