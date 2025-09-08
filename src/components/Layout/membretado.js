// src/components/Layout/membretado.js
import React from 'react';
import './membretado.css';

const Membretado = ({ children }) => {
  return (
    <div className="membretado-container">
      {/* Encabezado del membretado */}
      <div className="membretado-header">
        <div className="membretado-content">
          <div className="membretado-number">143</div>
          <div className="membretado-title">
            <span className="notaria-text">NOTARÍA</span>
            <span className="publica-text">PÚBLICA</span>
          </div>
          
          <div className="notaries">
            <div className="notary">
              <span className="title">LIC. CARLOS ALBERTO DÍAZ HERNÁNDEZ</span>
              <span className="subtitle">NOTARIO PÚBLICO</span>
            </div>
            
            <div className="notary">
              <span className="title">LIC. ADELÍN DÍAZ GARCÍA</span>
              <span className="subtitle">NOTARIO PÚBLICO</span>
            </div>
          </div>
          
          <div className="services">
            SERVICIOS NOTARIALES Y LEGALES
          </div>
        </div>
      </div>

      {/* Contenido principal CON SCROLL */}
      <div className="membretado-main-content">
        {children}
      </div>
    </div>
  );
};

export default Membretado;