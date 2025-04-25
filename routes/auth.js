import express from 'express'; 
import { compare } from '../helpers/handleBcrypt.js';
import { errorNotExists, validateData } from '../helpers/validateData.js';
import { Account } from '../models/mainExport.js';
import { generateAccessToken } from '../services/jwtService.js';


const router = express.Router();

router.post('/login', async (req, res) => { 
    const { userName, password } = req.body;
    try { 
        validateData([userName, password]);
        const account = await Account.findOne({ where: {userName : password}}); 
        if(!account) { 
            errorNotExists('auth');
            console.log('la cuenta no existe!');
        }
        const passwordMatch = await compare(password, account.password); 
        if(!passwordMatch) { 
            errorNotExists('auth'); 
            console.log('las contrasenias no son iguales!');

        }
        const accessToken = generateAccessToken( { userName: userName });
        return res.status(200).json({ 
            account, token: accessToken, message: "Authenticated user" });
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Authenticated user',
        });
    }
})


export default router;