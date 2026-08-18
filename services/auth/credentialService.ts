import { storageService } from '../storage/storageService'

const CREDENTIALS_KEY = 'egyptgo_credentials'

type CredentialMap = Record<string, string>

async function hash(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password)
  const digest = await window.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const credentialService = {
  async setPassword(email: string, password: string): Promise<void> {
    const key = email.trim().toLowerCase()
    const map = storageService.get<CredentialMap>(CREDENTIALS_KEY, {})
    map[key] = await hash(password)
    storageService.set(CREDENTIALS_KEY, map)
  },
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const key = email.trim().toLowerCase()
    const map = storageService.get<CredentialMap>(CREDENTIALS_KEY, {})
    if (!map[key]) return false
    return map[key] === (await hash(password))
  },
}