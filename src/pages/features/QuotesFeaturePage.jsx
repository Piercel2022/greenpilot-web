import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  History,
  MapPin,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

const problems = [
  {
    icon: FileText,
    title: "Des demandes dispersées",
    description:
      "Les demandes clients arrivent par téléphone, email, formulaire ou recommandation et deviennent difficiles à suivre.",
  },
  {
    icon: History,
    title: "Un suivi manuel",
    description:
      "Sans vision centralisée, il est difficile de savoir quels devis sont en cours, en attente ou déjà acceptés.",
  },
  {
    icon: MapPin,
    title: "Le mauvais contexte",
    description:
      "Un devis doit être associé au bon client et au bon site pour conserver toutes les informations utiles à la réalisation.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Identifier le client",
    description:
      "Retrouvez le client concerné et partez d'une information déjà centralisée.",
    icon: Target,
  },
  {
    number: "02",
    title: "Sélectionner le site",
    description:
      "Associez la proposition au lieu d'intervention concerné pour conserver le bon contexte.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Préparer les prestations",
    description:
      "Définissez les travaux ou services proposés et construisez une proposition claire.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Créer le devis",
    description:
      "Regroupez les prestations et les informations nécessaires dans un devis structuré.",
    icon: FileText,
  },
  {
    number: "05",
    title: "Suivre le statut",
    description:
      "Gardez une vision claire des devis en cours et identifiez ceux qui nécessitent votre attention.",
    icon: History,
  },
  {
    number: "06",
    title: "Passer à l'action",
    description:
      "Lorsqu'un devis devient un chantier, les informations peuvent continuer leur parcours opérationnel.",
    icon: FileCheck2,
  },
];

const capabilities = [
  {
    icon: FileText,
    title: "Création de devis",
    description:
      "Préparez rapidement une proposition commerciale à partir des informations de votre client et du site concerné.",
  },
  {
    icon: ClipboardCheck,
    title: "Prestations détaillées",
    description:
      "Décomposez votre proposition en prestations et lignes clairement identifiées.",
  },
  {
    icon: MapPin,
    title: "Client et site associés",
    description:
      "Conservez le lien entre le devis, le client et le lieu où la prestation doit être réalisée.",
  },
  {
    icon: History,
    title: "Suivi du statut",
    description:
      "Suivez l'évolution de chaque proposition et identifiez les devis qui nécessitent votre attention.",
  },
  {
    icon: Send,
    title: "Suivi commercial",
    description:
      "Gardez une vision structurée de vos propositions et de leur évolution dans votre activité.",
  },
  {
    icon: ArrowRight,
    title: "Continuité vers le chantier",
    description:
      "Un devis accepté peut devenir le point de départ de la préparation opérationnelle.",
  },
];

const exampleSteps = [
  {
    number: "01",
    title: "La demande",
    description:
      "Une copropriété vous contacte pour l'entretien de ses espaces verts.",
  },
  {
    number: "02",
    title: "Le client",
    description:
      "Vous retrouvez la copropriété dans GreenPilot.",
  },
  {
    number: "03",
    title: "Le site",
    description:
      "Le devis est associé au site concerné et à ses caractéristiques.",
  },
  {
    number: "04",
    title: "Les prestations",
    description:
      "Vous définissez les prestations nécessaires à l'intervention.",
  },
  {
    number: "05",
    title: "Le devis",
    description:
      "Vous préparez votre proposition commerciale avec les différentes lignes de prestation.",
  },
  {
    number: "06",
    title: "Le suivi",
    description:
      "Le devis reste identifiable dans votre activité commerciale.",
  },
  {
    number: "07",
    title: "L'acceptation",
    description:
      "Le client accepte la proposition et le projet peut avancer.",
  },
  {
    number: "08",
    title: "Le chantier",
    description:
      "Le devis devient le point de départ de l'organisation de l'intervention.",
  },
];

const connections = [
  {
    title: "Clients & Sites",
    description:
      "Le devis part du bon client et du bon site.",
    to: "/fonctionnalites/clients-sites",
  },
  {
    title: "Planning & Équipes",
    description:
      "Le projet confirmé peut être organisé avec les bonnes ressources.",
    to: "/fonctionnalites/planning-equipes",
  },
  {
    title: "Chantiers & Terrain",
    description:
      "Les informations commerciales peuvent accompagner la réalisation du chantier.",
    to: "/fonctionnalites/chantiers-terrain",
  },
  {
    title: "Facturation",
    description:
      "Le travail réalisé s'inscrit ensuite dans votre processus de facturation.",
    to: "/fonctionnalites/facturation",
  },
  {
    title: "Pilotage & Rentabilité",
    description:
      "Les données de votre activité contribuent progressivement à une meilleure vision de votre performance.",
    to: "/fonctionnalites/pilotage-rentabilite",
  },
];

const benefits = [
  {
    title: "Gagnez du temps",
    description:
      "Retrouvez les informations nécessaires sans multiplier les recherches entre plusieurs outils.",
  },
  {
    title: "Suivez vos opportunités",
    description:
      "Sachez quels devis sont en cours et lesquels nécessitent votre attention.",
  },
  {
    title: "Travaillez avec le bon contexte",
    description:
      "Chaque devis reste associé au client et au site concernés.",
  },
  {
    title: "Facilitez la transition vers le chantier",
    description:
      "Évitez de recréer inutilement les mêmes informations lorsque la proposition devient une intervention.",
  },
  {
    title: "Structurez votre activité",
    description:
      "Construisez progressivement un historique commercial et opérationnel plus clair.",
  },
  {
    title: "Gardez une vision globale",
    description:
      "Le devis devient une étape identifiable dans le parcours complet de votre activité.",
  },
];

function SectionIntro({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.18em] ${
          light ? "text-emerald-400" : "text-emerald-600"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-5 text-lg leading-8 ${
          light ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function QuotesFeaturePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                <FileText className="h-4 w-4" />
                02 · Devis
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Transformez vos demandes en devis, puis vos devis en chantiers.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Préparez vos propositions commerciales avec les bonnes
                informations, suivez chaque devis et gardez une continuité
                naturelle entre la vente et la réalisation de vos prestations.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                >
                  Commencer avec GreenPilot
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href="#fonctionnement"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Voir comment ça fonctionne
                  <ArrowDown className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="overflow-hidden rounded-2xl bg-white">
                  <div className="border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 w-28 rounded-full bg-slate-900" />
                        <div className="mt-2 h-2 w-40 rounded-full bg-slate-200" />
                      </div>

                      <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        Devis
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            DEVIS
                          </p>
                          <p className="mt-1 text-lg font-semibold text-slate-950">
                            Entretien espaces verts
                          </p>
                        </div>

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          En attente
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">Client</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            Résidence Les Jardins
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">Site</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            Espaces verts
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
                          <span className="text-sm text-slate-600">
                            Entretien
                          </span>
                          <span className="text-sm font-semibold text-slate-900">
                            1 200 €
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
                          <span className="text-sm text-slate-600">
                            Taille des haies
                          </span>
                          <span className="text-sm font-semibold text-slate-900">
                            680 €
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                        <span className="text-sm font-medium text-slate-500">
                          Total
                        </span>
                        <span className="text-xl font-bold text-slate-950">
                          1 880 €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Client et site associés
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Informations centralisées
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Le problème"
            title="Un devis ne devrait pas disparaître dans un fichier ou une conversation."
            description="Dans une entreprise de paysage, une demande client doit rapidement devenir une proposition claire, identifiable et suivie jusqu'à sa réalisation."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problem.icon;

              return (
                <article
                  key={problem.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-950">
                    {problem.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {problem.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="La solution GreenPilot"
            title="Chaque devis possède son contexte et sa suite logique."
            description="Avec GreenPilot, le devis s'inscrit dans le parcours réel de votre activité. Il reste associé au bon client et au bon site, contient les prestations proposées et permet de suivre son évolution."
          />

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-2">
              {[
                ["Client", Target],
                ["Site", MapPin],
                ["Prestations", ClipboardCheck],
                ["Devis", FileText],
                ["Statut", History],
                ["Chantier", FileCheck2],
              ].map(([label, Icon], index, items) => (
                <div
                  key={label}
                  className="flex w-full flex-col items-center lg:w-auto lg:flex-row"
                >
                  <div className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 shadow-sm lg:w-36">
                    <div className="text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-900">
                        {label}
                      </p>
                    </div>
                  </div>

                  {index < items.length - 1 && (
                    <ArrowRight className="my-1 h-5 w-5 shrink-0 rotate-90 text-emerald-500 lg:mx-2 lg:my-0 lg:rotate-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-center sm:p-10">
              <Sparkles className="mx-auto h-7 w-7 text-emerald-400" />

              <h3 className="mt-4 text-2xl font-bold text-white">
                Un devis n'est pas un document isolé.
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                C'est une étape du parcours client qui peut naturellement
                continuer jusqu'à la réalisation de la prestation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="fonctionnement"
        className="bg-slate-50 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Simple et structuré"
            title="De la demande client à l'intervention."
            description="Un processus clair permet de conserver les bonnes informations au bon moment, sans repartir de zéro à chaque étape."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-600">
                      {step.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Avec GreenPilot"
            title="Tout ce dont vous avez besoin pour garder le contrôle de vos devis."
            description="Les fonctionnalités du module sont conçues pour accompagner votre processus commercial sans le complexifier."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {capability.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-life example */}
      <section className="bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Dans votre quotidien"
            title="Un exemple concret : une demande d'entretien pour une copropriété."
            description="Voici comment une demande peut suivre un parcours structuré jusqu'à la préparation du chantier."
            light
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {exampleSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <span className="text-sm font-bold text-emerald-400">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8 text-center sm:p-10">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />

            <h3 className="mt-4 text-2xl font-bold text-white">
              Vous ne recommencez pas le travail depuis zéro lorsque le devis
              devient un chantier.
            </h3>

            <p className="mt-4 text-slate-300">
              Les informations du projet restent dans le même parcours
              opérationnel.
            </p>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Avant / Avec GreenPilot"
            title="Passez d'un suivi fragmenté à un processus structuré."
            description="L'objectif n'est pas d'ajouter une étape administrative, mais de donner une continuité aux informations déjà présentes dans votre activité."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                <h3 className="text-xl font-semibold text-slate-950">
                  Avant
                </h3>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Demande client",
                  "Email ou message",
                  "Notes",
                  "Fichier de devis",
                  "Recherche du statut",
                  "Nouveau fichier pour le chantier",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <h3 className="text-xl font-semibold text-slate-950">
                  Avec GreenPilot
                </h3>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Client",
                  "Site",
                  "Devis",
                  "Statut",
                  "Chantier",
                  "Suivi",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-lg font-semibold leading-8 text-slate-900">
              Une information saisie dans le bon contexte peut continuer à
              servir tout au long du parcours.
            </p>
          </div>
        </div>
      </section>

      {/* Connections */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Une plateforme connectée"
            title="Votre devis ne travaille pas seul."
            description="Le véritable intérêt de GreenPilot apparaît lorsque les différents modules travaillent ensemble."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => (
              <Link
                key={connection.title}
                to={connection.to}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-950">
                    {connection.title}
                  </h3>

                  <ArrowRight className="h-5 w-5 shrink-0 text-emerald-600 transition group-hover:translate-x-1" />
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {connection.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionIntro
            eyebrow="Ce que cela change"
            title="Moins de suivi manuel. Plus de visibilité commerciale."
            description="GreenPilot vous aide à structurer votre processus de devis autour de votre activité réelle."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="border-l-2 border-emerald-400 pl-5"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic message */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Du commercial à l'opérationnel
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Un devis accepté n'est pas la fin du processus. C'est le début du
            chantier.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            GreenPilot vous aide à maintenir la continuité entre ce que vous
            avez vendu et ce que vos équipes vont réellement réaliser sur le
            terrain.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Passez à l'étape suivante
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transformez votre gestion des devis en un véritable processus
            commercial.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Centralisez vos propositions, suivez leur évolution et préparez
            plus facilement le passage du devis au chantier avec GreenPilot.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Commencer avec GreenPilot
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/tarifs"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Voir les tarifs
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Demander une démonstration
            </Link>
          </div>
        </div>
      </section>

      {/* Module navigation */}
      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Link
            to="/fonctionnalites/clients-sites"
            className="group rounded-xl border border-slate-200 px-5 py-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              ← Module précédent
            </span>

            <span className="mt-1 block font-semibold text-slate-950">
              Clients & Sites
            </span>

            <span className="mt-1 block text-sm text-slate-500">
              Le point de départ de votre relation client
            </span>
          </Link>

          <Link
            to="/fonctionnalites/planning-equipes"
            className="group rounded-xl border border-slate-200 px-5 py-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50/50 md:text-right"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Module suivant →
            </span>

            <span className="mt-1 block font-semibold text-slate-950">
              Planning & Équipes
            </span>

            <span className="mt-1 block text-sm text-slate-500">
              Organisez les interventions à venir
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default QuotesFeaturePage;