import React, { useState } from 'react';

const DocumentForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    escritura: '',
    libro: '',
    tipoActo: '',
    tamañoPapel: 'carta'
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="document-form" style={{ position: 'relative' }}>
      <h3>Nueva Escritura</h3>

      <div className="form-group">
        <label>Número de Escritura:</label>
        <input
          type="text"
          value={formData.escritura}
          onChange={(e) => setFormData({ ...formData, escritura: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Número de Libro:</label>
        <input
          type="text"
          value={formData.libro}
          onChange={(e) => setFormData({ ...formData, libro: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Tipo de Acto:</label>
        <select
          value={formData.tipoActo}
          onChange={(e) => setFormData({ ...formData, tipoActo: e.target.value })}
          required
        >
          <option value="">Seleccionar...</option>
          <option value="donacion">Donación</option>
          <option value="testamento">Testamento</option>
          <option value="protocolizacion">Protocolización de Actas de Asamblea</option>
          <option value="compraventa">Contrato de Compraventa</option>
        </select>
      </div>

      {/* Información dinámica según tipo de acto */}
      <div className="form-group">
        <label>Información del Acto:</label>

        {formData.tipoActo === 'donacion' && (
          <>
            <input
              type="text"
              placeholder="Nombre del Donante"
              value={formData.donante || ''}
              onChange={(e) => setFormData({ ...formData, donante: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Nombre del Donatario"
              value={formData.donatario || ''}
              onChange={(e) => setFormData({ ...formData, donatario: e.target.value })}
              required
            />
          </>
        )}

        {formData.tipoActo === 'testamento' && (
          <>
            <input
              type="text"
              placeholder="Nombre del Testador"
              value={formData.testador || ''}
              onChange={(e) => setFormData({ ...formData, testador: e.target.value })}
              required
            />
            <textarea
              placeholder="Nombre de Herederos"
              value={formData.herederos || ''}
              onChange={(e) => setFormData({ ...formData, herederos: e.target.value })}
              rows="2"
              required
            />
          </>
        )}

        {formData.tipoActo === 'protocolizacion' && (
          <>
            <input
              type="text"
              placeholder="Asamblea"
              value={formData.asamblea || ''}
              onChange={(e) => setFormData({ ...formData, asamblea: e.target.value })}
              required
            />
            <textarea
              placeholder="Participantes"
              value={formData.participantes || ''}
              onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
              rows="2"
              required
            />
          </>
        )}

        {formData.tipoActo === 'compraventa' && (
          <>
            <input
              type="text"
              placeholder="Nombre del Vendedor"
              value={formData.vendedor || ''}
              onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Nombre del Comprador"
              value={formData.comprador || ''}
              onChange={(e) => setFormData({ ...formData, comprador: e.target.value })}
              required
            />
          </>
        )}
      </div>

      <div className="form-group">
        <label>Tamaño de Papel:</label>
        <select
          value={formData.tamañoPapel}
          onChange={(e) => setFormData({ ...formData, tamañoPapel: e.target.value })}
        >
          <option value="carta">Carta</option>
          <option value="oficio">Oficio</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">Generar Documento</button>
      </div>

      {/* Botón flotante regresar al inicio */}
      <button
        type="button"
        onClick={onBack}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          background: '#667eea',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.2)'
        }}
      >
        ⬅ Regresar al inicio
      </button>
    </form>
  );
};

export default DocumentForm;
