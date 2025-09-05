// src/components/Layout/Letterhead.js
import React from 'react';
import './membretado.css';

const Membretado = () => {
  return (
    <div className="letterhead">
      <div className="letterhead-content">
        <div className="letterhead-number">143</div>
        <div className="letterhead-title">
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
  );
};

export default Membretado;