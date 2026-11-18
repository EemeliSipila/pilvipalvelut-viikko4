import { useState, type FormEvent } from 'react'
import { FirebaseError } from 'firebase/app'
import { loginWithEmail } from './authService'

function readableError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Tarkista sähköpostiosoitteen muoto.'
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Sähköposti tai salasana on virheellinen.'
      case 'auth/too-many-requests':
        return 'Liian monta yritystä. Yritä myöhemmin uudelleen.'
      case 'auth/network-request-failed':
        return 'Verkkoyhteys epäonnistui. Tarkista yhteys.'
      case 'auth/operation-not-allowed':
        return 'Ota Firebase Consolessa Email/Password-kirjautuminen käyttöön.'
      default:
        return `Kirjautuminen epäonnistui (${error.code}).`
    }
  }
  return error instanceof Error ? error.message : 'Kirjautuminen epäonnistui.'
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      await loginWithEmail(email, password)
      // App-komponentin onAuthStateChanged hoitaa näkymän vaihtamisen.
    } catch (caught) {
      setError(readableError(caught))
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="card login-card" aria-labelledby="login-title">
      <div className="card-icon" aria-hidden="true">✦</div>
      <p className="eyebrow">TURVALLINEN KIRJAUTUMINEN</p>
      <h2 id="login-title">Tervetuloa takaisin.</h2>
      <p className="muted lead">Kirjaudu Firebase-tunnuksillasi ja paljasta oma koodinimesi.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Sähköposti</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="nimi@esimerkki.fi"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Salasana</label>
        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="Syötä salasanasi"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="show-password"
            type="button"
            aria-label={showPassword ? 'Piilota salasana' : 'Näytä salasana'}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Piilota' : 'Näytä'}
          </button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="primary-button" disabled={pending}>
          {pending ? 'Kirjaudutaan…' : 'Kirjaudu sisään'}
          <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className="form-footnote">Harjoitussovellus · Firebase Authentication</p>
    </section>
  )
}
