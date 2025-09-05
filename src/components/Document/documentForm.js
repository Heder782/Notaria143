// src/components/Document/DocumentForm.js
import React, { useState } from 'react';

const DocumentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    escritura: '',
    libro: '',
    tipoActo: '',
    informacionActo: '',
    tamañoPapel: 'carta'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="document-form">
      <h3>Nueva Escritura</h3>
      
      <div className="form-group">
        <label>Número de Escritura:</label>
        <input
          type="text"
          value={formData.escritura}
          onChange={(e) => setFormData({...formData, escritura: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Número de Libro:</label>
        <input
          type="text"
          value={formData.libro}
          onChange={(e) => setFormData({...formData, libro: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Tipo de Acto:</label>
        <select
          value={formData.tipoActo}
          onChange={(e) => setFormData({...formData, tipoActo: e.target.value})}
          required
        >
          <option value="">Seleccionar...</option>
          <option value="protocolizacion">Protocolización de Inventario y Avalúos</option>
          <option value="adjudicacion">Adjudicación de Bienes por Herencia</option>
          <option value="compraventa">Contrato de Compraventa</option>
        </select>
      </div>

      <div className="form-group">
        <label>Información del Acto:</label>
        <textarea
          value={formData.informacionActo}
          onChange={(e) => setFormData({...formData, informacionActo: e.target.value})}
          rows="4"
          required
        />
      </div>

      <div className="form-group">
        <label>Tamaño de Papel:</label>
        <select
          value={formData.tamañoPapel}
          onChange={(e) => setFormData({...formData, tamañoPapel: e.target.value})}
        >
          <option value="carta">Carta</option>
          <option value="oficio">Oficio</option>
        </select>
      </div>

      <button type="submit">Generar Documento</button>
    </form>
  );
};
export default DocumentForm;