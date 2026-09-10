
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { getPlans } from "../../services/plans";

const PLAN_CONTENT = {
  starter: {
    description:
      "Pour les indépendants et petites entreprises qui veulent structurer leur activité.",
    features: [
      "1 utilisateur",
      "Jusqu'à 50 clients",
      "Gestion des sites",
      "Devis",
      "Planning",
      "Facturation",
    ],
    cta: "Créer mon compte gratuitement",
    highlighted: false,
  },
  pro: {
    description:
      "Pour les entreprises qui veulent piloter toute leur activité au même endroit.",
    features: [
      "Jusqu'à 5 utilisateurs",
      "Clients et devis illimités",
      "Planning avancé",
      "Gestion des équipes",
      "Suivi terrain",
      "Rapports d'intervention",
      "Facturation",
      "Suivi des coûts et marges",
    ],
    cta: "Créer mon compte gratuitement",
    highlighted: true,
  },
  business: {
    description:
      "Pour les entreprises structurées avec une équipe plus importante.",
    features: [
      "Jusqu'à 15 utilisateurs",
      "Toutes les fonctionnalités Pro",
      "Insights avancés",
      "Automatisations",
      "Fonctionnalités IA",
      "Permissions avancées",
      "Rapports avancés",
      "Support prioritaire",
    ],
    cta: "Créer mon compte",
    highlighted: false,
  },
};

export default function PricingSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadPlans() {
      try {
        const data = await getPlans();

        if (mounted) {
          setPlans(data.filter((plan) => PLAN_CONTENT[plan.slug]));
        }
      } catch (err) {
        console.error("Unable to load pricing plans:", err);

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPlans();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="tarifs" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Tarifs
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Un prix simple pour une gestion plus efficace.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Commencez gratuitement, découvrez GreenPilot et choisissez ensuite
            l'offre qui correspond à la taille de votre entreprise.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[520px] animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              Les tarifs sont temporairement indisponibles.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Veuillez réessayer dans quelques instants.
            </p>
          </div>
        )}

        {/* Pricing cards */}
        {!loading && !error && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => {
              const content = PLAN_CONTENT[plan.slug];
              const price = Math.round(plan.monthly_price_cents / 100);

              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    content.highlighted
                      ? "border-emerald-500 bg-white shadow-lg ring-1 ring-emerald-500"
                      : "border-slate-200 bg-white shadow-sm"
                  }`}
                >
                  {/* Recommended badge */}
                  {content.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white">
                      Recommandé
                    </div>
                  )}

                  {/* Plan header */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {plan.name}
                    </h3>

                    <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
                      {content.description}
                    </p>

                    <div className="mt-8 flex items-end gap-2">
                      <span className="text-5xl font-bold tracking-tight text-slate-900">
                        {price}€
                      </span>

                      <span className="pb-1 text-sm text-slate-500">
                        /mois
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-8 flex-1 space-y-4 border-t border-slate-100 pt-8">
                    {content.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <Check
                            className="h-3.5 w-3.5"
                            strokeWidth={2.5}
                          />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/register"
                    className={`mt-8 block w-full rounded-xl px-5 py-3.5 text-center text-sm font-semibold transition-colors ${
                      content.highlighted
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "border border-slate-300 bg-white text-slate-900 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {content.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Founder offer */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-5 text-center">
          <p className="text-sm font-semibold text-emerald-800">
            Offre fondateur
          </p>

          <p className="mt-1 text-sm leading-6 text-emerald-700">
            Les premières entreprises GreenPilot pourront bénéficier d'un
            tarif fondateur de 39 €/mois à vie.
          </p>
        </div>
      </div>
    </section>
  );
}
