const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    checkForUpdates: () => ipcRenderer.send('check-for-updates'),
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
    onUpdateNotAvailable: (callback) => ipcRenderer.on('update-not-available', callback),
    onUpdateError: (callback) => ipcRenderer.on('update-error', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback)
});
