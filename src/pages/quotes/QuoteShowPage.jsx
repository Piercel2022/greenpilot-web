import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getQuote } from '../../services/quotes'

export default function QuoteShowPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadQuote = async () => {
      try {
        const data = await getQuote(id)

        if (!active) return

        setQuote(data)
      } catch {
        if (active) {
          setError('Impossible de charger le devis.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadQuote()

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return <p>Chargement...</p>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button type="button" onClick={() => navigate('/quotes')}>
          Retour aux devis
        </button>
      </div>
    )
  }

  if (!quote) {
    return (
      <div>
        <p>Devis introuvable.</p>

        <Link to="/quotes">
          Retour aux devis
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link to="/quotes">
          ← Retour aux devis
        </Link>

        <Link to={`/quotes/${quote.id}/edit`}>
          Modifier
        </Link>
      </div>

      <h1>{quote.number}</h1>

      <p>{quote.title}</p>

      <dl>
        <div>
          <dt>Client</dt>
          <dd>Client #{quote.customer_id}</dd>
        </div>

        <div>
          <dt>Site</dt>
          <dd>Site #{quote.site_id}</dd>
        </div>

        <div>
          <dt>Statut</dt>
          <dd>{quote.status}</dd>
        </div>

        <div>
          <dt>Date du devis</dt>
          <dd>{quote.issue_date}</dd>
        </div>

        <div>
          <dt>Validité</dt>
          <dd>{quote.valid_until || '—'}</dd>
        </div>

        <div>
          <dt>Sous-total</dt>
          <dd>{quote.subtotal ?? 0} €</dd>
        </div>

        <div>
          <dt>Remise</dt>
          <dd>{quote.discount_amount ?? 0} €</dd>
        </div>

        <div>
          <dt>TVA</dt>
          <dd>{quote.tax_amount ?? 0} €</dd>
        </div>

        <div>
          <dt>Total</dt>
          <dd>{quote.total_amount ?? 0} €</dd>
        </div>
      </dl>

      {quote.description && (
        <section>
          <h2>Description</h2>
          <p>{quote.description}</p>
        </section>
      )}

      {quote.notes && (
        <section>
          <h2>Notes</h2>
          <p>{quote.notes}</p>
        </section>
      )}
    </div>
  )
}