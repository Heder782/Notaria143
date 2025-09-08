import React, { useEffect } from 'react';
import DocumentForm from '../Document/documentForm';
import Membretado from '../Layout/membretado';

const { ipcRenderer } = window.require('electron');

const EmployeeDashboard = ({ user }) => {
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
      <div style={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header fijo */}
        <div style={{ 
          background: 'white', 
          padding: '15px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div>
              <h1 style={{ margin: 0, color: '#333', fontSize: '20px' }}>
                📋 Panel de Empleado
              </h1>
              <p style={{ margin: '3px 0 0 0', color: '#666', fontSize: '14px' }}>
                Bienvenido, <strong>{user?.nombre}</strong>
              </p>
            </div>
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '8px 16px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        
        {/* Contenido con scroll */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '15px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <DocumentForm currentUser={user} />
          </div>
        </div>
      </div>
    </Membretado>
  );
};

export default EmployeeDashboard;