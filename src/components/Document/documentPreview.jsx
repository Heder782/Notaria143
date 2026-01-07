import React from 'react';
import { actos } from './documentForm';

const DocumentPreview = ({ 
  documentData, 
  qrCode, 
  onEdit, 
  onPrint, 
  onSave,
  spacing = { logo: 5, notaries: 70, qr: 80, bodyTop: 50 } // 👈 valores por defecto
}) => {
  const LOGO_SRC = '/images/NotariaLogo.png';

  // 👉 Construye la descripción del acto
  const formatActoDescription = () => {
    const actoLabel = actos[documentData.tipoActo] 
        ? actos[documentData.tipoActo].label.toUpperCase() 
        : documentData.tipoActo.toUpperCase();

    const componentes = [];
    componentes.push(`LA ${actoLabel}`);

    Object.entries(documentData.informacionActo).forEach(([campo, valores]) => {
      if (valores && valores.length > 0 && valores[0] !== '') {
        const rol = campo.toUpperCase();
        const nombres = valores.join(' Y ');
        componentes.push(`como ${rol} los CC. ${nombres}`);
      }
    });

    const textoCompleto = componentes.join(', ');

    return (
      <p
        style={{ 
          textAlign: 'justify',
          lineHeight: '1.5',
          margin: '0 auto',
          maxWidth: '100%',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        ES PRIMER TESTIMONIO DE LA ESCRITURA PÚBLICA QUE CONTIENE: <br/>
        <strong style={{ textTransform: 'uppercase' }}>
            {textoCompleto}
        </strong>
        <br/>
        - PARA QUIEN SE EXPIDE.
      </p>
    );
  };

  return (
    <div className="document-preview">
      {/* Controles arriba */}
      <div className="preview-controls" style={{ marginBottom: '20px' }}>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onPrint}>Imprimir</button>
        <button onClick={onSave}>Guardar PDF</button>
      </div>

      {/* ================== CONTENEDOR PRINCIPAL ================== */}
      <div
        id="document-to-print"
        style={{ 
          paddingTop: '40px',
          paddingBottom: '60px',
          paddingLeft: '90px',
          paddingRight: '70px',
          margin: '20px auto',
          maxWidth: '210mm',
          minHeight: '297mm',
          fontFamily: 'serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: `${spacing.logo}px` }}>
          <img src={LOGO_SRC} alt="Logo Notaría 143" style={{ width: '350px',  }} />
        </div>

        {/* Notarios */}
        <div style={{ marginBottom: `${spacing.notaries}px`, fontSize: '16px', color: '#153faa8e' }}>
          <p style={{ margin: '1px 0' }}>
            <strong>Lic. Carlos Alberto Díaz Hernández</strong><br/>
            <span style={{ fontSize: '12px'}}>Notario Público</span>
          </p>
          <p style={{ margin: '1px 0' }}>
            <strong>Lic. Adelín Díaz García</strong><br/>
            <span style={{ fontSize: '12px'}}>Notario Adjunto</span>
          </p>
        </div>

        {/* QR */}
        {qrCode && (
          <div style={{ marginBottom: `${spacing.qr}px` }}>
            <img src={qrCode} alt="Código QR" style={{ width: '100px', height: '100px' }} />
            <p style={{ fontSize: '12px', marginTop: '10px' }}>Escanee este código para su formato digital</p>
          </div>
        )}

        {/* Cuerpo */}
        <div style={{ marginTop: `${spacing.bodyTop}px`, width: '100%', textAlign: 'justify' }}>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            ESCRITURA NÚMERO {documentData.escritura}
          </p>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            LIBRO NÚMERO {documentData.libro}
          </p>
          {formatActoDescription()}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
