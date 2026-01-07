// src/services/cloudService.js

// URL de tu Worker que ya probamos
const URL_BASE_WORKER = 'https://notaria-docs.notariapublica143.workers.dev/';

// EL TOKEN QUE VISTE EN TU CÓDIGO DE CLOUDFLARE
const SECRET_TOKEN = "MI_LLAVE_NOTARIA143"; 

export const uploadToCloudflare = async (fileBlob, idDocumento) => {
    try {
        console.log(`Intentando subir documento ${idDocumento}...`);
        
        const response = await fetch(`${URL_BASE_WORKER}${idDocumento}`, {
            method: 'PUT',
            headers: {
                'Authorization': SECRET_TOKEN,
                'Content-Type': 'application/pdf'
            },
            body: fileBlob
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en servidor: ${errorText}`);
        }

        console.log("✅ Subida a R2 exitosa");
        return true;
    } catch (error) {
        console.error("❌ Error en uploadToCloudflare:", error);
        return false;
    }
};