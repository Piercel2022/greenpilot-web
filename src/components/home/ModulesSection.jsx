
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
      "Créez, chiffrez et suivez vos opportunités commerciales jusqu'à leur transformation.",
  },
  {
    icon: CalendarDays,
    title: "Planning & Équipes",
    description:
      "Organisez les interventions, répartissez les équipes et gardez une vision claire des priorités.",
  },
  {
    icon: HardHat,
    title: "Chantiers & Terrain",
    description:
      "Suivez l'exécution des prestations et donnez au terrain les informations dont il a besoin.",
  },
  {
    icon: ReceiptText,
    title: "Facturation",
    description:
      "Transformez les prestations réalisées en factures et gardez le contrôle sur leur cycle.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Pilotage & Rentabilité",
    description:
      "Mesurez votre activité, vos coûts et vos marges pour prendre de meilleures décisions.",
  },
];

function ModulesSection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Une entreprise mieux structurée
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Tout votre métier, au même endroit.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            GreenPilot rassemble les fonctions essentielles de votre entreprise
            pour vous aider à passer d'une gestion dispersée à une organisation
            claire et maîtrisée.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <article
                key={module.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {module.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-600">
                  {module.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default  ModulesSection;