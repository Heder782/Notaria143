import React from 'react';
import { actos } from './documentForm';

const DocumentPreview = ({ documentData, qrCode, onEdit, onPrint, onSave }) => {
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
        className="document-description"
        style={{ 
          textAlign: 'justify',    // 👈 texto justificado
          lineHeight: '1.5',       // 👈 espacio entre líneas
          margin: '0 auto',        // 👈 centrado dentro del bloque
          maxWidth: '100%',        // 👈 ancho del texto (ajústalo si quieres más margen)
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

      {/* ================== CONTENEDOR PRINCIPAL (la hoja completa) ================== */}
      <div
        className="document-template"
        id="document-to-print"
        style={{ 
          paddingTop: '60px',      // 👈 margen superior
          paddingBottom: '80px',   // 👈 margen inferior (ajústalo si quieres más aire abajo)
          paddingLeft: '70px',     // 👈 margen izquierdo
          paddingRight: '70px',    // 👈 margen derecho
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
        <div className="logo-section" style={{ margin: '40px 0 20px 0' }}>
          <img src={LOGO_SRC} alt="Logo Notaría 143" style={{ width: '350px', height: '50' }} />
        </div>

        {/* Notarios debajo del logo */}
        <div className="notaries-info" style={{ marginBottom: '30px', fontSize: '16px', textAlign: 'center', color: '#153faa8e' }}>
          <p style={{ margin: '1px 0' }}>
            <strong>Lic. Carlos Alberto Díaz Hernández</strong><br/>
            <span style={{ fontSize: '12px'}}>Notario Público</span>
          </p>
          <p style={{ margin: '1px 0' }}>
            <strong>Lic. Adelín Díaz García</strong><br/>
            <span style={{ fontSize: '12px'}}>Notario Adjunto</span>
          </p>
        </div>

        {/* QR centrado */}
        {qrCode && (
          <div
            className="qr-section"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '40px 0' 
            }}
          >
            <img src={qrCode} alt="Código QR" className="qr-code" style={{ width: '100px', height: '100px' }} />
            <p style={{ fontSize: '12px', marginTop: '10px' }}>Escanee este código para su formato digital</p>
          </div>
        )}

        {/* ================== CUERPO DEL DOCUMENTO ================== */}
        <div 
          className="document-body" 
          style={{ 
            marginTop: '30px',     // 👈 espacio arriba del cuerpo
            marginBottom: '40px',  // 👈 espacio abajo del cuerpo
            fontSize: '12px',
            lineHeight: '1.5',
            width: '100%',
            textAlign: 'justify'
          }}
        >
          {/* Bloque de Escritura y Libro */}
          <div 
            style={{ 
              maxWidth: '100%',     // 👈 ancho máximo del bloque
              margin: '0 auto'      // 👈 centrado
            }}
          >
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              ESCRITURA NÚMERO {documentData.escritura}
            </p>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              LIBRO NÚMERO {documentData.libro}
            </p>

            {/* Descripción del Acto */}
            {formatActoDescription()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentPreview;
