// Tehtävä 4.10: Firebase UID on Local Storage -avaimen osa.
const adjectives = ['Cosmic', 'Silent', 'Electric', 'Sneaky', 'Mystic', 'Hyper', 'Golden']
const animals = ['Panda', 'Fox', 'Dragon', 'Otter', 'Tiger', 'Hawk', 'Lizard']

function storageKey(uid: string): string {
  return `codename:${uid}`
}

export function generateCodename(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const number = Math.floor(Math.random() * 3000)
  return `${adjective}${animal}${number}`
}

export function getOrCreateCodename(uid: string): string {
  const key = storageKey(uid)
  const saved = localStorage.getItem(key)
  if (saved && saved.trim()) return saved

  const freshName = generateCodename()
  localStorage.setItem(key, freshName)
  return freshName
}

export function regenerateCodename(uid: string): string {
  const name = generateCodename()
  localStorage.setItem(storageKey(uid), name)
  return name
}
