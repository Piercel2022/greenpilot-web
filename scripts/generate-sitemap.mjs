import { writeFile } from 'node:fs/promises'

const siteUrl = 'https://usegreenpilot.netlify.app'

const staticRoutes = [
  '/',
  '/contact',
  '/aide',
  '/tarifs',
  '/fonctionnalites',
  '/fonctionnalites/clients-sites',
  '/fonctionnalites/devis',
  '/fonctionnalites/planning-equipes',
  '/fonctionnalites/chantiers-terrain',
  '/fonctionnalites/facturation',
  '/fonctionnalites/pilotage-rentabilite',
  '/ressources',
  '/mentions-legales',
  '/confidentialite',
  '/cgu',
]

const categories = [
  'gestion',
  'planning',
  'devis',
  'chantiers',
  'rentabilite',
  'management',
  'digitalisation',
  'temoignages',
]

const resources = [
  'gerer-entreprise-paysage',
  'organiser-planning-entreprise-paysage',
  'planning-paysagiste-excel-ou-logiciel',
  'faire-devis-paysagiste-professionnel',
  'suivre-devis-clients',
  'organiser-chantier-paysagiste',
  'suivre-temps-passe-chantier',
  'calculer-rentabilite-chantier-paysagiste',
  'calculer-taux-horaire-paysagiste',
  'organiser-equipe-paysagistes',
  'digitaliser-entreprise-paysage',
  'centraliser-activite-entreprise-paysage',
]

const resourceCategories = [
  ['gestion', ['gerer-entreprise-paysage']],
  [
    'planning',
    [
      'organiser-planning-entreprise-paysage',
      'planning-paysagiste-excel-ou-logiciel',
    ],
  ],
  [
    'devis',
    [
      'faire-devis-paysagiste-professionnel',
      'suivre-devis-clients',
    ],
  ],
  [
    'chantiers',
    [
      'organiser-chantier-paysagiste',
      'suivre-temps-passe-chantier',
    ],
  ],
  [
    'rentabilite',
    [
      'calculer-rentabilite-chantier-paysagiste',
      'calculer-taux-horaire-paysagiste',
    ],
  ],
  ['management', ['organiser-equipe-paysagistes']],
  ['digitalisation', ['digitaliser-entreprise-paysage']],
  ['temoignages', ['centraliser-activite-entreprise-paysage']],
]

const routes = [
  ...staticRoutes,
  ...categories.map((category) => `/ressources/${category}`),
  ...resourceCategories.flatMap(([category, slugs]) =>
    slugs.map((slug) => `/ressources/${category}/${slug}`),
  ),
]

const uniqueRoutes = [...new Set(routes)]

const urls = uniqueRoutes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>
`

await writeFile('public/sitemap.xml', sitemap)

console.log(
  `Sitemap generated with ${uniqueRoutes.length} URLs.`,
)
