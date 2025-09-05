
import React, { useState } from 'react';
import '../../style.css'

const Login = ({ onLogin, userType, onBack }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials, userType);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Login para {userType === 'admin' ? 'Administrador' : 'Empleado'}</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          
          <button type="submit">Ingresar</button>
        </form>

        <button onClick={onBack}
        className='back-button'
        style={{
          marginTop: '1rem',
          background: 'transparent',
          color:'#667eea',
          border: '1px solid #667eea'
        
        }}
        >Volver a la selección</button>
       
      </div>
    </div>
  );
};

export default Login;