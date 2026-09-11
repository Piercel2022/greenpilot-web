import { Link } from "react-router-dom";
import {
ArrowRight,
BarChart3,
CalendarDays,
Check,
CheckCircle2,
CircleDollarSign,
Clock3,
FileCheck2,
FileText,
History,
MapPin,
Receipt,
Search,
ShieldCheck,
Sparkles,
Target,
Users,
} from "lucide-react";

const workflow = [
{
number: "01",
title: "Retrouver le client",
description:
"Identifiez rapidement le client concerné par la prestation réalisée.",
icon: Users,
},
{
number: "02",
title: "Identifier le site",
description:
"Conservez le contexte du lieu où l’intervention a réellement été effectuée.",
icon: MapPin,
},
{
number: "03",
title: "Vérifier la prestation",
description:
"Retrouvez les informations nécessaires avant de préparer la facturation.",
icon: FileCheck2,
},
{
number: "04",
title: "Préparer la facture",
description:
"Centralisez les éléments de facturation dans un même espace.",
icon: Receipt,
},
{
number: "05",
title: "Suivre les montants",
description:
"Gardez une vision claire des montants associés à vos factures.",
icon: CircleDollarSign,
},
{
number: "06",
title: "Suivre les échéances",
description:
"Retrouvez les dates importantes et l’état de vos factures.",
icon: CalendarDays,
},
];

const capabilities = [
{
icon: Receipt,
title: "Création et suivi des factures",
description:
"Centralisez vos factures et retrouvez rapidement leur état.",
},
{
icon: FileText,
title: "Lignes de facturation",
description:
"Structurez les éléments facturés pour conserver une information claire.",
},
{
icon: Users,
title: "Client et site",
description:
"Gardez chaque facture rattachée au bon client et au bon site.",
},
{
icon: CalendarDays,
title: "Dates d’émission et d’échéance",
description:
"Conservez les principales dates nécessaires au suivi de vos factures.",
},
{
icon: Clock3,
title: "Statuts",
description:
"Visualisez simplement l’état d’avancement de votre facturation.",
},
{
icon: History,
title: "Montants et historique",
description:
"Conservez une trace structurée des informations financières liées à votre activité.",
},
];

const connections = [
{
icon: Users,
title: "Clients & Sites",
description: "Identifiez le client et le site concernés.",
href: "/fonctionnalites/clients-sites",
},
{
icon: FileText,
title: "Devis",
description: "Retrouvez l’origine commerciale de la prestation.",
href: "/fonctionnalites/devis",
},
{
icon: CalendarDays,
title: "Planning & Équipes",
description:
"Comprenez quelle intervention a été planifiée et réalisée.",
href: "/fonctionnalites/planning-equipes",
},
{
icon: Target,
title: "Chantiers & Terrain",
description:
"Retrouvez les informations liées au travail réellement effectué.",
href: "/fonctionnalites/chantiers-terrain",
},
{
icon: BarChart3,
title: "Pilotage & Rentabilité",
description:
"Transformez progressivement vos données de facturation en informations utiles pour comprendre votre activité.",
href: "/fonctionnalites/pilotage-rentabilite",
},
];

const benefits = [
"Limitez les oublis",
"Gagnez du temps",
"Gardez le contexte",
"Suivez vos échéances",
"Structurez votre historique",
"Préparez votre pilotage",
];

const moduleNavigation = [
{
label: "Chantiers & Terrain",
href: "/fonctionnalites/chantiers-terrain",
position: "Précédent",
},
{
label: "Pilotage & Rentabilité",
href: "/fonctionnalites/pilotage-rentabilite",
position: "Suivant",
},
];

function SectionIntro({ eyebrow, title, description, centered = false }) {
return (
<div
className={`max-w-3xl ${
        centered ? "mx-auto text-center" : ""
      }`}
> <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
{eyebrow} </p>

  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
    {title}
  </h2>

  <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>
</div>

);
}

function FeatureCard({ icon: Icon, title, description }) {
return ( <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"> <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"> <Icon size={22} strokeWidth={1.8} /> </div>

  <h3 className="mt-6 text-lg font-semibold text-slate-950">{title}</h3>

  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
</div>

);
}

function WorkflowStep({ number, title, description, icon: Icon }) {
return ( <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"> <div className="flex items-start justify-between gap-4"> <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"> <Icon size={20} strokeWidth={1.8} /> </div>

    <span className="text-xs font-semibold tracking-[0.16em] text-slate-400">
      {number}
    </span>
  </div>

  <h3 className="mt-6 font-semibold text-slate-950">{title}</h3>

  <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
</div>

);
}

function FlowItem({ children, active = false }) {
return (
<div
className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-slate-200 bg-white text-slate-700"
      }`}
>
{active ? ( <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
) : ( <div className="h-2 w-2 shrink-0 rounded-full bg-slate-300" />
)}

  <span className="text-sm font-medium">{children}</span>
</div>


);
}

function ConnectionCard({ icon: Icon, title, description, href }) {
return ( <Link
   to={href}
   className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
 > <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-600"> <Icon size={20} strokeWidth={1.8} /> </div>


  <div className="mt-5 flex items-start justify-between gap-4">
    <div>
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>

    <ArrowRight
      size={18}
      className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
    />
  </div>
</Link>

);
}

function FacturationPage() {
return ( <main className="bg-white text-slate-950">
{/* HERO */} <section className="relative overflow-hidden bg-slate-950"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.9),transparent_45%)]" />

    <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <Receipt size={14} />
            05 · Facturation
          </div>

          <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            De la prestation réalisée à la facture, sans perdre le fil.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Gardez le lien entre votre activité opérationnelle et votre
            facturation pour limiter les oublis, retrouver les bonnes
            informations et suivre plus clairement ce qui doit être
            facturé.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400"
            >
              Commencer avec GreenPilot
              <ArrowRight size={17} />
            </Link>

            <a
              href="#fonctionnement"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voir comment ça fonctionne
            </a>
          </div>
        </div>

        {/* Future real module screenshot placeholder */}
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-emerald-400/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30">
            <div className="rounded-[1.5rem] border border-slate-200/10 bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Facturation
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Suivi des factures
                  </p>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-slate-500">Factures</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      24
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-slate-500">À suivre</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      7
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-slate-500">Montant</p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      18,4 k€
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  {[
                    ["Entretien annuel", "1 240 €", "Émise"],
                    ["Taille de haie", "680 €", "À suivre"],
                    ["Création paysagère", "4 850 €", "Émise"],
                    ["Contrat entretien", "920 €", "À suivre"],
                  ].map(([label, amount, status]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-4 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          {label}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Client · Site
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">
                          {amount}
                        </p>
                        <p className="mt-1 text-xs text-emerald-400">
                          {status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-emerald-400/20 bg-slate-900/95 px-4 py-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-xs font-medium text-white">
                  Prestation suivie
                </p>
                <p className="text-xs text-slate-500">
                  jusqu'à la facturation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* PROBLEM */}
  <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionIntro
        eyebrow="Le problème"
        title="Une prestation réalisée ne devrait pas devenir une facture oubliée."
        description="Sur le terrain, le travail est réalisé. Au bureau, il faut ensuite retrouver les bonnes informations pour facturer. Lorsque ces deux étapes sont séparées, les oublis et les retards deviennent faciles."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <FeatureCard
          icon={Clock3}
          title="Facturation tardive"
          description="Plus le temps passe entre l’intervention et la facturation, plus il devient difficile de retrouver rapidement le contexte."
        />

        <FeatureCard
          icon={Search}
          title="Informations dispersées"
          description="Client, site, prestation, montant et échéance peuvent rapidement se retrouver dans plusieurs outils ou conversations."
        />

        <FeatureCard
          icon={BarChart3}
          title="Manque de visibilité"
          description="Sans vision structurée, il devient plus difficile de savoir ce qui a déjà été facturé et ce qui doit encore l’être."
        />
      </div>
    </div>
  </section>

  {/* SOLUTION */}
  <section id="fonctionnement" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionIntro
        eyebrow="La solution GreenPilot"
        title="Gardez une continuité entre ce qui est réalisé et ce qui est facturé."
        description="GreenPilot rapproche les informations opérationnelles et financières pour conserver le contexte de chaque prestation, du client jusqu'à la facture."
      />

      <div className="mt-14 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FlowItem>Client</FlowItem>
          <FlowItem>Site</FlowItem>
          <FlowItem>Devis</FlowItem>
          <FlowItem>Chantier</FlowItem>
          <FlowItem active>Prestation réalisée</FlowItem>
          <FlowItem active>Facture</FlowItem>
          <FlowItem active>Échéance</FlowItem>
          <FlowItem active>Suivi</FlowItem>
        </div>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <p className="font-semibold text-slate-950">
              La facturation devient une continuité de votre activité.
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Elle n'est plus une tâche isolée à reconstruire après coup.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* WORKFLOW */}
  <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionIntro
        eyebrow="Comment ça fonctionne"
        title="Un parcours simple, du terrain jusqu'au suivi financier."
        description="L'objectif n'est pas d'ajouter une couche administrative. C'est de conserver les bonnes informations au bon endroit pour rendre la facturation plus fluide."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {workflow.map((step) => (
          <WorkflowStep key={step.number} {...step} />
        ))}
      </div>
    </div>
  </section>

  {/* CAPABILITIES */}
  <section className="bg-white py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionIntro
        eyebrow="Ce que vous retrouvez"
        title="Les informations essentielles de votre facturation, au même endroit."
        description="GreenPilot structure les éléments nécessaires pour suivre vos factures sans perdre le contexte opérationnel."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability) => (
          <FeatureCard key={capability.title} {...capability} />
        ))}
      </div>
    </div>
  </section>

  {/* REAL LIFE EXAMPLE */}
  <section className="bg-slate-950 py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Exemple concret
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Une intervention terminée ne doit pas rester en attente de
            facturation.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Imaginez une entreprise de paysage qui réalise une prestation
            d'entretien chez un client. Le chantier est terminé. Le travail
            a été effectué. Il reste maintenant à transformer cette
            prestation en information financière exploitable.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Le chantier est terminé.",
              "Le travail réalisé est identifié.",
              "Le client et le site sont retrouvés.",
              "Les éléments nécessaires à la facturation sont centralisés.",
              "La facture est émise et son échéance est suivie.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="space-y-3">
            {[
              "Chantier",
              "Travail réalisé",
              "Client",
              "Site",
              "Facturation",
              "Émission",
              "Échéance",
              "Suivi",
            ].map((item, index) => (
              <div key={item}>
                <div
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${
                    index >= 4
                      ? "border-emerald-400/20 bg-emerald-400/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-medium text-white">
                    {item}
                  </span>
                </div>

                {index < 7 && (
                  <div className="ml-9 h-3 w-px bg-white/10" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            <p className="text-sm font-medium leading-6 text-emerald-200">
              Le bureau ne doit pas repartir à la recherche de ce que le
              terrain a déjà réalisé.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* BEFORE / AFTER */}
  <section className="bg-white py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionIntro
        eyebrow="Avant / Avec GreenPilot"
        title="Passez d'un parcours administratif fragmenté à une continuité métier."
        description="La différence ne réside pas uniquement dans l'outil de facturation. Elle se trouve dans le lien conservé entre les différentes étapes de votre activité."
        centered
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-600">
              <Search size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Avant
              </p>
              <h3 className="mt-1 font-semibold text-slate-950">
                Une succession de recherches
              </h3>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {[
              "Intervention terminée",
              "Information transmise",
              "Recherche du client",
              "Recherche du devis",
              "Vérification de la prestation",
              "Création de la facture",
              "Recherche de l'échéance",
              "Suivi séparé",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3"
              >
                <span className="text-xs font-semibold text-slate-400">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Sparkles size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                Avec GreenPilot
              </p>
              <h3 className="mt-1 font-semibold text-slate-950">
                Une continuité claire
              </h3>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {[
              "Client",
              "Site",
              "Devis",
              "Chantier",
              "Travail réalisé",
              "Facture",
              "Échéance",
              "Suivi",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3"
              >
                <Check
                  size={16}
                  className="text-emerald-600"
                  strokeWidth={2.5}
                />
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-7 text-sm font-medium leading-6 text-emerald-800">
            Votre facturation reste connectée à la réalité de votre
            activité.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* CONNECTIONS */}
  <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionIntro
        eyebrow="Un module connecté"
        title="La facturation prend tout son sens lorsqu'elle reste reliée au reste de votre activité."
        description="GreenPilot n'isole pas la gestion financière. Les informations circulent entre les différents modules pour conserver une vision métier cohérente."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => (
          <ConnectionCard key={connection.title} {...connection} />
        ))}
      </div>
    </div>
  </section>

  {/* BENEFITS */}
  <section className="bg-white py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionIntro
          eyebrow="Les bénéfices"
          title="Une facturation plus structurée, au service de votre entreprise."
          description="L'objectif est simple : passer moins de temps à rechercher les informations et davantage de temps à piloter votre activité."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Check size={17} strokeWidth={2.5} />
              </div>

              <span className="text-sm font-semibold text-slate-800">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* STRATEGIC MESSAGE */}
  <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <BarChart3 size={25} strokeWidth={1.8} />
      </div>

      <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
        Le principe GreenPilot
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        Ce qui est réalisé sur le terrain doit pouvoir être suivi jusqu'au
        chiffre d'affaires.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        GreenPilot rapproche l'activité opérationnelle et la gestion
        financière pour vous donner une vision plus cohérente du parcours
        de chaque prestation.
      </p>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        {[
          "Terrain",
          "Prestation réalisée",
          "Facturation",
          "Chiffre d'affaires",
          "Pilotage",
        ].map((item, index, items) => (
          <div key={item} className="flex items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              {item}
            </div>

            {index < items.length - 1 && (
              <ArrowRight
                size={16}
                className="hidden text-emerald-500 sm:block"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* TRANSITION */}
  <section className="bg-white py-16 sm:py-20">
    <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
      <p className="text-lg leading-8 text-slate-600">
        Une facture vous indique ce qui a été facturé.
        <br />
        <span className="font-semibold text-slate-950">
          Le pilotage vous aide à comprendre ce que votre activité vous
          rapporte.
        </span>
      </p>

      <Link
        to="/fonctionnalites/pilotage-rentabilite"
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
      >
        Découvrir Pilotage & Rentabilité
        <ArrowRight size={17} />
      </Link>
    </div>
  </section>

  {/* FINAL CTA */}
  <section className="bg-slate-950 py-20 sm:py-24 lg:py-28">
    <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
        Passez à l'étape suivante
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Ne laissez plus la facturation fonctionner à côté de votre
        activité.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Centralisez vos factures, gardez une meilleure continuité avec vos
        prestations et préparez une gestion plus claire de votre activité
        avec GreenPilot.
      </p>

      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
        >
          Commencer avec GreenPilot
          <ArrowRight size={17} />
        </Link>

        <Link
          to="/tarifs"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Voir les tarifs
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Demander une démonstration
        </Link>
      </div>
    </div>
  </section>

  {/* MODULE NAVIGATION */}
  <section className="border-t border-slate-200 bg-white">
    <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 lg:px-12">
      <Link
        to={moduleNavigation[0].href}
        className="group flex items-center justify-between gap-6 px-0 py-7 transition md:pr-10"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {moduleNavigation[0].position}
          </p>
          <p className="mt-2 font-semibold text-slate-800 group-hover:text-emerald-600">
            {moduleNavigation[0].label}
          </p>
        </div>

        <ArrowRight
          size={19}
          className="rotate-180 text-slate-300 transition group-hover:-translate-x-1 group-hover:text-emerald-600"
        />
      </Link>

      <Link
        to={moduleNavigation[1].href}
        className="group flex items-center justify-between gap-6 px-0 py-7 md:pl-10"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {moduleNavigation[1].position}
          </p>
          <p className="mt-2 font-semibold text-slate-800 group-hover:text-emerald-600">
            {moduleNavigation[1].label}
          </p>
        </div>

        <ArrowRight
          size={19}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
        />
      </Link>
    </div>
  </section>
</main>
);
}

export default FacturationPage;
