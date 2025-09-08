// src/components/Admin/UserManagement.js
import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    password: '',
    nombre: '',
    tipo: 'empleado'
  });
  const [mensaje, setMensaje] = useState('');
  const ipcRenderer = window.require('electron').ipcRenderer;

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const usuariosDB = await ipcRenderer.invoke('obtener-usuarios');
      setUsuarios(usuariosDB);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const agregarUsuario = async () => {
    if (!nuevoUsuario.username || !nuevoUsuario.password || !nuevoUsuario.nombre) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      const exito = await ipcRenderer.invoke('agregar-usuario', nuevoUsuario);
      if (exito) {
        setMensaje('Usuario agregado correctamente');
        setNuevoUsuario({ username: '', password: '', nombre: '', tipo: 'empleado' });
        cargarUsuarios();
      } else {
        setMensaje('Error al agregar usuario');
      }
    } catch (error) {
      setMensaje('Error de conexión con la base de datos');
    }
  };

  const eliminarUsuario = async (id, tipo) => {
    if (tipo === 'admin') {
      setMensaje('No se pueden eliminar administradores');
      return;
    }

    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        const exito = await ipcRenderer.invoke('eliminar-usuario', id);
        if (exito) {
          setMensaje('Usuario eliminado correctamente');
          cargarUsuarios();
        }
      } catch (error) {
        setMensaje('Error al eliminar usuario');
      }
    }
  };

  const exportarBaseDatos = async () => {
    try {
      const exito = await ipcRenderer.invoke('exportar-database');
      if (exito) {
        setMensaje('Base de datos exportada correctamente');
      }
    } catch (error) {
      setMensaje('Error al exportar base de datos');
    }
  };

  return (
    <div className="admin-panel">
      <h2>👨‍💼 Panel de Administración</h2>
      
      {/* Formulario para agregar usuarios */}
      <div className="add-user-form">
        <h3>➕ Agregar Nuevo Usuario</h3>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Usuario"
            value={nuevoUsuario.username}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, username: e.target.value})}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={nuevoUsuario.password}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, password: e.target.value})}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nuevoUsuario.nombre}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
          />
        </div>

        <div className="form-group">
          <select
            value={nuevoUsuario.tipo}
            onChange={(e) => setNuevoUsuario({...nuevoUsuario, tipo: e.target.value})}
          >
            <option value="empleado">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button onClick={agregarUsuario}>Agregar Usuario</button>
      </div>

      {/* Lista de usuarios */}
      <div className="users-list">
        <h3>👥 Usuarios Registrados</h3>
        {usuarios.map(usuario => (
          <div key={usuario.id} className="user-item">
            <div className="user-info">
              <strong>{usuario.nombre}</strong>
              <span>Usuario: {usuario.username}</span>
              <span>Tipo: {usuario.tipo}</span>
            </div>
            {usuario.tipo !== 'admin' && (
              <button 
                onClick={() => eliminarUsuario(usuario.id, usuario.tipo)}
                className="delete-btn"
              >
                🗑️ Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Exportar base de datos */}
      <div className="database-actions">
        <h3>💾 Gestión de Base de Datos</h3>
        <button onClick={exportarBaseDatos}>
          📤 Exportar Base de Datos
        </button>
      </div>

      {mensaje && <div className="mensaje">{mensaje}</div>}
    </div>
  );
};

export default UserManagement;