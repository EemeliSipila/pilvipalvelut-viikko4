import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from 'firebase/auth'
import firebaseConfig, { isFirebaseConfigured } from '../firebaseConfig'

// Ei käynnistetä Firebasea, ennen kuin oma projektin konfiguraatio on lisätty.
export const auth: Auth | null = isFirebaseConfigured
  ? getAuth(initializeApp(firebaseConfig))
  : null

export async function loginWithEmail(email: string, password: string): Promise<User> {
  if (!auth) throw new Error('Firebase-asetukset puuttuvat.')
  const result = await signInWithEmailAndPassword(auth, email.trim(), password)
  return result.user
}

export async function logout(): Promise<void> {
  if (!auth) return
  await signOut(auth)
}
