
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  UsersRound,
  MapPinned,
  FileText,
  CalendarDays,
  Truck,
  Wrench,
  ReceiptText,
  ChartNoAxesCombined,
} from 'lucide-react'

const navigationGroups = [
  {
    label: 'Pilotage',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        enabled: true,
        icon: LayoutDashboard,
        iconColor: 'text-indigo-600',
        iconBg: 'bg-indigo-50',
      },
      {
        label: 'Rapports',
        path: '/reports',
        enabled: true,
        icon: ChartNoAxesCombined,
        iconColor: 'text-violet-600',
        iconBg: 'bg-violet-50',
      },
    ],
  },
  {
    label: 'Commercial',
    items: [
      {
        label: 'Clients',
        path: '/customers',
        enabled: true,
        icon: UsersRound,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50',
      },
      {
        label: 'Sites',
        path: '/sites',
        enabled: true,
        icon: MapPinned,
        iconColor: 'text-cyan-600',
        iconBg: 'bg-cyan-50',
      },
      {
        label: 'Devis',
        path: '/quotes',
        enabled: true,
        icon: FileText,
        iconColor: 'text-blue-700',
        iconBg: 'bg-blue-50',
      },
    ],
  },
  {
    label: 'Opérations',
    items: [
      {
        label: 'Planning',
        path: '/jobs',
        enabled: true,
        icon: CalendarDays,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
      },
      {
        label: 'Équipes',
        path: '/teams',
        enabled: true,
        icon: UsersRound,
        iconColor: 'text-green-600',
        iconBg: 'bg-green-50',
      },
    ],
  },
  {
    label: 'Ressources',
    items: [
      {
        label: 'Véhicules',
        path: '/vehicles',
        enabled: true,
        icon: Truck,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50',
      },
      {
        label: 'Équipements',
        path: '/equipment',
        enabled: true,
        icon: Wrench,
        iconColor: 'text-orange-600',
        iconBg: 'bg-orange-50',
      },
    ],
  },
  {
    label: 'Finance',
    items: [
      {
        label: 'Facturation',
        path: '/invoices',
        enabled: true,
        icon: ReceiptText,
        iconColor: 'text-emerald-700',
        iconBg: 'bg-emerald-50',
      },
    ],
  },
]

 function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          GreenPilot
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon

                  return item.enabled ? (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                              isActive
                                ? 'bg-white/10 text-white'
                                : `${item.iconBg} ${item.iconColor} group-hover:scale-105`
                            }`}
                          >
                            <Icon
                              size={17}
                              strokeWidth={isActive ? 2 : 1.8}
                            />
                          </span>

                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ) : (
                    <div
                      key={item.path}
                      className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-300">
                          <Icon size={17} strokeWidth={1.8} />
                        </span>

                        <span>{item.label}</span>
                      </div>

                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-300">
                        Bientôt
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  )
}
export default Sidebar;