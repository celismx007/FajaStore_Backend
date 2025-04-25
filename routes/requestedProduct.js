import express from 'express';
import { RequestedProduct } from '../models/mainExport.js';
import { verifyIfIdExists } from '../helpers/validateData.js';
import { getHandleSuccess } from '../helpers/handleSuccess.js';
import sequelize from '../database/connection.js';


const router = express.Router();


router.get('/', async(req, res, next) =>{
    try{ 
        const requestedProducts = await RequestedProduct.findAll({
            // include: [{
            //     model: Account,
            //     attributes: ['username', 'password']
            //     }]
        })
        getHandleSuccess(200)(res, requestedProducts);
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Fail get requested Products!',
        });
    }
})

router.get('/:id', async (req, res, next ) => { 
    const { id } = req.params; 
    try{
        const requestedProduct = await RequestedProduct.findOne({
            where: { id: id },
            // include: [ {
            //   model: Account,
            //   attributes: ['user_name', 'password']
            //     }
            // ]
        }); 
        verifyIfIdExists(requestedProduct);
        getHandleSuccess(200)(res, requestedProduct);
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Fail get requested Products!',
        });
    }
})

router.post('/', async (req, res, next) => {
    const { clientBuyersId, productId, size, color, status} = req.body;
    const creationDate = new Date().toISOString().split('T')[0];
    if (!clientBuyersId || !productId || !size || !color || !status) {
      return res.status(400).json({ message: 'All fields are required ' });
    }
    try {
      const newRequestedProduct = await RequestedProduct.create({ 
        clientBuyersId: clientBuyersId, productId: productId, size: size, 
        color: color, status: status, creationDate: creationDate });
      getHandleSuccess(201)(res, 'Requested Product created successfully');
    } catch (e) {
        console.log(e);
      return res.status(500).json({
        error: e,
        message: 'Fail created Requested Product!',
    });
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { clientBuyersId, productId, size, color, status} = req.body;
    const updateDate = new Date().toISOString().split('T')[0];
    try {
        const [updatedUserCount] = await RequestedProduct.update({ clientBuyersId: clientBuyersId, productId: productId, size: size, 
            color: color, status: status, updateDate: updateDate }, {
            where: { id },
            returning: true,
             });
        verifyIfIdExists(updatedUserCount);
        getHandleSuccess(204)(res);
    } catch (e) {
        console.log(e); 
        getHandleError(e, res);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const requestedProduct = await RequestedProduct.findOne({ where: { id } });
        if (!requestedProduct) {
        return getHandleError(new Error('requested Product not found'), res);
        }
        await RequestedProduct.destroy({ where: { id } });
        getHandleSuccess(200)(res, `requested Product deleted successfully`);
    } catch (e) {
        console.log(e);
        getHandleError(e, res);
    }
});
  


export default router;