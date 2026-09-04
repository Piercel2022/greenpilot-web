 
 
 
 
 function ProblemSection() {

  const problems = [
    {
      number: "01",
      title: "Des informations dispersées",
      description:
        "Clients, sites, contacts et informations importantes sont souvent répartis entre plusieurs fichiers, emails et outils.",
    },
    {
      number: "02",
      title: "Des devis difficiles à suivre",
      description:
        "Entre les demandes, les prestations, les montants et les relances, il devient difficile de savoir précisément où en est chaque devis.",
    },
    {
      number: "03",
      title: "Un planning qui manque de visibilité",
      description:
        "Les équipes, les interventions et les priorités doivent être coordonnées rapidement, sans multiplier les échanges.",
    },
    {
      number: "04",
      title: "Le terrain et le bureau sont déconnectés",
      description:
        "Les informations d’intervention, les rapports et les photos doivent pouvoir circuler simplement entre les équipes et le bureau.",
    },
    {
      number: "05",
      title: "Une facturation qui arrive trop tard",
      description:
        "Quand les informations opérationnelles ne sont pas centralisées, la facturation peut prendre du retard et réduire la visibilité sur l’activité.",
    },
    {
      number: "06",
      title: "Une rentabilité difficile à mesurer",
      description:
        "Sans vision claire des coûts, du temps passé et des prestations réalisées, il devient difficile de savoir quels chantiers sont réellement rentables.",
    },
  ];

  return (
    <section id="plateforme" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Le problème
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Votre entreprise ne devrait pas être pilotée entre plusieurs
            outils.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Quand les informations sont dispersées entre tableurs, emails,
            messageries, agendas et logiciels différents, chaque journée
            devient plus difficile à coordonner.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <article
              key={problem.number}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-sm"
            >
              <span className="text-sm font-bold text-green-600">
                {problem.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-slate-950">
                {problem.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {problem.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-green-100 bg-green-50 px-6 py-8 text-center sm:px-10">
          <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            Le résultat : moins de visibilité, plus d'échanges et davantage
            de temps consacré à l'administration.
          </p>
        </div>
      </div>
    </section>
  );
}
export default ProblemSection;