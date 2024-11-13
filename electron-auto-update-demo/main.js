const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();

    // Bắt đầu kiểm tra cập nhật khi ứng dụng khởi chạy
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
        console.log('Bản cập nhật mới đã có sẵn.');
    });

    autoUpdater.on('update-downloaded', () => {
        console.log('Bản cập nhật đã được tải xuống, sẽ cài đặt sau khi khởi động lại.');
        autoUpdater.quitAndInstall();
    });

    autoUpdater.on('error', (error) => {
        console.error('Có lỗi xảy ra trong quá trình tự cập nhật:', error);
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
