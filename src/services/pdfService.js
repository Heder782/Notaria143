// src/services/pdfService.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDFs = async (documentData, qrCode) => {
  const input = document.getElementById('document-to-print');

  if (!input) {
    console.error("Error: El elemento 'document-to-print' no fue encontrado en el DOM.");
    return;
  }

  const qrElement = input.querySelector('.qr-section');
  const canvasOptions = {
    scale: 2,
    logging: false,
    useCORS: true,
  };

  try {
    // ---------------- PDF CLIENTE (Sin QR) ----------------
    if (qrElement) qrElement.style.display = 'none';
    await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que el DOM actualice el estilo

    const canvasCliente = await html2canvas(input, canvasOptions);
    const imgCliente = canvasCliente.toDataURL('image/png');
    const pdfCliente = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvasCliente.height * imgWidth) / canvasCliente.width;

    pdfCliente.addImage(imgCliente, 'PNG', 0, 0, imgWidth, imgHeight);
    pdfCliente.save(`Documento_Cliente_${documentData.escritura}.pdf`);


    
    // ---------------- PDF EMPLEADO (Con QR) ----------------
    if (qrElement) qrElement.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que el QR se muestre

    const canvasEmpleado = await html2canvas(input, canvasOptions);
    const imgEmpleado = canvasEmpleado.toDataURL('image/png');
    const pdfEmpleado = new jsPDF('p', 'mm', 'a4');
    const imgHeightEmp = (canvasEmpleado.height * imgWidth) / canvasEmpleado.width;

    pdfEmpleado.addImage(imgEmpleado, 'PNG', 0, 0, imgWidth, imgHeightEmp);
    pdfEmpleado.save(`Documento_Empleado_${documentData.escritura}.pdf`);
  } catch (error) {
    console.error("Error generando PDFs:", error);
  } finally {
    // Restaurar estado del QR en el DOM
    if (qrElement) qrElement.style.display = 'block';
  }
};
