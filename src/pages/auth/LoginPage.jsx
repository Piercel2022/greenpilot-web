import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export default function LoginPage() {
const { login, isAuthenticated, loading } = useAuth()
const navigate = useNavigate()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

if (loading) {
return ( <main className="flex min-h-screen items-center justify-center bg-slate-50"> <p className="text-sm text-slate-500">Chargement...</p> </main>
)
}

if (isAuthenticated) {
return <Navigate to="/dashboard" replace />
}

async function handleSubmit(event) {
event.preventDefault()

setError('')
setSubmitting(true)

try {
  await login(email, password)
  navigate('/dashboard', { replace: true })
} catch {
  setError('Email ou mot de passe incorrect.')
} finally {
  setSubmitting(false)
}

}

return ( <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4"> <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm"> <div> <h1 className="text-2xl font-bold text-slate-900">
GreenPilot </h1>

      <p className="mt-2 text-sm text-slate-600">
        Connectez-vous à votre espace.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          placeholder="vous@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Mot de passe
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          placeholder="Votre mot de passe"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  </div>
</main>

)
}
