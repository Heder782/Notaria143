const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

// Esto es para que electron se recargue solo al guardar un cambio. (A veces produce error, solo basta con hacerlo manual)
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  
  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools(); 
    
  } else {
    win.loadFile('built/index.html');
  }
}

app.whenReady().then(createWindow);