import { useAuth } from '../context/useAuth'

export default function Header() {
const { user, logout } = useAuth()

return ( <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6"> <div> <h2 className="text-lg font-semibold text-slate-900">
Dashboard </h2> </div>

  <div className="flex items-center gap-4">
    <div className="text-right">
      <p className="text-sm font-medium text-slate-900">
        {user?.first_name} {user?.last_name}
      </p>
      <p className="text-xs capitalize text-slate-500">
        {user?.role}
      </p>
    </div>

    <button
      type="button"
      onClick={logout}
      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
    >
      Déconnexion
    </button>
  </div>
</header>

)
}
