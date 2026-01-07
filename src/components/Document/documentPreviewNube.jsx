// src/components/Document/DocumentPreviewNube.jsx
import React from 'react';

const DocumentPreviewNube = ({ documentData }) => {
  const whatsappLink = "https://wa.me/+529617065662";

  return (
    <div
      id="document-to-upload"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        color: '#333',
        boxSizing: 'border-box',
      }}
    >
      {/* ===== Encabezado con Logo ===== */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #0077b6',
        paddingBottom: '10px'
      }}>
        <img
          src="/images/NotariaLogo.png"
          alt="Logo Notaría"
          style={{ height: '80px', marginRight: '20px' }}
        />
        <div>
          <h1 style={{ margin: 0, color: '#0077b6' }}>Notaría Pública 143</h1>
          <p style={{ margin: 0 }}>Tu confianza, nuestra prioridad</p>
        </div>
      </div>

      {/* ===== Información del Cliente / Trámite ===== */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#0077b6' }}>Información del Trámite</h2>
        <p><strong>Cliente:</strong> {documentData.cliente || 'Nombre del cliente'}</p>
        <p><strong>Tipo de Trámite:</strong> {documentData.tramite || 'Tipo de trámite'}</p>
        <p><strong>Escritura:</strong> {documentData.escritura || 'Número de escritura'}</p>
        <p><strong>Libro:</strong> {documentData.libro || 'Número de libro'}</p>
        <p><strong>Fecha:</strong> {documentData.fecha || new Date().toLocaleDateString()}</p>
      </div>

      {/* ===== Link a WhatsApp ===== */}
      <div style={{ marginTop: '30px' }}>
        <p style={{ fontSize: '14px' }}>
          Para más información, contacta a la notaría vía WhatsApp:{" "}
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: '#0077b6', textDecoration: 'underline' }}
          >
            {whatsappLink}
          </a>
        </p>
      </div>

      {/* ===== Pie de Página ===== */}
      <footer style={{
        marginTop: '50px',
        fontSize: '12px',
        color: '#555',
        borderTop: '1px solid #ccc',
        paddingTop: '10px',
        textAlign: 'center'
      }}>
        Documento generado por Notaría Pública 143
      </footer>
    </div>
  );
};

export default DocumentPreviewNube;
