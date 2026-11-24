import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from '@shared/channels'
import type { DesktopAPI } from '@shared/desktop'

const desktop: DesktopAPI = {
  getAppInfo: () => ipcRenderer.invoke(IPC_CHANNELS.getAppInfo),
}

contextBridge.exposeInMainWorld('desktop', desktop)
