const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    // Erstelle das Browser-Fenster.
    const win = new BrowserWindow({
        width: 1100,
        height: 1200,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    win.loadFile('index.html');
    // save last Window state
    state.manage(win);
    // Öffnen der DevTools.
    win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(createWindow);
app.allowRendererProcessReuse = true;
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // Unter macOS ist es üblich, für Apps und ihre Menu Bar
    // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
    // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. Sie können den Code auch
// auf mehrere Dateien aufteilen und diese hier einbinden.
