import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileBarChart,
  Gauge,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";

const metrics = [
  {
    label: "Chiffre d'affaires",
    value: "184 250 €",
    variation: "+12,8 %",
    description: "vs période précédente",
    icon: CircleDollarSign,
  },
  {
    label: "Marge moyenne",
    value: "31,6 %",
    variation: "+4,2 pts",
    description: "sur les chantiers clôturés",
    icon: TrendingUp,
  },
  {
    label: "Temps facturable",
    value: "78,4 %",
    variation: "+6,1 %",
    description: "du temps terrain",
    icon: Clock3,
  },
  {
    label: "Rentabilité",
    value: "42 680 €",
    variation: "+18,4 %",
    description: "résultat opérationnel estimé",
    icon: Gauge,
  },
];

const profitabilityRows = [
  {
    name: "Entretien Domaine des Pins",
    category: "Entretien récurrent",
    revenue: "8 420 €",
    costs: "4 860 €",
    margin: "42,3 %",
    status: "Très rentable",
  },
  {
    name: "Aménagement Villa Horizon",
    category: "Création paysagère",
    revenue: "14 800 €",
    costs: "10 920 €",
    margin: "26,2 %",
    status: "À surveiller",
  },
  {
    name: "Taille & Élagage Centre-ville",
    category: "Élagage",
    revenue: "6 950 €",
    costs: "3 420 €",
    margin: "50,8 %",
    status: "Très rentable",
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: "Une vision claire de votre activité",
    description:
      "Suivez les indicateurs qui comptent vraiment pour comprendre la santé économique de votre entreprise.",
  },
  {
    icon: TrendingUp,
    title: "Identifiez ce qui est rentable",
    description:
      "Comparez vos chantiers, prestations et activités pour savoir où votre entreprise crée réellement de la valeur.",
  },
  {
    icon: Clock3,
    title: "Maîtrisez le temps passé",
    description:
      "Comparez le temps prévu au temps réellement réalisé pour détecter rapidement les dérives.",
  },
  {
    icon: CircleDollarSign,
    title: "Gardez le contrôle des coûts",
    description:
      "Mettez en relation main-d'œuvre, matériel, achats et chiffre d'affaires pour mieux comprendre vos marges.",
  },
  {
    icon: LineChart,
    title: "Suivez vos performances dans le temps",
    description:
      "Analysez l'évolution de votre activité pour prendre de meilleures décisions mois après mois.",
  },
  {
    icon: FileBarChart,
    title: "Décidez avec des données fiables",
    description:
      "Centralisez vos données opérationnelles afin de remplacer les estimations dispersées par une vision consolidée.",
  },
];

const indicators = [
  "Chiffre d'affaires par période",
  "Marge par chantier",
  "Temps prévu vs temps réalisé",
  "Coûts de main-d'œuvre",
  "Coûts matériels et achats",
  "Performance des équipes",
];

const featureRoutes = [
  {
    label: "Clients & Sites",
    path: "/fonctionnalites/clients-sites",
  },
  {
    label: "Devis",
    path: "/fonctionnalites/devis",
  },
  {
    label: "Planning & Équipes",
    path: "/fonctionnalites/planning-equipes",
  },
  {
    label: "Chantiers & Terrain",
    path: "/fonctionnalites/chantiers-terrain",
  },
  {
    label: "Facturation",
    path: "/fonctionnalites/facturation",
  },
];

function PilotageProfitabilityPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-950"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              Use
            </span>
            GreenPilot
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Accueil
            </Link>

            <Link
              to="/fonctionnalites"
              className="text-sm font-medium text-slate-950"
            >
              Fonctionnalités
            </Link>

            <Link
              to="/tarifs"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Tarifs
            </Link>

            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Se connecter
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Commencer
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-emerald-700">
                <Gauge className="h-4 w-4" />
                Pilotage & Rentabilité
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Pilotez votre rentabilité avec une vision claire de votre
                activité.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Transformez vos données de terrain, vos devis, vos heures et
                votre facturation en indicateurs simples pour comprendre ce qui
                fonctionne, anticiper les écarts et prendre de meilleures
                décisions.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Découvrir GreenPilot
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/fonctionnalites"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Voir toutes les fonctionnalités
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Données centralisées
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Vision en temps réel
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Décisions plus rapides
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-emerald-100/50 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="border-b border-slate-200 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        Pilotage
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Vue d'ensemble · Septembre 2026
                      </p>
                    </div>

                    <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      +12,8 %
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-slate-200">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;

                    return (
                      <div key={metric.label} className="bg-white p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-medium text-slate-500">
                              {metric.label}
                            </p>
                            <p className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                              {metric.value}
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-100 p-2">
                            <Icon className="h-4 w-4 text-slate-600" />
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs font-semibold text-emerald-600">
                            {metric.variation}
                          </span>
                          <span className="text-xs text-slate-400">
                            {metric.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        Évolution de la marge
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Sur les 6 derniers mois
                      </p>
                    </div>

                    <LineChart className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="relative h-36 overflow-hidden rounded-xl bg-slate-50">
                    <div className="absolute inset-x-0 top-8 border-t border-dashed border-slate-200" />
                    <div className="absolute inset-x-0 top-16 border-t border-dashed border-slate-200" />
                    <div className="absolute inset-x-0 top-24 border-t border-dashed border-slate-200" />

                    <svg
                      viewBox="0 0 500 140"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 108 C45 102, 65 96, 105 99 S160 88, 200 91 S255 68, 295 76 S350 58, 390 63 S445 40, 500 34"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-emerald-500"
                      />
                    </svg>

                    <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] text-slate-400">
                      <span>Avr.</span>
                      <span>Mai</span>
                      <span>Juin</span>
                      <span>Juil.</span>
                      <span>Août</span>
                      <span>Sept.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Une entreprise rentable se pilote
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Ne regardez plus uniquement votre chiffre d'affaires.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Un chantier peut générer beaucoup de chiffre d'affaires tout en
                consommant trop d'heures, de matériel ou de ressources.
                GreenPilot vous aide à regarder l'ensemble de l'équation.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <CircleDollarSign className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Ce que vous facturez
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Visualisez votre chiffre d'affaires, vos devis acceptés et vos
                  factures pour comprendre votre niveau d'activité.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Clock3 className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Ce que vous consommez
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Mesurez le temps passé, les ressources mobilisées et les coûts
                  associés à vos opérations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  Ce que vous gagnez réellement
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Identifiez vos marges et les activités qui contribuent le plus
                  à la performance globale de votre entreprise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Rentabilité par chantier
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Sachez quels chantiers méritent vraiment votre attention.
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Comparez le chiffre d'affaires généré aux coûts et au temps
                  réellement consommés. Vous obtenez une lecture plus précise de
                  la performance de chaque chantier.
                </p>

                <div className="mt-8 space-y-4">
                  {indicators.slice(0, 4).map((indicator) => (
                    <div key={indicator} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {indicator}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      Performance des chantiers
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Vue synthétique
                    </p>
                  </div>

                  <PieChart className="h-5 w-5 text-slate-500" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Chantier
                        </th>
                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          CA
                        </th>
                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Coûts
                        </th>
                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Marge
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {profitabilityRows.map((row) => (
                        <tr
                          key={row.name}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-slate-900">
                              {row.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {row.category}
                            </p>
                          </td>

                          <td className="px-4 py-5 text-sm font-medium text-slate-700">
                            {row.revenue}
                          </td>

                          <td className="px-4 py-5 text-sm font-medium text-slate-700">
                            {row.costs}
                          </td>

                          <td className="px-4 py-5">
                            <div>
                              <p className="text-sm font-bold text-slate-950">
                                {row.margin}
                              </p>
                              <p
                                className={`mt-1 text-xs font-medium ${
                                  row.status === "Très rentable"
                                    ? "text-emerald-600"
                                    : "text-amber-600"
                                }`}
                              >
                                {row.status}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      18 chantiers analysés
                    </span>
                    <span className="font-semibold text-emerald-600">
                      Marge moyenne : 31,6 %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Tout ce qu'il faut pour piloter
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Des indicateurs conçus pour les entreprises de paysage.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                GreenPilot rapproche les informations commerciales,
                opérationnelles et financières pour vous donner une vision
                réellement exploitable.
              </p>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article key={benefit.title}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  De l'opérationnel au pilotage
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Vos équipes travaillent sur le terrain. Vous gardez la
                  maîtrise de l'entreprise.
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Les informations saisies dans les différents modules
                  GreenPilot alimentent progressivement une vision consolidée de
                  votre activité.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {indicators.map((indicator) => (
                    <div
                      key={indicator}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {indicator}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="font-bold text-slate-950">
                      Une seule vision de l'entreprise
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Du premier contact client au résultat du chantier.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {featureRoutes.map((feature, index) => (
                    <Link
                      key={feature.path}
                      to={feature.path}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700">
                          {index + 1}
                        </span>

                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-950">
                          {feature.label}
                        </span>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                    </Link>
                  ))}

                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
                        <BarChart3 className="h-4 w-4 text-emerald-700" />
                      </span>

                      <span className="text-sm font-bold text-emerald-800">
                        Pilotage & Rentabilité
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-emerald-600">
                      Vous êtes ici
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Passez au pilotage
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ne pilotez plus votre entreprise à l'intuition.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Centralisez vos opérations, mesurez vos performances et prenez vos
              décisions avec une vision claire de votre rentabilité.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Commencer avec GreenPilot
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold text-slate-950">GreenPilot</p>
            <p className="mt-1 text-xs text-slate-500">
              Pilotez votre entreprise de paysage depuis un seul endroit.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <Link
              to="/fonctionnalites"
              className="transition hover:text-slate-950"
            >
              Fonctionnalités
            </Link>
            <Link to="/tarifs" className="transition hover:text-slate-950">
              Tarifs
            </Link>
            <Link to="/contact" className="transition hover:text-slate-950">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PilotageProfitabilityPage;