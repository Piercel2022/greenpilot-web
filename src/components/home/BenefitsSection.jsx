import {
  Clock3,
  MessagesSquare,
  Receipt,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Clock3,
    title: "Gagnez du temps",
    description:
      "Retrouvez rapidement les informations dont vous avez besoin et réduisez les tâches administratives répétitives.",
  },
  {
    icon: MessagesSquare,
    title: "Gardez tout le monde aligné",
    description:
      "Les équipes disposent des mêmes informations, du bureau jusqu'au terrain, au bon moment.",
  },
  {
    icon: Receipt,
    title: "Facturez plus rapidement",
    description:
      "Ne laissez plus les prestations réalisées attendre avant d'être transformées en factures.",
  },
  {
    icon: TrendingUp,
    title: "Pilotez avec vos chiffres",
    description:
      "Suivez votre activité, vos coûts et vos marges pour savoir où vous gagnez réellement de l'argent.",
  },
];

 function BenefitsSection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Les bénéfices
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Moins de dispersion. Plus de maîtrise.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            GreenPilot vous aide à mieux organiser votre quotidien pour
            consacrer davantage de temps à vos clients, vos équipes et au
            développement de votre entreprise.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default BenefitsSection;