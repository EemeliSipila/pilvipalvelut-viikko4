// Firebase Console > Project settings > Your apps > SDK setup and configuration
// Arvot luetaan .env-tiedostosta paikallisesti tai GitHub Actions -muuttujista.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value.trim().length > 0,
)

export default firebaseConfig

console.table(
  Object.fromEntries(
    Object.entries(firebaseConfig).map(([key, value]) => [key, Boolean(value)])
  )
)
