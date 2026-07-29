import { contextBridge, ipcRenderer } from 'electron'

// The API key itself never crosses this bridge — the renderer can only ask
// whether one is configured, set a new one, or clear it.
const api = {
  hasApiKey: (): Promise<boolean> => ipcRenderer.invoke('ai:hasKey'),
  apiKeyPath: (): Promise<string> => ipcRenderer.invoke('ai:keyPath'),
  saveApiKey: (key: string): Promise<boolean> => ipcRenderer.invoke('ai:saveKey', key),
  clearApiKey: (): Promise<boolean> => ipcRenderer.invoke('ai:clearKey'),
  generateReading: (
    req: unknown
  ): Promise<{ ok: true; text: string } | { ok: false; error: string }> =>
    ipcRenderer.invoke('ai:generate', req)
}

contextBridge.exposeInMainWorld('api', api)

export type TarotApi = typeof api
