import QRCode from 'qrcode';

export const generateQRCodeForPDF = async (pdfFileName) => {
  try {
    // Ruta local del PDF (Electron)
    const pdfUrl = `file://${__dirname}/${pdfFileName}`;
    const qrDataUrl = await QRCode.toDataURL(pdfUrl);
    return qrDataUrl;
  } catch (error) {
    console.error("Error generando QR:", error);
    return null;
  }
};
