import { useAuth } from '../../context/useAuth'

const stats = [
{
label: 'Clients',
value: '—',
description: 'Clients enregistrés',
},
{
label: 'Sites',
value: '—',
description: 'Sites gérés',
},
{
label: 'Interventions',
value: '—',
description: 'Interventions à venir',
},
{
label: 'Factures',
value: '—',
description: 'Factures en cours',
},
]

const quickActions = [
{
label: 'Nouveau client',
description: 'Ajouter un client',
},
{
label: 'Nouveau devis',
description: 'Créer un devis',
},
{
label: 'Nouvelle intervention',
description: 'Planifier une intervention',
},
]

export default function DashboardPage() {
const { user } = useAuth()

return ( <div className="min-h-full p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-8"> <section> <p className="text-sm font-medium text-slate-500">
Vue d'ensemble </p>

      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        Bonjour {user?.first_name || 'et bienvenue'}
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Voici un aperçu de votre activité GreenPilot.
      </p>
    </section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            {stat.label}
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {stat.value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {stat.description}
          </p>
        </article>
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Activité récente
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Les dernières activités de votre organisation apparaîtront ici.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-dashed border-slate-300 px-6 py-10 text-center">
          <p className="text-sm font-medium text-slate-600">
            Aucune activité à afficher
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Les données seront connectées à l'API Rails.
          </p>
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Actions rapides
        </h2>

        <div className="mt-5 space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              disabled
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-left transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="block text-sm font-medium text-slate-700">
                {action.label}
              </span>

              <span className="mt-1 block text-xs text-slate-500">
                {action.description}
              </span>
            </button>
          ))}
        </div>
      </article>
    </section>
  </div>
</div>

)
}

