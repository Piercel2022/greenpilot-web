 function CTASection() {
  return (
    <section className="bg-slate-900 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
          Passez à l'action
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Prêt à reprendre le contrôle de votre activité ?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Centralisez votre entreprise, simplifiez votre quotidien et pilotez
          votre rentabilité depuis un seul endroit.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg"
          >
            Commencer avec GreenPilot
          </a>

          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-slate-500 hover:bg-slate-800"
          >
            Découvrir la plateforme
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Une plateforme pensée pour les entreprises du paysage et de
          l'environnement.
        </p>
      </div>
    </section>
  );
}
export default CTASection;