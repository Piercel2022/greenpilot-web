import { Link } from "react-router-dom";

function HomeNavbar() {
return ( <header className="border-b border-slate-200/80 bg-white"> <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"> <Link
       to="/"
       className="flex items-center gap-2"
       aria-label="GreenPilot - Accueil"
     > <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white">
G </div>

      <span className="text-xl font-bold tracking-tight text-slate-950">
        GreenPilot
      </span>
    </Link>

    <nav className="hidden items-center gap-8 md:flex">
      <a
        href="#plateforme"
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Plateforme
      </a>

      <a
        href="#fonctionnalites"
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Fonctionnalités
      </a>

      <a
        href="#pourquoi-greenpilot"
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Pourquoi GreenPilot
      </a>
    </nav>

    <div className="flex items-center gap-3">
      <Link
        to="/login"
        className="hidden text-sm font-semibold text-slate-700 transition hover:text-slate-950 sm:inline-flex"
      >
        Se connecter
      </Link>

      <Link
        to="/register"
        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
      >
        Commencer
      </Link>
    </div>
  </div>
</header>

);
}

export default HomeNavbar;
