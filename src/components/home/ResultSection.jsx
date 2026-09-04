 function ResultSection() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Une seule vision de votre activité
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              De la première demande à la rentabilité, tout est connecté.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              GreenPilot relie vos clients, vos devis, vos équipes, vos
              chantiers et votre facturation pour vous permettre de piloter
              votre activité avec une vision claire, au même endroit.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>

              <div className="p-6 sm:p-8">
                <div className="h-6 w-40 rounded bg-slate-100" />

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="h-28 rounded-2xl bg-slate-50" />
                  <div className="h-28 rounded-2xl bg-slate-50" />
                  <div className="h-28 rounded-2xl bg-slate-50" />
                  <div className="h-28 rounded-2xl bg-slate-50" />
                </div>

                <div className="mt-6 h-32 rounded-2xl bg-slate-50" />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ResultSection;