import { app, safeStorage } from 'electron'
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs'
import { join } from 'path'

// The key is encrypted at rest with the OS keychain (safeStorage) and never
// crosses into the renderer — only a boolean "is it configured" does.
export function keyPath(): string {
  return join(app.getPath('userData'), 'anthropic-key.bin')
}

export function hasApiKey(): boolean {
  return existsSync(keyPath())
}

export function saveApiKey(key: string): void {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error('OS secure storage is unavailable, refusing to store the key in plain text.')
  }
  writeFileSync(keyPath(), safeStorage.encryptString(key))
}

export function clearApiKey(): void {
  if (existsSync(keyPath())) unlinkSync(keyPath())
}

export function readApiKey(): string | null {
  if (!hasApiKey()) return null
  try {
    return safeStorage.decryptString(readFileSync(keyPath()))
  } catch {
    return null
  }
}
