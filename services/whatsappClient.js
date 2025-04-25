import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import fs from 'fs'; 
import path from 'path';

const { Client, LocalAuth } = pkg;

const whatsappClient = new Client({
    authStrategy: new LocalAuth({ clientId: "backend-session" }),
});


whatsappClient.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

whatsappClient.on('ready', () => {
    console.log('Cliente de WhatsApp está listo.');

    // Para destruir la sesión (cerrar la cuenta) en una sola línea:
        // Solo destruye la sesión cuando esté listo
        // whatsappClient.destroy()
        // .then(() => {
        //     console.log('Sesión destruida correctamente');
        //     // Borrar archivos de autenticación
        //     const authPath = path.join(__dirname, 'node_modules', 'whatsapp-web.js', 'src', 'auth');
        //     if (fs.existsSync(authPath)) {
        //         fs.rmSync(authPath, { recursive: true, force: true });
        //         console.log('Archivos de autenticación eliminados');
        //     }

        //     // Inicializar un nuevo cliente
        //     const newWhatsappClient = new Client({
        //         authStrategy: new LocalAuth({ clientId: "backend-session" }),
        //     });

        //     // Volver a generar el QR
        //     newWhatsappClient.on('qr', (qr) => {
        //         console.log('Escanea este código QR con tu WhatsApp:');
        //         qrcode.generate(qr, { small: true });
        //     });

        //     newWhatsappClient.on('ready', () => {
        //         console.log('Nuevo Cliente de WhatsApp está listo.');
        //     });

        //     newWhatsappClient.on('auth_failure', (error) => {
        //         console.error('Fallo de autenticación:', error);
        //     });

        //     newWhatsappClient.on('disconnected', (reason) => {
        //         console.log('Cliente desconectado:', reason);
        //     });

        //     // Inicializar el nuevo cliente
        //     newWhatsappClient.initialize();
        // })
        // .catch(error => console.error('Error al destruir la sesión:', error));
});

whatsappClient.on('auth_failure', (error) => {
    console.error('Fallo de autenticación:', error);
});

whatsappClient.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
});

// Inicializar cliente
whatsappClient.initialize();


export default whatsappClient;
