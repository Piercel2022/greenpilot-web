import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Users,
  Wrench,
} from "lucide-react";

const problems = [
  {
    icon: ClipboardCheck,
    title: "Des chantiers difficiles à suivre",
    description:
      "Les informations d'un chantier sont souvent réparties entre devis, messages, fichiers, photos et notes terrain.",
  },
  {
    icon: MapPin,
    title: "Le terrain manque de contexte",
    description:
      "Les équipes doivent parfois rechercher les informations nécessaires avant même de pouvoir commencer leur intervention.",
  },
  {
    icon: Clock3,
    title: "Le temps réel est difficile à mesurer",
    description:
      "Sans suivi structuré, il devient compliqué de comparer le temps prévu avec le temps réellement consacré au chantier.",
  },
  {
    icon: Users,
    title: "Le bureau et le terrain sont déconnectés",
    description:
      "Les informations remontent tardivement, ce qui ralentit le suivi et les décisions.",
  },
  {
    icon: FileText,
    title: "Les comptes rendus sont irréguliers",
    description:
      "Une intervention réalisée n'est pas toujours documentée de manière suffisamment structurée.",
  },
  {
    icon: PackageCheck,
    title: "Les ressources sont difficiles à contrôler",
    description:
      "Matériel, équipes, temps et prestations doivent être suivis pour comprendre ce qui s'est réellement passé sur le chantier.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Préparez le chantier",
    description:
      "Retrouvez le client, le site, les prestations prévues, les équipes et les ressources nécessaires.",
  },
  {
    step: "02",
    title: "Intervenez sur le terrain",
    description:
      "Les équipes disposent du contexte nécessaire pour réaliser le travail prévu sans multiplier les échanges.",
  },
  {
    step: "03",
    title: "Suivez l'exécution",
    description:
      "Le temps passé, les informations importantes et l'état d'avancement peuvent être associés au chantier.",
  },
  {
    step: "04",
    title: "Documentez l'intervention",
    description:
      "Un compte rendu permet de conserver une trace claire du travail réalisé et des observations terrain.",
  },
];

const capabilities = [
  {
    icon: ClipboardCheck,
    title: "Fiche chantier centralisée",
    description:
      "Regroupez les informations essentielles du chantier dans un même espace.",
  },
  {
    icon: MapPin,
    title: "Contexte du site",
    description:
      "Retrouvez l'adresse, le site concerné et les informations utiles avant l'intervention.",
  },
  {
    icon: Users,
    title: "Équipes affectées",
    description:
      "Identifiez rapidement les collaborateurs responsables de l'intervention.",
  },
  {
    icon: Clock3,
    title: "Suivi du temps",
    description:
      "Associez le temps réellement passé au chantier pour mieux comprendre la performance opérationnelle.",
  },
  {
    icon: Wrench,
    title: "Ressources utilisées",
    description:
      "Gardez une vision des véhicules, équipements et ressources mobilisés.",
  },
  {
    icon: FileText,
    title: "Compte rendu terrain",
    description:
      "Formalisez le travail réalisé, les observations et les recommandations à transmettre.",
  },
];

const exampleSteps = [
  {
    time: "07:30",
    title: "Préparation",
    description:
      "Le responsable consulte le chantier, le site, l'équipe affectée et les ressources prévues.",
  },
  {
    time: "08:00",
    title: "Arrivée sur site",
    description:
      "L'équipe retrouve le contexte de l'intervention et commence les travaux prévus.",
  },
  {
    time: "11:45",
    title: "Suivi de l'intervention",
    description:
      "Le temps consacré au chantier est enregistré et les éventuelles difficultés sont identifiées.",
  },
  {
    time: "15:30",
    title: "Fin du chantier",
    description:
      "Les travaux réalisés et les observations importantes sont structurés dans le suivi du chantier.",
  },
  {
    time: "16:00",
    title: "Compte rendu",
    description:
      "Le bureau dispose d'une information claire pour assurer le suivi client et les prochaines actions.",
  },
];

const connections = [
  {
    icon: Users,
    title: "Clients & Sites",
    description:
      "Retrouvez le client et le site directement depuis le chantier pour conserver tout le contexte.",
    href: "/fonctionnalites/clients-sites",
  },
  {
    icon: FileText,
    title: "Devis",
    description:
      "Partez des prestations acceptées pour préparer précisément les travaux à réaliser.",
    href: "/fonctionnalites/devis",
  },
  {
    icon: CalendarDays,
    title: "Planning & Équipes",
    description:
      "Transformez une intervention planifiée en chantier réellement exécuté sur le terrain.",
    href: "/fonctionnalites/planning-equipes",
  },
  {
    icon: Wrench,
    title: "Véhicules & Équipements",
    description:
      "Associez les ressources nécessaires à l'exécution des travaux.",
    href: "/fonctionnalites/chantiers-terrain",
  },
  {
    icon: MessageSquareText,
    title: "Facturation",
    description:
      "Les informations issues du chantier peuvent alimenter les étapes suivantes du processus.",
    href: "/fonctionnalites/facturation",
  },
  {
    icon: PackageCheck,
    title: "Pilotage & Rentabilité",
    description:
      "Utilisez les données opérationnelles pour mieux comprendre les coûts et la performance.",
    href: "/fonctionnalites/pilotage-rentabilite",
  },
];

const benefits = [
  "Une meilleure préparation des interventions",
  "Des équipes mieux informées sur le terrain",
  "Un suivi plus précis du temps passé",
  "Une meilleure traçabilité des travaux réalisés",
  "Des comptes rendus plus structurés",
  "Une continuité entre terrain, bureau et gestion",
];

const moduleNavigation = {
  previous: {
    label: "Planning & Équipes",
    href: "/fonctionnalites/planning-equipes",
  },
  current: "Chantiers & Terrain",
  next: {
    label: "Facturation",
    href: "/fonctionnalites/facturation",
  },
};

function JobsFieldPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Chantiers & Terrain
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Gardez le contrôle de vos chantiers, du bureau jusqu'au terrain.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              GreenPilot transforme chaque intervention en un chantier
              structuré, suivi et documenté pour créer une continuité entre
              préparation, exécution et gestion.
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
              Un chantier ne devrait pas disparaître du radar une fois l'équipe
              partie sur le terrain.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Une fois l'intervention commencée, l'entreprise doit encore
              savoir ce qui a été réalisé, combien de temps a été consacré au
              chantier, quelles difficultés ont été rencontrées et quelles
              actions doivent suivre.
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
                Un chantier devient une unité opérationnelle complète.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                GreenPilot relie le chantier au client, au site, au devis, au
                planning, aux équipes, au temps passé et au compte rendu.
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
                    Chantier #GP-2026-042
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Résidence Les Jardins
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  En cours
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Client", "Résidence Les Jardins"],
                  ["Site", "Strasbourg"],
                  ["Équipe", "Équipe A"],
                  ["Temps prévu", "7 h"],
                  ["Temps réalisé", "5 h 30"],
                  ["Ressources", "Camion + taille-haie"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <p className="text-xs font-medium text-slate-500">
                      {label}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {value}
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
              Du chantier préparé au compte rendu final.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Chaque étape de l'intervention peut être reliée au même chantier
              pour conserver une information cohérente du début à la fin.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
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
              Tout ce qu'il faut pour suivre l'exécution.
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
                Une intervention suivie de bout en bout.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Le chantier reste visible depuis sa préparation jusqu'à la
                remontée des informations terrain.
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
              Passez d'un chantier difficile à suivre à une exécution
              structurée.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Avant GreenPilot
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Informations dispersées entre bureau et terrain",
                  "Consignes transmises par plusieurs canaux",
                  "Temps réellement passé difficile à mesurer",
                  "Comptes rendus irréguliers",
                  "Suivi du chantier effectué après coup",
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
                  "Un chantier centralisé et contextualisé",
                  "Des équipes avec les bonnes informations",
                  "Un suivi structuré du temps passé",
                  "Des comptes rendus standardisés",
                  "Une information exploitable dès la fin de l'intervention",
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
              Le chantier est au cœur de l'exécution.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Chaque chantier s'inscrit dans une chaîne opérationnelle qui
              commence avec le client et se poursuit jusqu'au suivi de la
              performance.
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
                Transformez les informations terrain en valeur pour
                l'entreprise.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Un chantier correctement suivi ne sert pas uniquement à
                documenter le travail réalisé. Il améliore aussi la qualité du
                suivi client et la capacité de l'entreprise à mesurer sa
                performance.
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
            Le terrain ne doit plus être le point aveugle de l'entreprise.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Chaque intervention produit des informations utiles. GreenPilot
            aide à les structurer pour que le travail réalisé sur le terrain
            puisse réellement servir au suivi client, à la facturation et au
            pilotage de l'activité.
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
            Faites du terrain une source d'information, pas une zone
            d'incertitude.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
            Structurez vos chantiers, donnez les bonnes informations à vos
            équipes et gardez une vision claire de ce qui est réellement
            réalisé.
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

export default JobsFieldPage;