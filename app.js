import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



import ProductRouter from './routes/product.js';
import UserRouter from './routes/user.js';
import AuthRouter from './routes/auth.js';
import ClientBuyerRouter from './routes/clientBuyer.js';
import RequestedProductRouter from './routes/requestedProduct.js';
import whatsappRouter from './routes/whatsapp.js';
import ImageRouter from './routes/image.js';
import UnitProductRouter from './routes/unitsProduct.js';

app.use('/product', ProductRouter);
app.use('/image', ImageRouter);
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/clientBuyer', ClientBuyerRouter);
app.use('/requestedProduct', RequestedProductRouter);
app.use('/whatsapp', whatsappRouter);
app.use('/unitsProduct', UnitProductRouter);


export default app;
