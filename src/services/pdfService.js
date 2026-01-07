// src/services/pdfService.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { uploadToCloudflare } from './cloudservice';

export const generateAndUploadPDF = async (documentData, docId) => {
  // ===== PDF LOCAL (visible) =====
  const localElement = document.getElementById('document-to-print');

  if (!localElement) {
    console.error("Error: El elemento 'document-to-print' no fue encontrado.");
    return;
  }

  const canvasOptions = {
    scale: 2,
    logging: false,
    useCORS: true,
  };

  try {
    // ----- 1️⃣ PDF para la PC -----
    console.log("Generando PDF local...");
    const canvasLocal = await html2canvas(localElement, canvasOptions);
    const imgDataLocal = canvasLocal.toDataURL('image/png');
    const pdfLocal = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const imgHeight = (canvasLocal.height * imgWidth) / canvasLocal.width;
    pdfLocal.addImage(imgDataLocal, 'PNG', 0, 0, imgWidth, imgHeight);

    // Guardar PDF local
    pdfLocal.save(`Escritura_${documentData.escritura}_Local.pdf`);

    // ----- 2️⃣ PDF para la NUBE -----
    const cloudElement = document.getElementById('document-to-upload');
    if (!cloudElement) {
      console.error("Error: El elemento 'document-to-upload' no fue encontrado.");
      alert("No se pudo generar la versión nube del PDF.");
      return;
    }

    console.log("Generando PDF para la nube...");
    const canvasCloud = await html2canvas(cloudElement, canvasOptions);
    const imgDataCloud = canvasCloud.toDataURL('image/png');
    const pdfCloud = new jsPDF('p', 'mm', 'a4');
    const imgHeightCloud = (canvasCloud.height * imgWidth) / canvasCloud.width;
    pdfCloud.addImage(imgDataCloud, 'PNG', 0, 0, imgWidth, imgHeightCloud);

    // Convertir a Blob para subir
    const pdfBlobCloud = pdfCloud.output('blob');

    // Subir a Cloudflare R2 usando docId
    const exito = await uploadToCloudflare(pdfBlobCloud, docId);

    if (exito) {
      alert("🎉 ¡ÉXITO! Documento guardado localmente y disponible en la nube vía QR.");
    } else {
      alert("⚠️ ATENCIÓN: PDF local OK, pero NO se pudo subir la versión nube. Revisa conexión o token.");
    }
  } catch (error) {
    console.error("Error en proceso de PDF:", error);
    alert("Error crítico al generar el documento.");
  }
};
