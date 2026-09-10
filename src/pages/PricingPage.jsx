import { Link } from "react-router-dom";

const plans = [
  {
    name: "Solo",
    description: "Pour les indépendants et les petites activités.",
    price: "29",
    features: [
      "Clients & Sites",
      "Devis",
      "Planning",
      "Chantiers",
      "Facturation",
      "Rapports",
    ],
    highlighted: false,
  },
  {
    name: "Équipe",
    description: "Pour les entreprises avec plusieurs collaborateurs.",
    price: "59",
    features: [
      "Tout le contenu de Solo",
      "Équipes",
      "Véhicules",
      "Équipements",
      "Coordination des interventions",
      "Suivi terrain",
    ],
    highlighted: true,
  },
  {
    name: "Entreprise",
    description: "Pour les structures avec plusieurs équipes.",
    price: "99",
    features: [
      "Tout le contenu d'Équipe",
      "Pilotage avancé",
      "Indicateurs d'activité",
      "Suivi de rentabilité",
      "Vision globale de l'entreprise",
      "Accompagnement renforcé",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Puis-je changer d'offre ?",
    answer:
      "Oui. Votre offre pourra évoluer avec votre entreprise afin de vous permettre d'utiliser UseGreenPilot avec un niveau de gestion adapté à votre activité.",
  },
  {
    question: "Puis-je résilier mon abonnement ?",
    answer:
      "Oui. Les modalités de résiliation seront présentées clairement au moment de la souscription.",
  },
  {
    question: "Combien d'utilisateurs puis-je avoir ?",
    answer:
      "Le nombre d'utilisateurs dépendra de l'offre choisie et du fonctionnement de votre entreprise. Les limites applicables seront précisées avant la souscription.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "UseGreenPilot est conçu pour centraliser les données de votre entreprise dans un environnement sécurisé. Les informations relatives au traitement et à la protection des données sont détaillées dans notre politique de confidentialité.",
  },
  {
    question: "Puis-je utiliser UseGreenPilot depuis mon téléphone ?",
    answer:
      "UseGreenPilot est conçu comme une application web accessible depuis les appareils compatibles avec un navigateur moderne. L'expérience mobile sera progressivement améliorée avec l'évolution du produit.",
  },
];

function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Tarifs
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Des outils simples pour mieux piloter votre entreprise.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Choisissez l'offre adaptée à la taille de votre activité et
            centralisez vos clients, sites, devis, équipes et chantiers dans
            UseGreenPilot.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-emerald-500 shadow-lg shadow-emerald-100"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    Recommandé
                  </span>
                )}

                <h2 className="text-xl font-semibold text-slate-950">
                  {plan.name}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-bold tracking-tight text-slate-950">
                    {plan.price}€
                  </span>
                  <span className="pb-2 text-sm text-slate-500">/ mois</span>
                </div>

                <Link
                  to="/register"
                  className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-emerald-500 text-white hover:bg-emerald-400"
                      : "border border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  Commencer avec UseGreenPilot
                </Link>

                <div className="mt-8 border-t border-slate-200 pt-7">
                  <p className="text-sm font-semibold text-slate-950">
                    Inclus dans l'offre
                  </p>

                  <ul className="mt-5 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-sm leading-6 text-slate-600"
                      >
                        <span
                          className="mt-1 text-emerald-600"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Pourquoi UseGreenPilot
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Pas besoin de multiplier les outils.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Centralisez
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Retrouvez les informations de votre activité au même endroit,
                des clients aux sites et aux chantiers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Organisez
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Donnez à vos équipes une vision claire des interventions, des
                chantiers et des ressources.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-950">Pilotez</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Suivez votre activité et utilisez vos données pour prendre de
                meilleures décisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Questions fréquentes
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Tout savoir avant de commencer
            </h2>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-6">
                    {faq.question}
                    <span
                      className="text-xl text-slate-400 transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prêt à mieux piloter votre activité ?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Découvrez comment UseGreenPilot peut simplifier votre quotidien et vous
            aider à garder le contrôle de votre activité.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Commencer avec UseGreenPilot
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Contacter UseGreenPilot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PricingPage;