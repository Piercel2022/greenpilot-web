export const resourceCategories = [
  {
    slug: 'gestion',
    name: 'Gestion',
    description:
      "Mieux organiser la gestion quotidienne d'une entreprise de paysage.",
  },
  {
    slug: 'planning',
    name: 'Planning',
    description:
      'Organiser les interventions, les équipes et les déplacements.',
  },
  {
    slug: 'devis',
    name: 'Devis',
    description:
      'Créer, suivre et améliorer les devis pour gagner en efficacité.',
  },
  {
    slug: 'chantiers',
    name: 'Chantiers',
    description:
      'Mieux préparer, suivre et piloter les chantiers sur le terrain.',
  },
  {
    slug: 'rentabilite',
    name: 'Rentabilité',
    description:
      'Comprendre ses coûts, ses marges et les performances de son activité.',
  },
  {
    slug: 'management',
    name: 'Management',
    description:
      'Organiser les équipes et améliorer la communication au quotidien.',
  },
  {
    slug: 'digitalisation',
    name: 'Digitalisation',
    description:
      'Moderniser les méthodes de travail et digitaliser son entreprise.',
  },
  {
    slug: 'temoignages',
    name: 'Témoignages',
    description:
      "Découvrez les expériences et méthodes d'entreprises du paysage.",
  },
]

export const resources = [
  {
    slug: 'gerer-entreprise-paysage',
    category: 'gestion',
    title: "Comment bien gérer une entreprise de paysage ?",
    excerpt:
      'Les fondamentaux pour mieux organiser les clients, les sites, les équipes, les interventions et le suivi administratif.',
    readTime: '10 min',
    publishedAt: '2026-09-24',
    featured: true,
  },
  {
  slug: 'organiser-planning-entreprise-paysage',
  category: 'planning',
  title:
    "Comment organiser le planning d'une entreprise de paysage ?",
  seoTitle:
    "Comment organiser le planning d'une entreprise de paysage ?",
  metaDescription:
    "Découvrez une méthode concrète pour organiser le planning d'une entreprise de paysage : équipes, interventions, déplacements, météo et imprévus.",
  excerpt:
    'Une méthode concrète pour organiser les interventions, les équipes, les déplacements et les imprévus.',
  readTime: '8 min',
  publishedAt: '2026-09-24',
  featured: true,
 },
  {
  slug: 'planning-paysagiste-excel-ou-logiciel',
  category: 'planning',
  title: 'Planning paysagiste : Excel ou logiciel ?',
  seoTitle:
    'Planning paysagiste : Excel ou logiciel spécialisé ?',
  metaDescription:
    "Planning paysagiste sur Excel ou logiciel spécialisé : découvrez les avantages, les limites et les critères pour choisir une organisation adaptée.",
  excerpt:
    'Les avantages, limites et différences entre un planning sur tableur et un outil spécialisé.',
  readTime: '7 min',
  publishedAt: '2026-09-24',
  featured: true,
},
  {
    slug: 'faire-devis-paysagiste-professionnel',
    category: 'devis',
    title: 'Comment faire un devis paysagiste professionnel ?',
    excerpt:
      'Les éléments essentiels à intégrer dans un devis clair, précis et adapté aux prestations de paysage.',
    readTime: '9 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'suivre-devis-clients',
    category: 'devis',
    title: 'Comment suivre efficacement ses devis clients ?',
    excerpt:
      'Une méthode simple pour ne plus perdre le fil entre devis envoyés, relances, acceptations et chantiers.',
    readTime: '7 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'organiser-chantier-paysagiste',
    category: 'chantiers',
    title: 'Comment organiser un chantier paysagiste ?',
    excerpt:
      'Préparation, équipes, matériel, consignes et suivi : les étapes clés pour mieux piloter un chantier.',
    readTime: '9 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'suivre-temps-passe-chantier',
    category: 'chantiers',
    title: 'Comment suivre le temps passé sur un chantier ?',
    excerpt:
      'Pourquoi le suivi du temps est essentiel pour comprendre les coûts réels et améliorer la rentabilité.',
    readTime: '8 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'calculer-rentabilite-chantier-paysagiste',
    category: 'rentabilite',
    title: 'Comment calculer la rentabilité d’un chantier paysagiste ?',
    excerpt:
      'Découvrez les principaux coûts à prendre en compte pour mesurer la rentabilité réelle de vos chantiers.',
    readTime: '10 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'calculer-taux-horaire-paysagiste',
    category: 'rentabilite',
    title: 'Comment calculer son taux horaire en entreprise de paysage ?',
    excerpt:
      'Une méthode pour mieux intégrer les charges, le temps productif, les déplacements et les objectifs de marge.',
    readTime: '9 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'organiser-equipe-paysagistes',
    category: 'management',
    title: 'Comment organiser une équipe de paysagistes ?',
    excerpt:
      'Répartition des tâches, consignes, planning et communication : les bases pour mieux coordonner une équipe terrain.',
    readTime: '8 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'digitaliser-entreprise-paysage',
    category: 'digitalisation',
    title: 'Comment digitaliser une entreprise de paysage ?',
    excerpt:
      'Les principaux processus à digitaliser pour gagner du temps et centraliser les informations de son entreprise.',
    readTime: '10 min',
    publishedAt: '2026-09-24',
  },
  {
    slug: 'centraliser-activite-entreprise-paysage',
    category: 'temoignages',
    title:
      'Comment une entreprise de paysage peut centraliser toute son activité ?',
    excerpt:
      'Un exemple de démarche pour réunir clients, sites, devis, planning, chantiers et facturation dans un même environnement.',
    readTime: '7 min',
    publishedAt: '2026-09-24',
  },
]

export function getCategoryBySlug(slug) {
  return resourceCategories.find((category) => category.slug === slug)
}

export function getResourceBySlug(slug) {
  return resources.find((resource) => resource.slug === slug)
}

export function getResourcesByCategory(categorySlug) {
  return resources.filter((resource) => resource.category === categorySlug)
}

export function getFeaturedResources() {
  return resources.filter((resource) => resource.featured)
}

export function getRelatedResources(resource, limit = 3) {
  return resources
    .filter(
      (item) =>
        item.category === resource.category && item.slug !== resource.slug,
    )
    .slice(0, limit)
}
