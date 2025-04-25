import express from 'express';
import { sendMessage } from '../services/whatsappService.js';

const router = express.Router();

router.post('/send', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: 'Número y mensaje son obligatorios.' });
    }

    try {
        await sendMessage(number, message);
        return res.status(200).json({ success: true, message: 'Mensaje enviado con éxito.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Error al enviar el mensaje.' });
    }
});

export default router;
