import { Link } from "react-router-dom";

function LegalNoticePage() {
return ( <div className="min-h-screen bg-slate-50 text-slate-950"> <header className="border-b border-slate-200 bg-white"> <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"> <Link
         to="/"
         className="text-xl font-bold tracking-tight text-slate-950"
       >
UseGreenPilot </Link>

      <Link
        to="/"
        className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        Retour à l'accueil
      </Link>
    </div>
  </header>

  <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
        Informations légales
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        Mentions légales
      </h1>

      <p className="mt-6 text-lg leading-8 text-slate-600">
        Cette page présente les informations légales relatives à
        UseGreenPilot et au site associé.
      </p>
    </div>

    <div className="mt-14 space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Éditeur du site
        </h2>

        <div className="mt-5 space-y-2 text-sm leading-7 text-slate-600">
          <p>
            <span className="font-medium text-slate-900">
              Raison sociale :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              Forme juridique :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              Capital social :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">SIREN :</span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              SIRET :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              Adresse :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              Adresse e-mail :
            </span>{" "}
            À compléter
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Directeur de la publication
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          Le directeur de la publication est le représentant légal de
          l'éditeur du site.
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          <span className="font-medium text-slate-900">Nom :</span> À
          compléter
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Hébergement
        </h2>

        <div className="mt-5 space-y-2 text-sm leading-7 text-slate-600">
          <p>
            <span className="font-medium text-slate-900">
              Hébergeur :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              Adresse :
            </span>{" "}
            À compléter
          </p>
          <p>
            <span className="font-medium text-slate-900">
              Site internet :
            </span>{" "}
            À compléter
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Propriété intellectuelle
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          L'ensemble des éléments présents sur le site, notamment les
          textes, interfaces, graphismes, logos, illustrations et
          composants logiciels, est protégé par les dispositions
          applicables en matière de propriété intellectuelle, sauf mention
          contraire.
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          Toute reproduction, représentation, modification ou exploitation
          non autorisée de tout ou partie du site peut constituer une
          violation des droits de l'éditeur ou de leurs titulaires.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">
          Contact
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          Pour toute question concernant le site ou les informations
          présentées sur cette page, vous pouvez utiliser notre page de
          contact.
        </p>

        <div className="mt-6">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  </main>

  <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <p>© {new Date().getFullYear()} GreenPilot. Tous droits réservés.</p>

      <div className="flex gap-5">
        <Link
          to="/confidentialite"
          className="transition hover:text-slate-900"
        >
          Confidentialité
        </Link>

        <Link to="/cgu" className="transition hover:text-slate-900">
          CGU
        </Link>
      </div>
    </div>
  </footer>
</div>

);
}

export default LegalNoticePage;
