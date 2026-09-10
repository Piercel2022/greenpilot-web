
function ProductPreviewSection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Découvrez UseGreenPilot
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Votre activité, enfin réunie au même endroit
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Une interface pensée pour vous donner une vision claire de votre
            entreprise, de vos clients jusqu'au suivi de votre activité.
          </p>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-green-100/50 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Browser bar */}
            <div className="flex h-12 items-center gap-2 border-b border-slate-200 px-4">
              <span className="h-3 w-3 rounded-full bg-slate-200" />
              <span className="h-3 w-3 rounded-full bg-slate-200" />
              <span className="h-3 w-3 rounded-full bg-slate-200" />

              <div className="ml-4 h-7 flex-1 rounded-md bg-slate-50" />
            </div>

            {/* Screenshot placeholder */}
            <div className="flex min-h-[420px] items-center justify-center bg-slate-50 p-6 sm:p-10">
              <div className="w-full max-w-4xl rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-green-50">
                  <svg
                    className="h-7 w-7 text-green-600"
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

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  Aperçu du Dashboard UseGreenPilot
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  La capture réelle de votre application sera intégrée ici
                  pour présenter l'interface et les fonctionnalités de
                  GreenPilot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting points */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-900">
              Une vue centralisée
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Retrouvez les informations essentielles de votre activité
              depuis un même espace.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-900">
              Des données accessibles
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Consultez rapidement les informations dont vous avez besoin
              pour suivre votre activité.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-900">
              Un pilotage plus simple
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Passez moins de temps à organiser vos informations et plus de
              temps à piloter votre entreprise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPreviewSection;