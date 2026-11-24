export interface AppInfo {
  name: string
  version: string
}

/** API exposed by Preload; raw IPC and Node.js stay private. */
export interface DesktopAPI {
  getAppInfo: () => Promise<AppInfo>
}
