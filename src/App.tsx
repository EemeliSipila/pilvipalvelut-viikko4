import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth, logout } from './authService'
import { getOrCreateCodename, regenerateCodename } from './codenameService'
import LoginForm from './LoginForm'
import { isFirebaseConfigured } from '../firebaseConfig'
import './App.css'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [codename, setCodename] = useState('')
  const [authReady, setAuthReady] = useState(!isFirebaseConfigured)
  const [logoutError, setLogoutError] = useState('')

  useEffect(() => {
    if (!auth) return
    // Firebase ilmoittaa sekä kirjautumisen että uloskirjautumisen.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setCodename(firebaseUser ? getOrCreateCodename(firebaseUser.uid) : '')
      setAuthReady(true)
    })
    return () => unsubscribe()
  }, [])

  async function handleLogout() {
    setLogoutError('')
    try {
      await logout()
    } catch {
      setLogoutError('Uloskirjautuminen epäonnistui. Yritä uudelleen.')
    }
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">✳</div>
        <div className="brand"><strong>CODE / NAME</strong><span>Firebase Identity Lab</span></div>
        <div className="status"><span className="status-dot" /> PILVIPALVELUT · V4</div>
      </header>

      <main className="content">
        <div className="intro">
          <p className="eyebrow">HARJOITUS 04 / FIREBASE AUTHENTICATION</p>
          <h1>Identiteettisi.<br /><span className="gradient-text">Uusi ulottuvuus.</span></h1>
          <p className="subtitle">Kirjaudu sisään. Löydä henkilökohtainen koodinimesi. Se pysyy tallessa, kun palaat takaisin samalla selaimella.</p>
        </div>

        {!isFirebaseConfigured ? (
          <section className="card setup-card" aria-labelledby="setup-title">
            <span className="setup-icon" aria-hidden="true">⚙</span>
            <p className="eyebrow">KÄYTTÖÖNOTTO PUUTTUU</p>
            <h2 id="setup-title">Yhdistä Firebase-projektisi</h2>
            <p className="muted">Sovelluksen käyttöliittymä on valmis, mutta Firebase-asetukset puuttuvat vielä.</p>
            <ol className="setup-steps">
              <li>Luo Firebase Consoleen projekti ja web-sovellus.</li>
              <li>Ota käyttöön Authentication → Email/Password.</li>
              <li>Täytä projektin <code>.env</code>-tiedosto ohjeen mukaisesti.</li>
              <li>Käynnistä kehityspalvelin uudelleen.</li>
            </ol>
            <p className="hint">Katso projektin README.md-tiedosto.</p>
          </section>
        ) : !authReady ? (
          <section className="card loading-card"><div className="spinner" aria-hidden="true" /><p>Haetaan kirjautumistietoja…</p></section>
        ) : user ? (
          <section className="card profile-card" aria-labelledby="profile-title">
            <div className="profile-head">
              <span className="profile-avatar" aria-hidden="true">✦</span>
              <span className="verified">● TUNNISTETTU KÄYTTÄJÄ</span>
            </div>
            <p className="eyebrow">TERVETULOA,</p>
            <h2 id="profile-title" className="codename">{codename}</h2>
            <p className="muted">Tämä nimi on tallennettu selaimesi Local Storageen käyttäjäkohtaisesti.</p>
            <div className="identity-details">
              <div><span>SÄHKÖPOSTI</span><strong>{user.email || 'Ei sähköpostiosoitetta'}</strong></div>
              <div><span>FIREBASE UID</span><strong className="uid">{user.uid}</strong></div>
            </div>
            <div className="profile-actions">
              <button className="primary-button" onClick={() => setCodename(regenerateCodename(user.uid))}>Generoi uusi nimi <span aria-hidden="true">↻</span></button>
              <button className="secondary-button" onClick={handleLogout}>Kirjaudu ulos</button>
            </div>
            {logoutError && <p className="form-error" role="alert">{logoutError}</p>}
          </section>
        ) : (
          <LoginForm />
        )}
      </main>
      <footer><span>CODE / NAME © 2026</span><span>React · TypeScript · Firebase · Local Storage</span></footer>
    </div>
  )
}
