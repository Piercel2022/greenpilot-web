import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  History,
  MapPin,
  Search,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: Clock3,
    title: "Gagnez du temps",
    description:
      "Retrouvez rapidement les informations dont vous avez besoin sans parcourir plusieurs fichiers ou conversations.",
  },
  {
    icon: Search,
    title: "Évitez les recherches inutiles",
    description:
      "Une structure claire vous permet de retrouver un client, un site ou une intervention en quelques secondes.",
  },
  {
    icon: MapPin,
    title: "Gardez le contexte terrain",
    description:
      "Chaque site possède ses propres informations pour préparer les interventions avec davantage de précision.",
  },
  {
    icon: History,
    title: "Construisez un historique",
    description:
      "Conservez une trace des devis, chantiers et interventions réalisés pour chaque client et chaque site.",
  },
];

const features = [
  {
    icon: Users,
    title: "Fiches clients centralisées",
    description:
      "Regroupez les coordonnées et les informations essentielles de chaque client dans une fiche unique.",
  },
  {
    icon: MapPin,
    title: "Plusieurs sites par client",
    description:
      "Un même client peut posséder plusieurs lieux d’intervention sans dupliquer ses informations.",
  },
  {
    icon: MapPin,
    title: "Informations propres à chaque site",
    description:
      "Adresse, caractéristiques du terrain et informations utiles restent attachées au bon lieu d’intervention.",
  },
  {
    icon: History,
    title: "Historique des interventions",
    description:
      "Retrouvez ce qui a déjà été réalisé sur un site et conservez une continuité dans le suivi.",
  },
  {
    icon: FileText,
    title: "Devis associés",
    description:
      "Accédez aux propositions commerciales liées au client et au site concerné.",
  },
  {
    icon: CheckCircle2,
    title: "Chantiers associés",
    description:
      "Visualisez les interventions prévues, en cours ou terminées depuis le bon contexte client.",
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
    description: "Associez un ou plusieurs lieux d’intervention au client.",
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
      "Organisez l’intervention et transmettez les bonnes informations au terrain.",
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

const businessTypes = [
  "Paysagistes",
  "Jardiniers",
  "Élagueurs & arboristes",
  "Entreprises d’entretien des espaces verts",
];

function ClientsSitesPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                01 · Clients & Sites
              </p>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Chaque client, chaque site, au même endroit.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Centralisez les informations de vos clients et de leurs lieux
                d’intervention. Avec UseGreenPilot, vous savez rapidement qui
                est votre client, où vous intervenez et ce qui a déjà été
                réalisé.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                >
                  Commencer avec UseGreenPilot
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#fonctionnement"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
                >
                  Voir comment ça fonctionne
                </a>
              </div>
            </div>

            {/* Product mockup */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl shadow-black/30">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        CLIENTS & SITES
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-slate-900">
                        Vos clients
                      </h2>
                    </div>

                    <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                      + Nouveau client
                    </div>
                  </div>

                  <div className="border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
                      <Search className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">
                        Rechercher un client...
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <span>Client</span>
                      <span>Sites</span>
                      <span>Statut</span>
                    </div>

                    {[
                      ["Jean Martin", "3 sites", "Actif"],
                      ["SCI Horizon", "2 sites", "Actif"],
                      ["Entreprise Durand", "1 site", "Actif"],
                    ].map(([name, sites, status]) => (
                      <div
                        key={name}
                        className="grid grid-cols-[1.4fr_0.7fr_0.8fr] items-center gap-4 px-5 py-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Client professionnel
                          </p>
                        </div>

                        <span className="text-sm text-slate-600">
                          {sites}
                        </span>

                        <span className="inline-flex w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Votre activité commence par vos clients et leurs sites
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Un client ne correspond pas toujours à un seul lieu.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Une entreprise de paysage peut intervenir chez un particulier,
              sur plusieurs résidences, dans une copropriété, sur un site
              professionnel ou dans plusieurs espaces appartenant au même
              client.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Lorsque ces informations sont réparties entre fichiers, notes,
              emails et outils différents, retrouver le bon contexte devient
              rapidement chronophage.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Informations dispersées",
                description:
                  "Coordonnées dans un fichier, adresse dans un email, historique dans des notes : l'information est rarement au même endroit.",
              },
              {
                number: "02",
                title: "Plusieurs sites à gérer",
                description:
                  "Un même client peut avoir plusieurs lieux d'intervention avec des caractéristiques et des besoins différents.",
              },
              {
                number: "03",
                title: "Historique difficile à retrouver",
                description:
                  "Avant une intervention, il faut souvent rechercher ce qui a été fait précédemment et dans quel contexte.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <span className="text-sm font-semibold text-emerald-600">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client / Site concept */}
      <section id="fonctionnement" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Une structure pensée pour le terrain
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Un client. Plusieurs sites. Une seule vision.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                UseGreenPilot sépare clairement le client de ses lieux
                d’intervention. Vous évitez les doublons tout en conservant
                les informations spécifiques à chaque site.
              </p>

              <p className="mt-5 text-lg font-medium leading-8 text-slate-900">
                Le bon client, le bon site, les bonnes informations.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      CLIENT
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      Jean Martin
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Client particulier · Strasbourg
                    </p>
                  </div>
                </div>

                <div className="ml-6 mt-6 border-l-2 border-emerald-100 pl-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    SITES ASSOCIÉS
                  </p>

                  {[
                    ["Résidence principale", "Strasbourg"],
                    ["Jardin secondaire", "Obernai"],
                    ["Bureau professionnel", "Strasbourg"],
                  ].map(([name, location]) => (
                    <div
                      key={name}
                      className="mb-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 last:mb-0"
                    >
                      <MapPin className="h-4 w-4 text-emerald-600" />

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Votre portefeuille clients
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Une vue claire de votre portefeuille clients.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Votre activité commence par une information fiable. UseGreenPilot
              vous donne une base structurée sur laquelle peuvent s'appuyer vos
              devis, vos chantiers et vos interventions.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Portefeuille
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      Clients
                    </h3>
                  </div>

                  <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                    24 clients
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-[1.5fr_0.7fr_1fr_0.8fr] gap-4 border-b border-slate-100 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <span>Client</span>
                    <span>Sites</span>
                    <span>Dernière intervention</span>
                    <span>Statut</span>
                  </div>

                  {[
                    ["Jean Martin", "3", "Taille de haies", "Actif"],
                    ["SCI Horizon", "2", "Entretien annuel", "Actif"],
                    ["Entreprise Durand", "1", "Création paysagère", "Actif"],
                    ["Claire Bernard", "2", "Entretien jardin", "Actif"],
                  ].map(([name, sites, intervention, status]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[1.5fr_0.7fr_1fr_0.8fr] items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-0"
                    >
                      <span className="text-sm font-semibold text-slate-900">
                        {name}
                      </span>

                      <span className="text-sm text-slate-600">{sites}</span>

                      <span className="text-sm text-slate-600">
                        {intervention}
                      </span>

                      <span className="text-xs font-medium text-emerald-700">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Tout ce dont vous avez besoin pour retrouver rapidement une
                information.
              </h3>

              <ul className="mt-7 space-y-5">
                {[
                  "Recherche client",
                  "Coordonnées et informations essentielles",
                  "Sites associés",
                  "Historique des interventions",
                  "Devis associés",
                  "Chantiers associés",
                  "Informations utiles au terrain",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Tout commence ici
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Une base client structurée pour toute votre activité.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Les informations que vous saisissez ne restent pas isolées.
              Elles deviennent la base de votre organisation quotidienne.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use case */}
      <section className="bg-slate-950 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Exemple concret
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Avant une intervention, votre équipe doit savoir où elle va.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Un client appelle pour une intervention sur une résidence
                régulièrement entretenue. En quelques secondes, vous devez
                pouvoir retrouver le bon site, son historique et le contexte
                commercial.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              {[
                ["01", "Client", "Jean Martin"],
                ["02", "Site", "Résidence principale · Strasbourg"],
                ["03", "Historique", "Dernière intervention : taille de haies"],
                ["04", "Devis", "Devis #2026-014 · accepté"],
                ["05", "Chantier", "Intervention planifiée"],
              ].map(([number, label, value]) => (
                <div
                  key={number}
                  className="flex gap-5 border-b border-slate-800 py-5 first:pt-0 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-semibold text-emerald-400">
                    {number}
                  </span>

                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      {label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {value}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-8 rounded-xl bg-emerald-500/10 p-5">
                <p className="text-sm font-medium leading-6 text-emerald-300">
                  Votre équipe arrive sur le bon site avec les bonnes
                  informations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Le point de départ de votre activité
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Vos clients et vos sites alimentent tout le reste.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Une donnée utile ne doit pas être saisie plusieurs fois. Elle
              doit accompagner votre activité depuis le premier contact
              jusqu'à la facturation.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <span className="text-sm font-semibold text-emerald-600">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-700">
            {[
              "Client",
              "Site",
              "Devis",
              "Chantier",
              "Intervention",
              "Facturation",
            ].map((item, index, items) => (
              <div key={item} className="flex items-center gap-3">
                <span className="rounded-lg bg-slate-100 px-4 py-2.5">
                  {item}
                </span>

                {index < items.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-emerald-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Le résultat
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Moins de recherche. Plus de maîtrise.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <Icon className="h-6 w-6 text-emerald-600" />

                  <h3 className="mt-6 text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business types */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Pour les professionnels du paysage
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Pensé pour les entreprises qui travaillent sur plusieurs sites.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Que vous suiviez quelques clients réguliers ou un portefeuille
            composé de nombreux sites, votre organisation repose sur une
            information client claire et accessible.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {businessTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Prêt à structurer votre activité ?
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Commencez par maîtriser vos clients et vos sites.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Centralisez vos informations et construisez une base solide pour
            piloter vos devis, vos chantiers et vos interventions.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Commencer avec UseGreenPilot
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              Demander une démonstration
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientsSitesPage;