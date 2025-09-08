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
        }
      } else {
        setError(result.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión con el sistema');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Botón de volver */}
        <button 
          onClick={onBack}
          className="back-button"
          title="Volver atrás"
        >
          ←
        </button>

        {/* Header con logo */}
        <div className="login-header">
          <div className="login-logo">
            {userType === 'admin' ? '👑' : '📋'}
          </div>
          <h2 className="login-title">
            Login para {userType === 'admin' ? 'Administrador' : 'Empleado'}
          </h2>
          <p className="login-subtitle">Notaría Pública #143</p>
        </div>

        {/* Mensaje de error */}
        {error && <div className="error-message">{error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            className="login-input"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="login-input"
            required
            disabled={loading}
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Verificando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        {/* Información adicional */}
        <div className="login-info">
          <p>
            {userType === 'admin' 
              ? 'Acceso para gestión del sistema y usuarios'
              : 'Acceso para registro de documentos y escrituras'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;