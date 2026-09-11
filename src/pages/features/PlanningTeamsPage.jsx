import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  Truck,
  CloudSun,
  ClipboardCheck,
  Layers3,
  RefreshCw,
} from "lucide-react";

const problems = [
  {
    icon: CalendarDays,
    title: "Un planning difficile à tenir",
    description:
      "Les interventions sont réparties entre agenda, fichiers, messages et mémoire. Les changements deviennent vite difficiles à suivre.",
  },
  {
    icon: Users,
    title: "Des équipes difficiles à coordonner",
    description:
      "Il faut savoir qui intervient, où, quand, avec quelles compétences et avec quelles ressources.",
  },
  {
    icon: MapPin,
    title: "Des informations dispersées",
    description:
      "Le lieu, les prestations, les consignes et les informations client ne sont pas toujours accessibles au même endroit.",
  },
  {
    icon: Clock3,
    title: "Des journées peu optimisées",
    description:
      "Les déplacements, les temps d'intervention et les changements de dernière minute peuvent réduire la productivité.",
  },
  {
    icon: Truck,
    title: "Des ressources à coordonner",
    description:
      "Véhicules, équipements et équipes doivent être disponibles au bon moment pour éviter les blocages sur le terrain.",
  },
  {
    icon: RefreshCw,
    title: "Des changements difficiles à absorber",
    description:
      "Une absence, une météo défavorable ou une urgence peut rapidement désorganiser plusieurs interventions.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Visualisez les interventions",
    description:
      "Retrouvez les chantiers et interventions planifiés dans une vue claire, structurée et exploitable.",
  },
  {
    step: "02",
    title: "Affectez les équipes",
    description:
      "Associez les bonnes personnes aux bonnes interventions en fonction des besoins du chantier.",
  },
  {
    step: "03",
    title: "Coordonnez les ressources",
    description:
      "Prenez en compte les véhicules, équipements et contraintes nécessaires à l'exécution.",
  },
  {
    step: "04",
    title: "Adaptez votre journée",
    description:
      "Réorganisez rapidement le planning lorsqu'un imprévu survient sans perdre la vision globale.",
  },
];

const capabilities = [
  {
    icon: CalendarDays,
    title: "Planning centralisé",
    description:
      "Une vision unique des interventions à venir, des équipes mobilisées et des journées à organiser.",
  },
  {
    icon: Users,
    title: "Affectation des équipes",
    description:
      "Associez chaque intervention aux collaborateurs concernés et gardez une vision claire des responsabilités.",
  },
  {
    icon: MapPin,
    title: "Localisation des interventions",
    description:
      "Identifiez rapidement où chaque équipe doit intervenir et retrouvez le contexte du site.",
  },
  {
    icon: Clock3,
    title: "Gestion du temps",
    description:
      "Organisez les journées en tenant compte des horaires et des temps consacrés aux interventions.",
  },
  {
    icon: Truck,
    title: "Ressources associées",
    description:
      "Coordonnez les véhicules et équipements nécessaires à la bonne réalisation des travaux.",
  },
  {
    icon: CloudSun,
    title: "Anticipation des imprévus",
    description:
      "Adaptez votre organisation lorsque la météo, les absences ou les urgences modifient le programme.",
  },
];

const exampleSteps = [
  {
    time: "07:30",
    title: "Départ de l'équipe",
    description:
      "L'équipe retrouve ses interventions, les adresses et les principales consignes de la journée.",
  },
  {
    time: "08:00",
    title: "Entretien récurrent",
    description:
      "Première intervention sur un site client avec les prestations prévues.",
  },
  {
    time: "10:30",
    title: "Deuxième intervention",
    description:
      "Le planning indique le prochain site et les ressources nécessaires.",
  },
  {
    time: "14:00",
    title: "Chantier important",
    description:
      "Une équipe dédiée intervient sur un chantier nécessitant davantage de temps et de matériel.",
  },
  {
    time: "17:00",
    title: "Fin de journée",
    description:
      "Les informations issues du terrain peuvent alimenter le suivi des chantiers et les prochaines actions.",
  },
];

const connections = [
  {
    icon: Users,
    title: "Clients & Sites",
    description:
      "Retrouvez le bon client et le bon site avant de planifier une intervention.",
    href: "/fonctionnalites/clients-sites",
  },
  {
    icon: ClipboardCheck,
    title: "Devis",
    description:
      "Transformez les prestations acceptées en interventions à organiser.",
    href: "/fonctionnalites/devis",
  },
  {
    icon: Layers3,
    title: "Chantiers & Terrain",
    description:
      "Passez naturellement du planning à l'exécution et au suivi terrain.",
    href: "/fonctionnalites/chantiers-terrain",
  },
  {
    icon: Truck,
    title: "Véhicules & Équipements",
    description:
      "Coordonnez les ressources nécessaires avec les équipes et les chantiers.",
    href: "/fonctionnalites/chantiers-terrain",
  },
  {
    icon: CheckCircle2,
    title: "Facturation",
    description:
      "Une intervention réalisée peut ensuite alimenter le processus de facturation.",
    href: "/fonctionnalites/facturation",
  },
  {
    icon: Layers3,
    title: "Pilotage & Rentabilité",
    description:
      "Transformez les données opérationnelles en indicateurs utiles à la gestion.",
    href: "/fonctionnalites/pilotage-rentabilite",
  },
];

const benefits = [
  "Une vision claire des journées à venir",
  "Une meilleure coordination des équipes",
  "Moins d'oublis et de doublons",
  "Une organisation plus simple face aux imprévus",
  "Une meilleure utilisation des ressources",
  "Une continuité entre bureau et terrain",
];

const moduleNavigation = {
  previous: {
    label: "Clients & Sites",
    href: "/fonctionnalites/clients-sites",
  },
  current: "Planning & Équipes",
  next: {
    label: "Chantiers & Terrain",
    href: "/fonctionnalites/chantiers-terrain",
  },
};

function PlanningTeamsPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Planning & Équipes
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Organisez vos journées, vos équipes et vos chantiers depuis un
              seul planning.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              GreenPilot vous aide à coordonner les interventions, les équipes
              et les ressources pour transformer votre planning en véritable
              outil de pilotage opérationnel.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Découvrir GreenPilot
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/fonctionnalites"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Voir toutes les fonctionnalités
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Le problème
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Un planning ne devrait pas devenir une source de stress.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Dans une entreprise de paysage, le planning doit absorber les
              équipes, les sites, les déplacements, les véhicules, les
              équipements et les imprévus. Sans outil centralisé, chaque
              changement peut devenir une nouvelle source de coordination.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;

              return (
                <article
                  key={problem.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {problem.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {problem.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                La solution GreenPilot
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Un planning pensé autour de votre activité terrain.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                GreenPilot rassemble les informations nécessaires à
                l'organisation des interventions afin que le bureau et les
                équipes terrain travaillent avec la même vision.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.slice(0, 4).map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Planning de la semaine
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Vue opérationnelle
                  </p>
                </div>

                <CalendarDays className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Lundi", "3 interventions", "2 équipes"],
                  ["Mardi", "4 interventions", "3 équipes"],
                  ["Mercredi", "5 interventions", "3 équipes"],
                  ["Jeudi", "4 interventions", "2 équipes"],
                  ["Vendredi", "6 interventions", "4 équipes"],
                ].map(([day, interventions, teams]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {day}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {interventions}
                      </p>
                    </div>

                    <p className="text-xs font-medium text-slate-500">
                      {teams}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Comment ça fonctionne
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              De la planification à l'intervention.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Le planning devient le point de coordination entre les
              informations commerciales, les équipes et l'exécution terrain.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="relative rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="text-sm font-bold text-emerald-600">
                  {item.step}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Capacités clés
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Tout ce qu'il faut pour mieux organiser vos journées.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {capability.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Cas concret
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Une journée organisée avant même le départ.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Imaginez une équipe qui connaît son programme avant de monter
                dans le véhicule. Les sites, horaires, prestations et
                ressources sont déjà structurés.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="space-y-4">
                {exampleSteps.map((item) => (
                  <div
                    key={item.time}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <div className="w-14 shrink-0 text-sm font-bold text-emerald-600">
                      {item.time}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Avant / Après
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Passez d'une organisation dispersée à une organisation maîtrisée.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Avant GreenPilot
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Planning sur plusieurs supports",
                  "Informations transmises par messages",
                  "Difficulté à suivre les changements",
                  "Ressources coordonnées manuellement",
                  "Vision limitée des journées",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">
                Avec GreenPilot
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Un planning centralisé",
                  "Une vision claire des équipes",
                  "Des interventions structurées",
                  "Des ressources mieux coordonnées",
                  "Une organisation plus facile à adapter",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connected ecosystem */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Écosystème connecté
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Le planning fonctionne avec les autres modules GreenPilot.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Une intervention ne vit pas isolément. Elle s'appuie sur un
              client, un site, un devis, des ressources et des informations
              terrain.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => {
              const Icon = connection.icon;

              return (
                <Link
                  key={connection.title}
                  to={connection.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-emerald-100 group-hover:text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-slate-950">
                      {connection.title}
                    </h3>

                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition group-hover:translate-x-1" />
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {connection.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Les bénéfices
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Un meilleur planning, c'est une meilleure entreprise.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Lorsque les équipes savent où elles doivent être, avec quelles
                ressources et pour quelle intervention, l'organisation devient
                plus fiable.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium leading-6 text-slate-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic message */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Notre vision
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Le planning doit devenir un outil de décision.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Un bon planning ne sert pas seulement à savoir qui travaille où.
            Il permet de mieux utiliser chaque heure, chaque équipe et chaque
            ressource.
          </p>
        </div>
      </section>

      {/* Module navigation */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3 md:items-center">
            <Link
              to={moduleNavigation.previous.href}
              className="group rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Module précédent
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <ArrowRight className="h-4 w-4 rotate-180 text-emerald-600 transition group-hover:-translate-x-1" />
                {moduleNavigation.previous.label}
              </div>
            </Link>

            <div className="rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                Module actuel
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {moduleNavigation.current}
              </p>
            </div>

            <Link
              to={moduleNavigation.next.href}
              className="group rounded-2xl border border-slate-200 p-5 text-right transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Module suivant
              </p>

              <div className="mt-2 flex items-center justify-end gap-2 text-sm font-semibold text-slate-900">
                {moduleNavigation.next.label}
                <ArrowRight className="h-4 w-4 text-emerald-600 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
            Passez à l'action
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Passez d'un planning dispersé à une organisation maîtrisée.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
            GreenPilot vous aide à structurer vos interventions, coordonner vos
            équipes et garder une vision claire de votre activité.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Découvrir GreenPilot
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/fonctionnalites"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Explorer les fonctionnalités
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlanningTeamsPage;