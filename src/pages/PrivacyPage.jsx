import { Link } from "react-router-dom";

const sections = [
  {
    title: "Données collectées",
    content: [
      "UseGreenPilot peut traiter les informations nécessaires à la création et à la gestion d'un compte, à l'utilisation du service et à la communication avec l'utilisateur.",
      "Selon les fonctionnalités utilisées, ces informations peuvent notamment comprendre des données d'identification, des coordonnées professionnelles, des informations relatives aux clients et sites gérés dans la plateforme, ainsi que des données nécessaires au suivi de l'activité.",
    ],
  },
  {
    title: "Finalités du traitement",
    content: [
      "Les données sont traitées afin de fournir, sécuriser et améliorer les services proposés par UseGreenPilot.",
      "Elles peuvent notamment être utilisées pour gérer les comptes utilisateurs, permettre l'accès aux fonctionnalités, assurer le support, traiter les demandes de contact, prévenir les utilisations frauduleuses et respecter les obligations légales applicables.",
    ],
  },
  {
    title: "Base légale",
    content: [
      "Les traitements sont réalisés selon leur finalité et peuvent notamment reposer sur l'exécution du contrat, le respect d'une obligation légale, le consentement de l'utilisateur ou l'intérêt légitime de l'éditeur, lorsque celui-ci est applicable.",
    ],
  },
  {
    title: "Durée de conservation",
    content: [
      "Les données sont conservées pendant une durée nécessaire aux finalités pour lesquelles elles sont traitées et conformément aux obligations légales applicables.",
      "Les durées précises de conservation pourront être précisées dans une politique de conservation détaillée ou dans les conditions contractuelles applicables au service.",
    ],
  },
  {
    title: "Vos droits",
    content: [
      "Conformément à la réglementation applicable en matière de protection des données, vous pouvez notamment disposer de droits d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et, lorsque cela est applicable, de portabilité de vos données.",
      "Vous pouvez également retirer votre consentement lorsque le traitement repose sur celui-ci.",
    ],
  },
  {
    title: "Cookies et technologies similaires",
    content: [
      "Le site et le service peuvent utiliser des cookies ou technologies similaires nécessaires à leur fonctionnement, à leur sécurité et, lorsque cela est applicable, à la mesure de leur utilisation.",
      "Les modalités de gestion et de consentement des cookies seront présentées à l'utilisateur lorsque la réglementation l'exige.",
    ],
  },
  {
    title: "Sous-traitants et prestataires",
    content: [
      "UseGreenPilot peut faire appel à des prestataires techniques nécessaires au fonctionnement du service, notamment pour l'hébergement, l'infrastructure, l'envoi de communications ou la maintenance.",
      "Lorsque ces prestataires traitent des données personnelles pour le compte de l'éditeur, ils sont sélectionnés et encadrés conformément aux exigences applicables.",
    ],
  },
  {
    title: "Sécurité",
    content: [
      "UseGreenPilot met en œuvre des mesures techniques et organisationnelles destinées à protéger les données contre les accès non autorisés, la perte, l'altération ou la divulgation.",
      "Aucun système informatique ne pouvant garantir une sécurité absolue, l'éditeur poursuit l'amélioration continue de ses mesures de protection.",
    ],
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-950"
          >
            UseGreenPilot
          </Link>

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
            Protection des données
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Politique de confidentialité
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Cette politique décrit les principes appliqués au traitement des
            données personnelles dans le cadre du site et des services
            UseGreenPilot.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Dernière mise à jour : à compléter
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {section.title}
              </h2>

              <div className="mt-5 space-y-4">
                {section.content.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Exercer vos droits
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Pour toute demande relative à vos données personnelles, vous
              pouvez contacter l'éditeur à l'adresse indiquée dans les
              mentions légales ou utiliser la page de contact.
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
              to="/mentions-legales"
              className="transition hover:text-slate-900"
            >
              Mentions légales
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

export default PrivacyPage;