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
    title: "Un planning difficile à maintenir",
    description:
      "Les interventions sont réparties entre Excel, agendas, messages et notes personnelles.",
  },
  {
    icon: Users,
    title: "Des équipes difficiles à coordonner",
    description:
      "Il devient compliqué de savoir qui intervient, où, quand et avec quelles consignes.",
  },
  {
    icon: RefreshCw,
    title: "Les changements se multiplient",
    description:
      "Une absence, un retard ou une modification de chantier peut rapidement désorganiser toute la journée.",
  },
  {
    icon: Truck,
    title: "Les ressources sont dispersées",
    description:
      "Véhicules, équipements et équipes doivent être coordonnés pour éviter les conflits et les déplacements inutiles.",
  },
  {
    icon: MapPin,
    title: "Le terrain manque de visibilité",
    description:
      "Les équipes ont besoin des bonnes informations avant de partir sur chaque intervention.",
  },
  {
    icon: Clock3,
    title: "Du temps perdu chaque jour",
    description:
      "Une organisation fragmentée entraîne des appels, des recherches et des ajustements permanents.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Sélectionnez le chantier",
    description:
      "Retrouvez rapidement le chantier à planifier depuis les informations déjà enregistrées dans GreenPilot.",
  },
  {
    number: "02",
    title: "Choisissez la date",
    description:
      "Positionnez l'intervention dans le planning en fonction des disponibilités et des priorités.",
  },
  {
    number: "03",
    title: "Affectez une équipe",
    description:
      "Attribuez l'intervention à l'équipe la plus adaptée à la nature du chantier.",
  },
  {
    number: "04",
    title: "Préparez les ressources",
    description:
      "Coordonnez les véhicules et les équipements nécessaires pour éviter les conflits de ressources.",
  },
  {
    number: "05",
    title: "Partagez les informations",
    description:
      "Les équipes disposent des informations essentielles pour savoir où aller et quoi réaliser.",
  },
  {
    number: "06",
    title: "Suivez l'avancement",
    description:
      "Gardez une vision claire des interventions planifiées, en cours et terminées.",
  },
];

const capabilities = [
  {
    icon: CalendarDays,
    title: "Planning centralisé",
    description:
      "Visualisez les interventions et organisez les journées depuis un espace unique.",
  },
  {
    icon: Users,
    title: "Affectation des équipes",
    description:
      "Associez chaque chantier à l'équipe appropriée selon les besoins de l'intervention.",
  },
  {
    icon: Clock3,
    title: "Meilleure gestion du temps",
    description:
      "Structurez les journées et réduisez les temps morts liés à une organisation approximative.",
  },
  {
    icon: Truck,
    title: "Coordination des ressources",
    description:
      "Tenez compte des véhicules et équipements nécessaires lors de la préparation des interventions.",
  },
  {
    icon: CloudSun,
    title: "Anticipation terrain",
    description:
      "Adaptez votre organisation aux contraintes opérationnelles et aux conditions de terrain.",
  },
  {
    icon: ClipboardCheck,
    title: "Suivi des interventions",
    description:
      "Conservez une vision de ce qui est prévu, en cours ou déjà réalisé.",
  },
];

const exampleSteps = [
  {
    title: "8 interventions à organiser",
    description:
      "Une entreprise de paysage doit planifier huit interventions sur la semaine avec trois équipes.",
  },
  {
    title: "Les chantiers sont déjà connus",
    description:
      "Les clients, sites et prestations sont accessibles directement dans GreenPilot.",
  },
  {
    title: "Les priorités sont définies",
    description:
      "Les interventions urgentes ou contraintes par une date sont positionnées en priorité.",
  },
  {
    title: "Les équipes sont affectées",
    description:
      "Chaque chantier reçoit l'équipe correspondant à ses compétences et disponibilités.",
  },
  {
    title: "Les ressources sont préparées",
    description:
      "Les véhicules et équipements nécessaires sont pris en compte avant le départ.",
  },
  {
    title: "La semaine devient lisible",
    description:
      "Le responsable dispose d'une vision globale de la charge et de l'organisation.",
  },
  {
    title: "Les équipes savent quoi faire",
    description:
      "Chaque intervention est associée à un lieu, une équipe et les informations utiles.",
  },
  {
    title: "Le suivi devient continu",
    description:
      "L'organisation ne s'arrête plus au planning : elle se poursuit jusqu'à la réalisation du chantier.",
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
  "Une vision claire des journées et des semaines",
  "Des équipes mieux coordonnées",
  "Moins d'oublis et de conflits de planning",
  "Une meilleure utilisation des ressources",
  "Moins de temps passé à rechercher des informations",
  "Une continuité entre bureau, planning et terrain",
];

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

function PlanningTeamsPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="overflow-hidden border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Planning & Équipes
              </p>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Organisez vos journées, vos équipes et vos chantiers depuis un
                seul planning.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Centralisez vos interventions, affectez vos équipes et préparez
                vos journées sans jongler entre Excel, agendas, appels et
                messages.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Commencer avec GreenPilot
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#fonctionnement"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Découvrir le fonctionnement
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Planning de la semaine
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Équipes et interventions
                    </p>
                  </div>

                  <CalendarDays className="h-5 w-5 text-emerald-600" />
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    ["Lundi", "Équipe A", "Entretien résidence"],
                    ["Mardi", "Équipe B", "Taille de haies"],
                    ["Mercredi", "Équipe A", "Création paysagère"],
                    ["Jeudi", "Équipe C", "Élagage"],
                    ["Vendredi", "Équipe B", "Entretien parc"],
                  ].map(([day, team, job]) => (
                    <div
                      key={`${day}-${team}`}
                      className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-[80px_120px_1fr]"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        {day}
                      </span>
                      <span className="hidden rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 sm:block">
                        {team}
                      </span>
                      <span className="text-sm text-slate-600">{job}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Le problème"
            title="Quand le planning devient le centre de tous les imprévus."
            description="Dans une entreprise de paysage, une journée bien organisée dépend de dizaines d'informations. Lorsqu'elles sont dispersées, chaque changement devient une source de friction."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;

              return (
                <div
                  key={problem.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {problem.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {problem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                La solution GreenPilot
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Un planning pensé pour la réalité du terrain.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                GreenPilot relie les chantiers, les équipes et les ressources
                dans une même organisation opérationnelle.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Une seule vision de vos interventions",
                  "Des équipes affectées aux bons chantiers",
                  "Des ressources coordonnées",
                  "Une continuité entre préparation et exécution",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Chantier", "Résidence Martin"],
                  ["Date", "Mardi 15 septembre"],
                  ["Équipe", "Équipe B"],
                  ["Ressource", "Fourgon + matériel"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Organisation
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Toutes les informations essentielles sont regroupées avant
                  l'intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnement" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Le fonctionnement"
            title="Du chantier planifié à l'équipe sur le terrain."
            description="Chaque étape s'appuie sur les informations déjà présentes dans GreenPilot afin de réduire les ressaisies et les oublis."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="text-sm font-bold text-emerald-600">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Capacités clés"
            title="Tout ce qu'il faut pour garder le contrôle de vos journées."
            description="GreenPilot transforme votre planning en véritable outil de coordination opérationnelle."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <div
                  key={capability.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {capability.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Cas concret"
            title="Une semaine entière devient lisible en quelques étapes."
            description="Prenons une entreprise qui doit organiser huit interventions avec trois équipes. GreenPilot permet de transformer cette charge opérationnelle en plan d'action clair."
          />

          <div className="mt-14 space-y-4">
            {exampleSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Avant / Après"
            title="Passez d'une organisation dispersée à une vision maîtrisée."
            description="Le véritable gain n'est pas seulement un planning plus joli. C'est une organisation qui reste cohérente lorsque l'activité augmente."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Avant
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                Une organisation dispersée
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "Planning Excel ou papier",
                  "Informations dans les messages",
                  "Appels pour confirmer les interventions",
                  "Difficulté à suivre les changements",
                  "Ressources gérées séparément",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Après
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                Une organisation centralisée
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "Planning centralisé",
                  "Équipes affectées aux chantiers",
                  "Informations disponibles au même endroit",
                  "Meilleure visibilité sur les changements",
                  "Coordination des ressources",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionIntro
            eyebrow="Un écosystème connecté"
            title="Le planning ne fonctionne pas seul."
            description="Chaque intervention s'inscrit dans un processus métier plus large. GreenPilot connecte les étapes pour éviter les ruptures entre bureau et terrain."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => {
              const Icon = connection.icon;

              return (
                <Link
                  key={connection.title}
                  to={connection.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-slate-900">
                    {connection.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {connection.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Les bénéfices
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Une meilleure organisation, chaque jour.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            GreenPilot vous aide à passer moins de temps à organiser
            l'organisation et plus de temps à piloter votre activité.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-sm text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Message stratégique
          </p>

          <blockquote className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Un bon planning ne sert pas seulement à savoir qui travaille où.
            Il permet de mieux utiliser chaque heure, chaque équipe et chaque
            ressource.
          </blockquote>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">
            C'est cette organisation qui permet de transformer une activité
            opérationnelle complexe en entreprise réellement pilotable.
          </p>
        </div>
      </section>

      <section className="bg-emerald-600 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Passez d'un planning dispersé à une organisation maîtrisée.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
            Centralisez vos interventions, coordonnez vos équipes et préparez
            vos journées avec GreenPilot.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Commencer avec GreenPilot
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/fonctionnalites/devis"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Découvrir les Devis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlanningTeamsPage;