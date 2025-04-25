import express from 'express'; 
import { UnitsProduct } from '../models/mainExport.js';
import sequelize from '../database/connection.js';

const router = express.Router();

router.get('/', async (req, res) => { 
    try { 
        const products = await UnitsProduct.findAll();
        if (products) { 
            return res.status(200).json(products);
        } else {
            return res.status(400).json({
                error: true,
                message: 'Not Found Products!.'
              });
        }
    } catch (e) { 
        console.error(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});

router.get('/:id', async (req, res) => { 
    const { id } = req.params;
    try { 
        const products = await UnitsProduct.findOne({
            where: { id },
            }); 
        if (products) { 
            return res.status(200).json(products);
        } else {
            return res.status(400).json({
                error: true,
                message: 'Not Found Products!.'
              });
        }
    } catch (e) { 
        console.error(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});

router.post('/', async (req, res) => { 
    const { productId, size, color, price } = req.body;
    try {  
        const product = await UnitsProduct.create({
            productId:productId, size:size, color:color, price:price
        });
        if(product){ 
            return res.status(200).json('unida de producto creado!');
        }
        return res.status(400).json('error al crear el producto!');
    } catch (e) { 
        console.e(e);
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });
    }
});

router.put('/:id', async (req, res) => { 
    const { id } = req.params.id
    const { productId, size, color, price } = req.body;
    try { 
        const product = await UnitsProduct.update({
            productId:productId, size:size, color:color, price:price
        }, { where: { id: id}});
        return res.status(200).json('unidad de producto actualizado!');
    } catch (e) { 
        console.error(e);
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });
    }
});

router.delete('/:id', async (req, res) => { 
    const { id } = req.params;
    try { 
        const product = await UnitsProduct.destroy({
            where: { id },
            }); 
        return res.status(200).json(product);
    } catch (e) { 
        console.error(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});



export default router;