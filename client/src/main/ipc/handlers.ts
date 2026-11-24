import { app, BrowserWindow, ipcMain } from 'electron'
import { IPC_CHANNELS } from '@shared/channels'
import type { AppInfo } from '@shared/desktop'

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.getAppInfo, (event): AppInfo => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (!window || event.senderFrame !== window.webContents.mainFrame) {
      throw new Error('Invalid IPC sender')
    }
    return { name: 'NihonQuiz', version: app.getVersion() }
  })
}
