// src/components/Document/documentContainer.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

import DocumentPreview from './documentPreview';
import DocumentPreviewNube from './documentPreviewNube';
import { generateAndUploadPDF } from '../../services/pdfService';

const DocumentContainer = ({ documentData, onBack }) => {
  const [qrCode, setQrCode] = useState('');
  // ID único del documento
  const [docId] = useState(uuidv4());

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // URL que el cliente escaneará
        const urlNube = `https://notaria-docs.notariapublica143.workers.dev/${docId}`;
        const qr = await QRCode.toDataURL(urlNube);
        setQrCode(qr);
      } catch (error) {
        console.error('Error generando QR:', error);
      }
    };

    generateQRCode();
  }, [docId]);

  const handleSaveAndUpload = () => {
    // Ahora SOLO mandamos los datos y el docId
    generateAndUploadPDF(documentData, docId);
  };

  return (
    <>
      {/* ===== DOCUMENTO CLIENTE (VISIBLE) ===== */}
      <DocumentPreview
        documentData={documentData}
        qrCode={qrCode}
        onEdit={onBack}
        onPrint={() => window.print()}
        onSave={handleSaveAndUpload}
      />

      {/* ===== DOCUMENTO NUBE (OCULTO) ===== */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <DocumentPreviewNube
          documentData={documentData}
          qrCode={qrCode}
        />
      </div>
    </>
  );
};

export default DocumentContainer;
