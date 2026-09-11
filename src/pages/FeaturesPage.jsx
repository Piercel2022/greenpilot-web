import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  MapPin,
  Receipt,
  Users,
  Wrench,
} from "lucide-react";

const features = [
  {
    id: "clients-sites",
    icon: MapPin,
    eyebrow: "01 · Clients & Sites",
    title: "Chaque client, chaque site, au même endroit.",
    description:
      "Centralisez les informations de vos clients et gardez une vision claire de tous les lieux sur lesquels vous intervenez.",
    items: [
      "Fiches clients centralisées",
      "Plusieurs sites pour un même client",
      "Informations et caractéristiques des sites",
      "Historique des interventions",
      "Devis et chantiers associés",
    ],
  },
  {
    id: "devis",
    icon: FileText,
    eyebrow: "02 · Devis",
    title: "Transformez vos demandes en devis, puis vos devis en chantiers.",
    description:
      "Préparez vos propositions commerciales avec les bonnes informations et gardez le suivi de chaque devis jusqu'à sa réalisation.",
    items: [
      "Création de devis",
      "Prestations et lignes détaillées",
      "Association au client et au site",
      "Suivi du statut du devis",
      "Continuité entre devis et chantier",
    ],
  },
  {
    id: "planning-equipes",
    icon: Users,
    eyebrow: "03 · Planning & Équipes",
    title: "Sachez qui fait quoi, où et quand.",
    description:
      "Organisez vos équipes et vos interventions pour donner à chacun une vision plus claire de son activité.",
    items: [
      "Organisation des interventions",
      "Affectation des équipes",
      "Gestion des collaborateurs",
      "Coordination des ressources",
      "Vision opérationnelle des chantiers",
    ],
  },
  {
    id: "chantiers-terrain",
    icon: ClipboardList,
    eyebrow: "04 · Chantiers & Terrain",
    title: "Le bureau et le terrain travaillent avec les mêmes informations.",
    description:
      "Retrouvez les informations essentielles d'un chantier et conservez une trace de ce qui a réellement été réalisé sur le terrain.",
    items: [
      "Suivi des chantiers",
      "Équipes affectées",
      "Temps passé",
      "Compte rendu d'intervention",
      "Observations et recommandations",
      "Signature client",
    ],
  },
  {
    id: "facturation",
    icon: Receipt,
    eyebrow: "05 · Facturation",
    title: "De la prestation réalisée à la facture.",
    description:
      "Gardez le lien entre votre activité opérationnelle et votre facturation pour limiter les oublis et les informations dispersées.",
    items: [
      "Création et suivi des factures",
      "Lignes de facturation",
      "Dates d'émission et d'échéance",
      "Suivi des statuts",
      "Montants et historique",
    ],
  },
  {
    id: "pilotage",
    icon: BarChart3,
    eyebrow: "06 · Pilotage & Rentabilité",
    title:
      "Pilotez votre entreprise avec une vision plus claire de votre activité.",
    description:
      "Centralisez les données nécessaires au suivi de votre activité et préparez une gestion davantage orientée vers la performance.",
    items: [
      "Suivi de l'activité",
      "Vision des chantiers",
      "Suivi du temps passé",
      "Indicateurs de performance",
      "Suivi de la rentabilité",
      "Vision globale de l'entreprise",
    ],
  },
];

const featureRoutes = {
  "clients-sites": "/fonctionnalites/clients-sites",
  "devis": "/fonctionnalites/devis",
  "planning-equipes": "/fonctionnalites/planning-equipes",
  "chantiers-terrain": "/fonctionnalites/chantiers-terrain",
  "facturation": "/fonctionnalites/facturation",
  "pilotage": "/fonctionnalites/pilotage-rentabilite",
};

const businessTypes = [
  {
    title: "Paysagistes",
    description:
      "Gérez vos clients, sites, devis, équipes et chantiers depuis une seule plateforme.",
  },
  {
    title: "Jardiniers",
    description:
      "Organisez vos interventions et conservez l'historique de chaque site entretenu.",
  },
  {
    title: "Élagueurs & arboristes",
    description:
      "Centralisez les informations de chantier, les équipes, les équipements et les comptes rendus.",
  },
  {
    title: "Entretien & espaces verts",
    description:
      "Structurez votre activité et gardez une meilleure visibilité sur vos interventions récurrentes.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Le client",
    description: "Créez et centralisez les informations de votre client.",
  },
  {
    number: "02",
    title: "Le site",
    description: "Associez un ou plusieurs lieux d'intervention au client.",
  },
  {
    number: "03",
    title: "Le devis",
    description:
      "Préparez votre proposition commerciale à partir des bonnes informations.",
  },
  {
    number: "04",
    title: "Le chantier",
    description:
      "Organisez l'intervention et donnez les bonnes informations au terrain.",
  },
  {
    number: "05",
    title: "Le suivi",
    description:
      "Conservez les données réalisées, le temps passé et le compte rendu.",
  },
  {
    number: "06",
    title: "La facturation",
    description:
      "Gardez le lien entre le travail réalisé et votre gestion financière.",
  },
];

function FeatureSection({ feature, index }) {
  const Icon = feature.icon;
  const isReversed = index % 2 !== 0;

  return (
    <section
      id={feature.id}
      className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
    >
      <div
        className={`mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12 lg:py-28 ${
          isReversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Icon className="h-7 w-7" />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            {feature.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {feature.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {feature.description}
          </p>

          <ul className="mt-8 space-y-3">
            {feature.items.map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50">
            <div className="rounded-2xl bg-slate-950 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 w-24 rounded-full bg-slate-700" />
                  <div className="mt-3 h-2 w-40 rounded-full bg-slate-800" />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <div className="h-2 w-28 rounded-full bg-slate-700" />
                  <div className="mt-3 h-2 w-full rounded-full bg-slate-800" />
                  <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-800" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                    <div className="h-2 w-20 rounded-full bg-slate-700" />
                    <div className="mt-4 h-7 w-16 rounded-lg bg-emerald-500/20" />
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                    <div className="h-2 w-20 rounded-full bg-slate-700" />
                    <div className="mt-4 h-7 w-20 rounded-lg bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Informations centralisées
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Au même endroit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  const route = featureRoutes[feature.id];

  const content = (
    <>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200 transition group-hover:bg-emerald-50 group-hover:ring-emerald-100">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-5 font-semibold text-slate-950">
        {feature.eyebrow.replace(/^\d+ · /, "")}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {feature.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
        Découvrir
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </>
  );

  if (route) {
    return (
      <Link
        to={route}
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-md"
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={`#${feature.id}`}
      className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-md"
    >
      {content}
    </a>
  );
}

function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <Wrench className="h-4 w-4" />
              Fonctionnalités UseGreenPilot
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Toutes les fonctionnalités pour piloter votre entreprise de
              paysage.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Clients, sites, devis, planning, équipes, chantiers, facturation
              et pilotage : UseGreenPilot centralise votre activité dans un
              seul espace.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Commencer avec UseGreenPilot
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Une seule plateforme
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              De la relation client au pilotage de l'entreprise.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              UseGreenPilot relie les différentes étapes de votre activité
              pour vous aider à travailler avec une information plus claire et
              mieux structurée.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature details */}
      {features.map((feature, index) => (
        <FeatureSection
          key={feature.id}
          feature={feature}
          index={index}
        />
      ))}

      {/* Business types */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Pensé pour votre métier
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Un outil conçu pour les entreprises du paysage et de
              l'environnement.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              UseGreenPilot s'adapte aux réalités des professionnels qui
              travaillent entre bureau, terrain, équipes et sites clients.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businessTypes.map((business) => (
              <article
                key={business.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {business.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {business.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Votre activité, étape par étape
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Un fil conducteur entre vos opérations.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              L'objectif n'est pas d'ajouter un outil de plus, mais de relier
              les informations qui accompagnent votre activité au quotidien.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
              >
                <span className="text-sm font-bold text-emerald-600">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Passez à l'étape suivante
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Une seule plateforme pour mieux piloter votre activité.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Découvrez l'offre adaptée à votre entreprise et commencez à
            centraliser votre gestion avec UseGreenPilot.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Commencer avec UseGreenPilot
            </Link>

            <Link
              to="/tarifs"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Voir les tarifs
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Demander une démonstration
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FeaturesPage;