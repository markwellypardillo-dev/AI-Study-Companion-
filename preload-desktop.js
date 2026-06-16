/**
 * Electron Secure Preload Script
 * Safely bridges Electron's IPC APIs into the container window without security compromises.
 */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  sendNotification: (title, body) => {
    ipcRenderer.send("app:notify", { title, body });
  },
  minimizeApp: () => ipcRenderer.send("app:minimize"),
  closeApp: () => ipcRenderer.send("app:close")
});
