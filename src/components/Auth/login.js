import React, { useState } from 'react';
import '../../style.css';

const { ipcRenderer } = window.require('electron');

const Login = ({ onLogin, userType, onBack }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await ipcRenderer.invoke('login-user', credentials);
      
      if (result.success) {
        if (result.user.tipo !== userType) {
          setError(`Debe ingresar como ${userType === 'admin' ? 'Administrador' : 'Empleado'}`);
        } else {
          onLogin(result.user);
          window.location.reload();
        }
      } else {
        setError(result.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button 
          onClick={onBack}
          className="back-button"
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#667eea'
          }}
        >
          ←
        </button>

        <h2>🔐 Login para {userType === 'admin' ? 'Administrador' : 'Empleado'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;