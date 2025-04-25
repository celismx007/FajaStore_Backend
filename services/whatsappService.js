import whatsappClient from './whatsappClient.js';

/**
 * Enviar un mensaje a través de WhatsApp
 * @param {string} number - Número de teléfono en formato internacional (e.g., 5211234567890)
 * @param {string} message - Mensaje a enviar
 */
export const sendMessage = async (number, message) => {
    const formattedNumber = `${number}@c.us`; // Formatear para WhatsApp

    try {
        await whatsappClient.sendMessage(formattedNumber, message);
        console.log(`Mensaje enviado a ${number}: ${message}`);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw new Error('No se pudo enviar el mensaje');
    }
};