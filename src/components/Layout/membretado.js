// src/components/Layout/membretado.js
import React from 'react';
import './membretado.css';

const Membretado = ({ children }) => {
  return (
    <div className="membretado-container">
      {/* Encabezado con degradado y brillo central */}
      <div className="membretado-header">
        <div className="membretado-content">
          
          {/* Sección del Logotipo (Reemplaza a los textos 143 Notaría) */}
          <div className="logo-container-premium">
            <img 
              src="/images/NotariaLogo.png" 
              alt="Notaría 143" 
              className="main-logo-img" 
            />
          </div>
          
          {/* Sección de Notarios */}
          <div className="notaries">
            <div className="notary">
              <span className="title">LIC. CARLOS ALBERTO DÍAZ HERNÁNDEZ</span>
              <span className="subtitle">NOTARIO PÚBLICO</span>
            </div>
            
            <div className="notary">
              <span className="title">LIC. ADELÍN DÍAZ GARCÍA</span>
              <span className="subtitle">NOTARIO ADJUNTO</span>
            </div>
          </div>
          
          {/* Lema inferior */}
          <div className="services">
            SERVICIOS NOTARIALES Y LEGALES
          </div>
        </div>
      </div>

      {/* Contenedor del contenido (Panel de Admin, Formularios, etc) */}
      <div className="membretado-main-content">
        {children}
      </div>
    </div>
  );
};

export default Membretado;