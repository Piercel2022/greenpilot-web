import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Découvrir UseGreenPilot",
    description:
      "Comprendre UseGreenPilot, son fonctionnement et les entreprises auxquelles il s'adresse.",
    questions: [
      "Qu'est-ce que UseGreenPilot ?",
      "À qui s'adresse UseGreenPilot ?",
      "Quels problèmes UseGreenPilot permet-il de résoudre ?",
      "UseGreenPilot convient-il aux petites entreprises ?",
    ],
  },
  {
    title: "Utiliser UseGreenPilot",
    description:
      "Retrouver les réponses aux questions concernant les clients, sites, devis, équipes et chantiers.",
    questions: [
      "Comment créer un client ?",
      "Comment gérer plusieurs sites pour un même client ?",
      "Comment créer un devis ?",
      "Comment organiser les équipes et les interventions ?",
    ],
  },
  {
    title: "Compte & abonnement",
    description:
      "Tout savoir sur votre compte, votre abonnement et l'évolution de votre offre.",
    questions: [
      "Comment créer un compte ?",
      "Comment fonctionne la tarification ?",
      "Puis-je changer d'offre ?",
      "Comment résilier mon abonnement ?",
    ],
  },
  {
    title: "Assistance",
    description:
      "Besoin d'aide ou de nous signaler un problème ? Retrouvez ici les premières réponses.",
    questions: [
      "Que faire si je rencontre un problème technique ?",
      "Comment contacter UseGreenPilot ?",
      "Comment signaler un bug ?",
    ],
  },
];

const faqs = [
  {
    question: "Qu'est-ce que UseGreenPilot ?",
    answer:
      "UseGreenPilot est un logiciel de gestion conçu pour les entreprises du paysage et de l'environnement. Il permet de centraliser les clients, sites, devis, équipes, chantiers, équipements et facturation dans un seul espace.",
  },
  {
    question: "Pour quelles entreprises UseGreenPilot est-il conçu ?",
    answer:
      "UseGreenPilot s'adresse notamment aux paysagistes, jardiniers, élagueurs, arboristes et entreprises spécialisées dans l'entretien ou l'aménagement des espaces verts.",
  },
  {
    question: "UseGreenPilot est-il adapté à une petite entreprise ?",
    answer:
      "Oui. UseGreenPilot est conçu pour accompagner les entreprises du paysage dans leur organisation quotidienne, qu'elles travaillent seules ou avec plusieurs collaborateurs.",
  },
  {
    question: "Puis-je gérer plusieurs sites pour un même client ?",
    answer:
      "Oui. Un même client peut être associé à plusieurs sites : résidence, jardin, parking, copropriété, espace professionnel ou tout autre lieu d'intervention.",
  },
  {
    question: "Puis-je gérer mes devis et mes chantiers depuis UseGreenPilot ?",
    answer:
      "Oui. UseGreenPilot permet de suivre le cycle de gestion depuis le client et son site jusqu'au devis, au chantier et aux différentes étapes de réalisation.",
  },
  {
    question: "Comment obtenir de l'aide ?",
    answer:
      "Si vous ne trouvez pas la réponse à votre question dans cette page, vous pouvez contacter l'équipe UseGreenPilot directement depuis la page Contact.",
  },
];

function HelpPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Centre d'aide
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Comment pouvons-nous vous aider ?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Retrouvez les réponses aux questions les plus fréquentes sur
            UseGreenPilot, son fonctionnement et ses fonctionnalités.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <label htmlFor="help-search" className="sr-only">
              Rechercher une question
            </label>

            <input
              id="help-search"
              type="search"
              placeholder="Rechercher une question…"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Ressources
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Trouvez rapidement ce dont vous avez besoin
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {category.questions.map((question) => (
                    <li
                      key={question}
                      className="border-t border-slate-100 pt-3 text-sm text-slate-600"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Questions fréquentes
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Les réponses aux questions essentielles
            </h2>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-900">
                      {faq.question}
                    </span>

                    <span
                      className="shrink-0 text-xl text-slate-400"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="max-w-3xl text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Vous ne trouvez pas la réponse ?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Notre équipe est là pour vous aider et répondre à vos questions
            concernant UseGreenPilot.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Contacter UseGreenPilot
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Découvrir UseGreenPilot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HelpPage;