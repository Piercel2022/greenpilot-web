// =============================================================================
// Fichier : CustomerShowPage.jsx
// But     : Page affichant la fiche détaillée d'un client (lecture seule).
//           - Charge les données du client via son identifiant (id) présent
//             dans l'URL.
//           - Affiche les informations du client sous forme de fiche
//             (type, société, coordonnées, statut, notes, etc.).
//           - Propose un accès rapide vers la page de modification du client.
//           - Gère les états de chargement et d'erreur.
// =============================================================================

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCustomer } from '../../services/customers'

/**
 * Composant : CustomerShowPage
 * But       : Page de consultation (lecture seule) d'un client.
 *             Récupère les données du client et affiche l'ensemble de ses
 *             informations dans une fiche structurée, avec un accès rapide
 *             vers la page d'édition.
 */
export default function CustomerShowPage() {
  // Récupère l'identifiant du client depuis l'URL (ex: /customers/:id)
  const { id } = useParams()

  // Données du client actuellement chargées (null tant qu'elles ne sont pas récupérées)
  const [customer, setCustomer] = useState(null)

  // Indique si le chargement initial du client est en cours
  const [loading, setLoading] = useState(true)

  // Message d'erreur à afficher en cas d'échec du chargement
  const [error, setError] = useState('')

  /**
   * Effet : chargement du client
   * But   : Récupère les données du client dès que l'identifiant (id) change.
   *         Utilise un flag "active" pour éviter de mettre à jour l'état
   *         du composant si celui-ci a été démonté avant la fin de la requête
   *         (évite les fuites mémoire / warnings React).
   */
  useEffect(() => {
    let active = true

    async function loadCustomer() {
      try {
        setError('')

        // Appel API pour récupérer les informations du client
        const data = await getCustomer(id)

        if (active) {
          setCustomer(data)
        }
      } catch {
        if (active) {
          setError('Impossible de charger le client.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadCustomer()

    // Nettoyage : si le composant est démonté, on désactive les mises à jour d'état
    return () => {
      active = false
    }
  }, [id])

  // ---------------------------------------------------------------------------
  // Rendu : état de chargement
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-full p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Chargement du client...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Rendu : erreur (impossible de charger le client)
  // ---------------------------------------------------------------------------
  if (error) {
    return (
      <div className="min-h-full p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <Link
            to="/customers"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            ← Retour aux clients
          </Link>

          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Garde-fou : si aucun client n'est chargé (cas normalement déjà couvert
  // par les états précédents), on ne rend rien.
  // ---------------------------------------------------------------------------
  if (!customer) {
    return null
  }

  // Construit le nom complet du client à partir du prénom et du nom,
  // en ignorant les valeurs vides/nulles (Boolean filtre les valeurs falsy).
  const name = [
    customer.first_name,
    customer.last_name,
  ]
    .filter(Boolean)
    .join(' ')

  // ---------------------------------------------------------------------------
  // Rendu principal : fiche détaillée du client
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-full p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* En-tête : lien retour, titre du client, et bouton d'accès à l'édition */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              to="/customers"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              ← Retour aux clients
            </Link>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Gestion commerciale
            </p>

            {/* Titre : nom complet, sinon nom de société, sinon libellé générique */}
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {name || customer.company_name || 'Client'}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Fiche détaillée du client.
            </p>
          </div>

          {/* Bouton menant vers la page de modification du client */}
          <Link
            to={`/customers/${id}/edit`}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Modifier
          </Link>
        </div>

        {/* Carte contenant l'ensemble des informations du client */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Informations du client
            </h2>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* Type de client : entreprise ou particulier */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.customer_type === 'company'
                  ? 'Entreprise'
                  : 'Particulier'}
              </p>
            </div>

            {/* Nom de la société (le cas échéant) */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Société
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.company_name || '—'}
              </p>
            </div>

            {/* Prénom du client */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Prénom
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.first_name || '—'}
              </p>
            </div>

            {/* Nom du client */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nom
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.last_name || '—'}
              </p>
            </div>

            {/* Adresse email */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.email || '—'}
              </p>
            </div>

            {/* Numéro de téléphone fixe */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Téléphone
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.phone || '—'}
              </p>
            </div>

            {/* Numéro de mobile */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mobile
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.mobile || '—'}
              </p>
            </div>

            {/* Statut du client : actif ou inactif */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Statut
              </p>

              <p className="mt-1 text-sm text-slate-900">
                {customer.active ? 'Actif' : 'Inactif'}
              </p>
            </div>

            {/* Notes libres, sur toute la largeur (2 colonnes) */}
            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Notes
              </p>

              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-900">
                {customer.notes || '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}