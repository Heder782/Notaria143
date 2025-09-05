// src/components/Auth/LoginSelector.js
import React from 'react';
import '../../style.css';
const LoginSelector = ({ onSelectUserType }) => {
  return (
    <div className="login-grid-container">
      <div className="grid-header">
        <div className="logo-section">
          <div className="logo">⚖️</div>
          <div className="title">
            <h1>Notaría 143</h1>
            <p>Sistema Integral de Escrituras</p>
          </div>
        </div>
      </div>

      <div className="grid-main">
        <h2>Seleccione su acceso</h2>
        
        <div className="grid-options">
          <div 
            className="grid-option admin-option"
            onClick={() => onSelectUserType('admin')}
          >
            <div className="option-content">
              <div className="option-icon">👑</div>
              <h3>Administrador</h3>
              <ul>
                <li>• Gestionar usuarios</li>
                <li>• Configurar sistema</li>
                <li>• Exportar datos</li>
              </ul>
            </div>
          </div>

          <div 
            className="grid-option employee-option"
            onClick={() => onSelectUserType('empleado')}
          >
            <div className="option-content">
              <div className="option-icon">📋</div>
              <h3>Empleado</h3>
              <ul>
                <li>• Registrar escrituras</li>
                <li>• Generar documentos</li>
                <li>• Imprimir formatos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-footer">
        <p>© 2024 Notaría Pública #143 - Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default LoginSelector;