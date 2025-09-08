import React, { useState, useEffect } from 'react';
import LoginSelector from './components/Auth/loginSelector';
import Login from './components/Auth/login';
import AdminDashboard from './components/Admin/adminDashboard';
import EmployeeDashboard from './components/Empleado/empleadoDashboard';
import './style.css';

const { ipcRenderer } = window.require('electron');

function App() {
  const [currentView, setCurrentView] = useState('selector');
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await ipcRenderer.invoke('get-current-user');
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleSelectUserType = (type) => {
    setSelectedUserType(type);
    setCurrentView('login');
  };

  const handleBackToSelector = () => {
    setSelectedUserType(null);
    setCurrentView('selector');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2>Cargando aplicación...</h2>
      </div>
    );
  }

  if (currentUser) {
    return currentUser.tipo === 'admin' ? 
      <AdminDashboard user={currentUser} /> : 
      <EmployeeDashboard user={currentUser} />;
  }

  if (currentView === 'login' && selectedUserType) {
    return (
      <Login 
        onLogin={handleLogin}
        userType={selectedUserType}
        onBack={handleBackToSelector}
      />
    );
  }

  return <LoginSelector onSelectUserType={handleSelectUserType} />;
}

export default App;