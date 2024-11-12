const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

// Tạo cửa sổ chính
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Đảm bảo preload.js được nạp
            nodeIntegration: false, // Tắt nodeIntegration vì chúng ta sẽ sử dụng preload.js
            contextIsolation: true, // Bật contextIsolation
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    // Lắng nghe sự kiện check-for-updates từ renderer process
    ipcMain.on('check-for-updates', () => {
        // Gọi hàm checkForUpdates của electron-updater
        autoUpdater.checkForUpdatesAndNotify();
    });

    autoUpdater.on('update-available', (info) => {
        console.log('Update available: ', info);
        mainWindow.webContents.send('update-available', info); // Gửi sự kiện cho renderer process
    });

    autoUpdater.on('update-not-available', (info) => {
        console.log('Update not available: ', info);
        mainWindow.webContents.send('update-not-available', info); // Gửi sự kiện cho renderer process
    });

    autoUpdater.on('error', (err) => {
        console.log('Error during update: ', err);
        mainWindow.webContents.send('update-error', err); // Gửi sự kiện lỗi cho renderer process
    });

    autoUpdater.on('update-downloaded', (info) => {
        console.log('Update downloaded: ', info);
        mainWindow.webContents.send('update-downloaded', info); // Gửi sự kiện tải xong cho renderer process
    });

    // Kiểm tra bản cập nhật khi ứng dụng bắt đầu
    autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
