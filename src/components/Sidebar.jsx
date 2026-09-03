import { NavLink } from 'react-router-dom'

const navigation = [
{ label: 'Dashboard', path: '/dashboard', enabled: true },
{ label: 'Clients', path: '/customers', enabled: true },
{ label: 'Sites', path: '/sites', enabled: true },
{ label: 'Devis', path: '/quotes', enabled: true },
{ label: 'Planning', path: '/jobs', enabled: false },
{ label: 'Équipes', path: '/teams', enabled: false },
{ label: 'Véhicules', path: '/vehicles', enabled: false },
{ label: 'Équipements', path: '/equipment', enabled: false },
{ label: 'Facturation', path: '/invoices', enabled: false },
{ label: 'Rapports', path: '/reports', enabled: false },
]

export default function Sidebar() {
return ( <aside className="flex w-64 flex-col border-r border-slate-200 bg-white"> <div className="flex h-16 items-center border-b border-slate-200 px-6"> <span className="text-xl font-bold text-slate-900">
GreenPilot </span> </div>

  <nav className="flex-1 space-y-1 p-4">
    {navigation.map((item) =>
      item.enabled ? (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`
          }
        >
          {item.label}
        </NavLink>
      ) : (
        <div
          key={item.path}
          className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300"
        >
          <span>{item.label}</span>
          <span className="text-[10px] uppercase tracking-wide">
            Bientôt
          </span>
        </div>
      ),
    )}
  </nav>
</aside>

)
}
