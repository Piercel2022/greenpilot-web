import { Link } from "react-router-dom";

const sections = [
  {
    title: "Objet",
    content: [
      "Les présentes conditions générales d'utilisation définissent les règles applicables à l'accès et à l'utilisation du site et des services proposés par UseGreenPilot.",
      "L'utilisation du service implique l'acceptation des présentes conditions, sous réserve des conditions commerciales ou contractuelles spécifiques éventuellement applicables.",
    ],
  },
  {
    title: "Accès au service",
    content: [
      "UseGreenPilot est une solution logicielle destinée aux professionnels du paysage et de l'environnement afin de centraliser et piloter leur activité.",
      "L'utilisateur doit disposer d'un accès à internet et d'un équipement compatible avec le service. Certaines fonctionnalités peuvent nécessiter un compte utilisateur et une authentification.",
    ],
  },
  {
    title: "Création et gestion du compte",
    content: [
      "Lorsque la création d'un compte est nécessaire, l'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour.",
      "L'utilisateur est responsable de la confidentialité de ses identifiants et de toute utilisation effectuée depuis son compte. Il doit signaler rapidement toute utilisation non autorisée ou tout incident de sécurité.",
    ],
  },
  {
    title: "Utilisation du service",
    content: [
      "L'utilisateur s'engage à utiliser UseGreenPilot conformément aux lois et réglementations applicables ainsi qu'aux présentes conditions.",
      "Il est notamment interdit d'utiliser le service à des fins frauduleuses, de tenter d'obtenir un accès non autorisé aux systèmes, de perturber le fonctionnement du service ou d'utiliser celui-ci pour porter atteinte aux droits de tiers.",
    ],
  },
  {
    title: "Contenus et données de l'utilisateur",
    content: [
      "L'utilisateur conserve ses droits sur les contenus et données qu'il renseigne dans le service.",
      "L'utilisateur garantit disposer des droits nécessaires pour traiter et transmettre ces données dans le cadre de son utilisation de UseGreenPilot, notamment lorsque celles-ci concernent des tiers tels que ses clients, salariés ou partenaires.",
    ],
  },
  {
    title: "Disponibilité et évolution du service",
    content: [
      "UseGreenPilot s'efforce d'assurer la disponibilité et le bon fonctionnement du service, sans pouvoir garantir une disponibilité permanente ou exempte d'interruption.",
      "Le service peut évoluer afin d'améliorer ses fonctionnalités, sa sécurité, ses performances ou son adéquation aux besoins des utilisateurs.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "Les éléments composant UseGreenPilot, notamment les logiciels, interfaces, marques, logos, textes, graphismes et fonctionnalités, restent protégés par les droits de propriété intellectuelle applicables.",
      "Sauf disposition contraire, aucun droit de propriété sur ces éléments n'est transféré à l'utilisateur du fait de son utilisation du service.",
    ],
  },
  {
    title: "Responsabilité",
    content: [
      "L'utilisateur demeure responsable des données qu'il saisit dans le service et des décisions prises à partir des informations produites ou consultées dans UseGreenPilot.",
      "UseGreenPilot ne saurait être tenu responsable des dommages résultant d'une utilisation non conforme du service, d'informations erronées fournies par l'utilisateur ou d'événements échappant raisonnablement à son contrôle.",
    ],
  },
  {
    title: "Protection des données",
    content: [
      "Le traitement des données personnelles effectué dans le cadre du service est décrit dans la politique de confidentialité de UseGreenPilot.",
      "Lorsque l'utilisateur renseigne des données personnelles concernant ses propres clients, salariés ou autres tiers, il lui appartient de respecter les obligations qui lui incombent en matière de protection des données.",
    ],
  },
  {
    title: "Suspension ou résiliation",
    content: [
      "En cas de manquement aux présentes conditions, UseGreenPilot peut prendre les mesures nécessaires pour protéger le service, ses utilisateurs ou ses systèmes, dans les conditions prévues par les dispositions contractuelles applicables.",
      "Les modalités de résiliation d'une offre payante, lorsqu'elle existe, sont précisées dans les conditions commerciales ou contractuelles correspondantes.",
    ],
  },
  {
    title: "Modification des conditions",
    content: [
      "Les présentes conditions peuvent être mises à jour afin de tenir compte de l'évolution du service, de la réglementation ou des pratiques de l'éditeur.",
      "La version applicable est celle publiée sur le site à la date de consultation, sous réserve des dispositions contractuelles spécifiques applicables à l'utilisateur.",
    ],
  },
];

function TermsPage() {
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
            Conditions d'utilisation
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Conditions générales d'utilisation
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Ces conditions encadrent l'utilisation du site et des services
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
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Contact</h2>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            Pour toute question concernant ces conditions, vous pouvez
            contacter l'éditeur via la page de contact.
          </p>

          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Nous contacter
            </Link>
          </div>
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

            <Link
              to="/confidentialite"
              className="transition hover:text-slate-900"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TermsPage;
