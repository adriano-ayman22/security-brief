const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
if (!app.requestSingleInstanceLock()) { app.quit(); }
function createWindow() {
  const win = new BrowserWindow({
    width: 1100, height: 820, minWidth: 500, minHeight: 600,
    title: 'نشرة أمنية', backgroundColor: '#081a2c',
    icon: path.join(__dirname, 'build', '1-icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '1-app.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, u) => { if (!u.startsWith('file:')) e.preventDefault(); });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
