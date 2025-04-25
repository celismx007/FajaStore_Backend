import express from 'express';
import { ClientBuyer, User, RequestedProduct } from '../models/mainExport.js';
import { verifyIfIdExists } from '../helpers/validateData.js';
import { getHandleSuccess } from '../helpers/handleSuccess.js';
import sequelize from '../database/connection.js';


const router = express.Router();


router.get('/', async(req, res, next) =>{
    try{ 
        const clientBuyers = await ClientBuyer.findAll({
            include: [
                {
                    model: User,
                    requerid: false,
                },
                {
                    model: RequestedProduct,
                    requerid: false,
                }
            ], 
        })
        getHandleSuccess(200)(res, clientBuyers);
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Fail get client Buyers!',
        });
    }
})

router.get('/:id', async (req, res, next ) => { 
    const { id } = req.params; 
    try{
        const user = await ClientBuyer.findOne({
            where: { id: id },
            include: [ 
                {
                    model: User,
                    requerid: false,
                },
                {
                    model: RequestedProduct,
                    requerid: false,
                },
            ]
        }); 
        verifyIfIdExists(user);
        getHandleSuccess(200)(res, user);
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Fail get Client Buyer!',
        });
    }
})

router.post('/', async (req, res, next) => {
    const { userId, name, address, phone } = req.body;
    if (!name || !address || !phone) {
      return res.status(400).json({ message: 'All fields are required ' });
    }
    try {
      const newUser = await ClientBuyer.create({userId: userId, name: name, address: address, phone: phone });

      getHandleSuccess(200)(res, newUser);
    } catch (e) {
        console.log(e);
      return res.status(500).json({
        error: e,
        message: 'Fail created Client buyer!',
    });
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { userId, name, address, phone } = req.body;
    if (!userId || !name || !address || !phone) {
        return res.status(400).json({ message: 'All fields are required ' });
      }
    try {
        const [updatedUserCount] = await ClientBuyer.update({ userId: userId, name: name, address: address, phone: phone }, {
        where: { id },
        returning: true,
        });
        verifyIfIdExists(updatedUserCount);
        getHandleSuccess(204)(res);
    } catch (e) {
        console.error(e);
        getHandleError(e, res);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await ClientBuyer.findOne({ where: { id } });
        if (!user) {
        return getHandleError(new Error('Client buyer not found'), res);
        }
        await ClientBuyer.destroy({ where: { id } });
        getHandleSuccess(200)(res, `client buyer deleted successfully`);
    } catch (e) {
        console.error(e);
        getHandleError(e, res);
    }
});
  
export default router;