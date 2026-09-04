const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "#modules" },
    { label: "Tarifs", href: "#tarifs" },
  ],
  Ressources: [
    { label: "Aide", href: "#aide" },
    { label: "Contact", href: "#contact" },
  ],
  Légal: [
    { label: "Mentions légales", href: "#mentions-legales" },
    { label: "Politique de confidentialité", href: "#confidentialite" },
    { label: "CGU", href: "#cgu" },
  ],
};

 function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              GreenPilot
            </a>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              La gestion tout-en-un pour les entreprises du paysage et de
              l'environnement.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GreenPilot. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;