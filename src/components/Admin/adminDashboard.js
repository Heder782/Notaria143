import React, { useEffect } from 'react';
import UserManagement from './userManagement';
import Membretado from '../Layout/membretado';

const { ipcRenderer } = window.require('electron');

const AdminDashboard = ({ user }) => {
  const handleLogout = async () => {
    try {
      await ipcRenderer.invoke('logout-user');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleForceLogout = () => {
      window.location.reload();
    };

    ipcRenderer.on('force-logout', handleForceLogout);

    return () => {
      ipcRenderer.removeListener('force-logout', handleForceLogout);
    };
  }, []);

  return (
    <Membretado>
      {/* CONTENEDOR PRINCIPAL CON SCROLL */}
      <div style={{ 
        minHeight: '100%',
        padding: '15px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minHeight: '500px' // Altura mínima para forzar scroll si es necesario
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid #e9ecef'
          }}>
            <div>
              <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>
                👑 Panel de Administrador
              </h1>
              <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                Bienvenido, <strong>{user?.nombre}</strong>
              </p>
            </div>
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '10px 20px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
          
          {/* Componente de gestión de usuarios (con su propio scroll si es necesario) */}
          <div style={{ maxHeight: 'none', overflow: 'visible' }}>
            <UserManagement currentUser={user} />
          </div>
        </div>
      </div>
    </Membretado>
  );
};

export default AdminDashboard;