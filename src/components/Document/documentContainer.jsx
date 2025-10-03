import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import DocumentPreview from './documentPreview';
import { generatePDFs } from '../../services/pdfService';

const DocumentContainer = ({ documentData, onBack }) => {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = `https://notaria143.com/document/${documentData.escritura}`; // QR apunta a URL
        const qr = await QRCode.toDataURL(url);
        setQrCode(qr);
      } catch (error) {
        console.error('Error generando QR:', error);
      }
    };

    generateQRCode();
  }, [documentData]);

  const handleSave = () => {
    generatePDFs(documentData, qrCode); // Genera ambos PDFs en tu PC
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    onBack();
  };

  return (
    <DocumentPreview
      documentData={documentData}
      qrCode={qrCode}
      onEdit={handleEdit}
      onPrint={handlePrint}
      onSave={handleSave}
    />
  );
};

export default DocumentContainer;
