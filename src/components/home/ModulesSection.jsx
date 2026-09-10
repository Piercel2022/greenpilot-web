import {
  UsersRound,
  FileText,
  CalendarDays,
  HardHat,
  ReceiptText,
  ChartNoAxesCombined,
} from "lucide-react";

const modules = [
  {
    icon: UsersRound,
    title: "Clients & Sites",
    description:
      "Centralisez vos clients, vos sites et toutes les informations utiles à chaque propriété.",
  },
  {
    icon: FileText,
    title: "Devis",
    description:
      "Créez, envoyez et suivez vos devis pour transformer plus rapidement vos opportunités en chantiers.",
  },
  {
    icon: CalendarDays,
    title: "Planning & Équipes",
    description:
      "Organisez les interventions, les équipes et les ressources avec une vision claire du planning.",
  },
  {
    icon: HardHat,
    title: "Chantiers & Terrain",
    description:
      "Suivez vos chantiers et donnez aux équipes terrain les informations nécessaires pour intervenir efficacement.",
  },
  {
    icon: ReceiptText,
    title: "Facturation",
    description:
      "Générez et suivez vos factures pour garder une gestion financière simple et maîtrisée.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Pilotage & Rentabilité",
    description:
      "Suivez vos performances et votre rentabilité pour prendre de meilleures décisions au quotidien.",
  },
];

function ModulesSection() {
  return (
    <section
      id="modules"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Une plateforme complète
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tout ce qu'il faut pour piloter votre activité
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            GreenPilot centralise les outils essentiels pour gérer votre
            activité de l'organisation des équipes jusqu'au suivi de la
            rentabilité.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon className="h-6 w-6 text-emerald-900" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {module.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ModulesSection;