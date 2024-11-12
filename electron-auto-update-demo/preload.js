const { contextBridge, ipcRenderer } = require('electron');

// Expose các API từ main process cho renderer process
contextBridge.exposeInMainWorld('electron', {
    checkForUpdates: () => ipcRenderer.send('check-for-updates'), // Expose hàm checkForUpdates
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
    onUpdateNotAvailable: (callback) => ipcRenderer.on('update-not-available', callback),
    onUpdateError: (callback) => ipcRenderer.on('update-error', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback)
});
