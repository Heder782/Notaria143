const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const isDev = !app.isPackaged;

let db;
let mainWindow;
let currentUser = null;

function initializeDatabase() {
  const dbPath = path.join(process.cwd(), 'notaria_data.db');
  db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      nombre TEXT,
      tipo TEXT CHECK(tipo IN ('admin', 'empleado')),
      activo INTEGER DEFAULT 1
    )`);
    db.get("SELECT COUNT(*) as count FROM usuarios WHERE username = 'admin'", (err, row) => {
      if (row && row.count === 0) {
        db.run(
          "INSERT INTO usuarios (username, password, nombre, tipo) VALUES (?, ?, ?, ?)",
          ['admin', 'admin123', 'Administrador Principal', 'admin']
        );
      }
    });
  });
}

function createWindow() {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('build/index.html');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.handle('login-user', async (event, credentials) => {
  return new Promise((resolve) => {
    const { username, password } = credentials;
    
    db.get(
      "SELECT * FROM usuarios WHERE username = ? AND password = ? AND activo = 1",
      [username, password],
      (err, row) => {
        if (err) {
          console.error('Error en login:', err);
          resolve({ success: false, error: 'Error de base de datos' });
        } else if (row) {
          currentUser = {
            id: row.id,
            username: row.username,
            nombre: row.nombre,
            tipo: row.tipo
          };
          resolve({ success: true, user: currentUser });
        } else {
          resolve({ success: false, error: 'Credenciales incorrectas' });
        }
      }
    );
  });
});

ipcMain.handle('get-current-user', async () => {
  return currentUser;
});

ipcMain.handle('logout-user', async () => {
  currentUser = null;
  if (mainWindow) {
    mainWindow.reload();
  }
  return true;
});

ipcMain.handle('verify-auth', async (event, requiredType) => {
  if (!currentUser) {
    return { authenticated: false, error: 'No autenticado' };
  }
  
  if (requiredType && currentUser.tipo !== requiredType) {
    return { authenticated: false, error: 'Permisos insuficientes' };
  }
  
  return { authenticated: true, user: currentUser };
});

ipcMain.handle('obtener-usuarios', async () => {
  return new Promise((resolve) => {
    db.all("SELECT * FROM usuarios WHERE activo = 1", (err, rows) => {
      if (err) {
        console.error('Error obteniendo usuarios:', err);
        resolve([]);
      } else {
        resolve(rows || []);
      }
    });
  });
});

ipcMain.handle('agregar-usuario', async (event, usuario) => {
  return new Promise((resolve) => {
    const stmt = db.prepare(
      "INSERT INTO usuarios (username, password, nombre, tipo) VALUES (?, ?, ?, ?)"
    );
    stmt.run([usuario.username, usuario.password, usuario.nombre, usuario.tipo], function(err) {
      if (err) {
        console.error('Error agregando usuario:', err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
    stmt.finalize();
  });
});

ipcMain.handle('eliminar-usuario', async (event, id) => {
  return new Promise((resolve) => {
    db.run("UPDATE usuarios SET activo = 0 WHERE id = ?", [id], function(err) {
      if (err) {
        console.error('Error eliminando usuario:', err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
});

app.whenReady().then(() => {
  initializeDatabase();
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}