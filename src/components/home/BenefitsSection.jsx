import {
  Clock3,
  MessagesSquare,
  Receipt,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Clock3,
    title: "Gagnez du temps au quotidien",
    description:
      "Retrouvez vos informations rapidement et réduisez les tâches administratives qui ralentissent votre activité.",
  },
  {
    icon: MessagesSquare,
    title: "Coordonnez mieux vos équipes",
    description:
      "Le bureau et le terrain travaillent avec les mêmes informations pour que chaque intervention soit mieux préparée.",
  },
  {
    icon: Receipt,
    title: "Accélérez votre facturation",
    description:
      "Gardez une continuité entre les prestations réalisées, leur suivi et la facturation de vos clients.",
  },
  {
    icon: TrendingUp,
    title: "Pilotez votre rentabilité",
    description:
      "Disposez d'une vision plus claire de votre activité, de vos coûts et de vos marges pour prendre de meilleures décisions.",
  },
];

function BenefitsSection() {
  return (
    <section
      id="pourquoi-greenpilot"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Les bénéfices
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Moins de gestion. Plus de maîtrise.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            UseGreenPilot transforme vos informations dispersées en un système
            de pilotage clair, pour mieux organiser votre activité et vous
            concentrer sur ce qui compte vraiment.
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
