import React, { useState } from 'react';

export const actos = {
  "compraventa": {
    label: "Escrituras de Compraventa de Inmuebles",
    campos: ["Vendedores", "Compradores"]
  },
  "credito": {
    label: "Tramitación de Crédito",
    campos: ["Solicitantes", "Instituciones"]
  },
  "donacion": {
    label: "Escrituras de Donaciones",
    campos: ["Donadores", "Donatarios"]
  },
  "testamento": {
    label: "Testamentos",
    campos: ["Testadores", "Beneficiarios"]
  },
  "juicio": {
    label: "Juicios Sucesorios",
    campos: ["Demandantes", "Demandados"]
  },
  "adjudicacion": {
    label: "Adjudicaciones",
    campos: ["Adjudicantes", "Adjudicatarios"]
  },
  "cesion": {
    label: "Cesión de Derechos",
    campos: ["Cedentes", "Cesionarios"]
  },
  "protocolizacion": {
    label: "Protocolización de Inventarios y Avalúos",
    campos: ["Responsables", "Notarios"]
  }
};

const DocumentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    escritura: '',
    libro: '',
    tipoActo: '',
    informacionActo: {}, // Cada campo será un array
    tamañoPapel: 'carta'
  });

  const handleChangeCampo = (campo, index, valor) => {
    const arr = formData.informacionActo[campo] || [];
    arr[index] = valor;
    setFormData(prev => ({
      ...prev,
      informacionActo: { ...prev.informacionActo, [campo]: arr }
    }));
  };

  const agregarCampo = (campo) => {
    const arr = formData.informacionActo[campo] || [];
    setFormData(prev => ({
      ...prev,
      informacionActo: { ...prev.informacionActo, [campo]: [...arr, ''] }
    }));
  };

  const eliminarCampo = (campo, index) => {
    const arr = [...(formData.informacionActo[campo] || [])];
    arr.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      informacionActo: { ...prev.informacionActo, [campo]: arr }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const camposActo = formData.tipoActo ? actos[formData.tipoActo].campos : [];

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
          onChange={(e) => setFormData({...formData, tipoActo: e.target.value, informacionActo: {}})}
          required
        >
          <option value="">Seleccionar...</option>
          {Object.entries(actos).map(([key, acto]) => (
            <option key={key} value={key}>{acto.label}</option>
          ))}
        </select>
      </div>

      {camposActo.map(campo => (
        <div key={campo} className="form-group">
          <label>{campo}:</label>
          {(formData.informacionActo[campo] || ['']).map((valor, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
              <input
                type="text"
                value={valor}
                onChange={(e) => handleChangeCampo(campo, index, e.target.value)}
                placeholder={campo}
                required
              />
              <button type="button" onClick={() => eliminarCampo(campo, index)}>eliminar❌</button>
            </div>
          ))}
          <button type="button" onClick={() => agregarCampo(campo)}> Agregar {campo.slice(0, -1)}</button>
        </div>
      ))}

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
