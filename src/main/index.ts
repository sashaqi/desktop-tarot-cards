import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { hasApiKey, saveApiKey, clearApiKey, keyPath } from './apiKeyStore'
import { generateAiReading, AiReadingRequest } from './aiReading'

function registerIpcHandlers(): void {
  ipcMain.handle('ai:hasKey', () => hasApiKey())
  ipcMain.handle('ai:keyPath', () => keyPath())
  ipcMain.handle('ai:saveKey', (_e, key: string) => {
    saveApiKey(key)
    return true
  })
  ipcMain.handle('ai:clearKey', () => {
    clearApiKey()
    return true
  })
  ipcMain.handle('ai:generate', async (_e, req: AiReadingRequest) => {
    try {
      return { ok: true as const, text: await generateAiReading(req) }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : String(err) }
    }
  })
}

function createMainWindow(): void {
  const win = new BrowserWindow({
    width: 900,
    height: 660,
    minWidth: 760,
    minHeight: 560,
    title: '桌面塔罗',
    backgroundColor: '#f5eedd',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  registerIpcHandlers()
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
