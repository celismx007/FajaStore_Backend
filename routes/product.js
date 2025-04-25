import express from 'express'; 
import { Product, Image } from '../models/mainExport.js';
import sequelize from '../database/connection.js';

const router = express.Router();

router.get('/', async (req, res) => { 
    try { 
        const products = await Product.findAll({
            include: [
                {
                  model: Image,
                  required: false,
                }
              ]
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
        console.log(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});

router.get('/:id', async (req, res) => { 
    const { id } = req.params;
    try { 
        const products = await Product.findOne({
            where: { id },
            include: [
                {
                  model: Image,
                  required: false,
                }
              ]
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
        console.log(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});

router.get('/category/:category', async (req, res) => { 
    const { category } = req.params;
    try { 
        const products = await Product.findAll({
            where: { category: category },
            include: [
                {
                  model: Image,
                  required: false,
                }
              ]
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
        console.log(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});

router.post('/', async (req, res) => { 
    // const { brand, category, color, description, id, images, name, price,
    //     size, stock } = req.body;
        const {images, name, id } = req.body;
    const transaction = await sequelize.transaction();
    try { 
        const product = await Product.create({
           name:name, 
        }, { where: { id: id}, transaction});
        if( Array.isArray(images)){ 
            for(const item of images) { 
                if ( !item.productId) { 
                    await Image.update({
                        productId: product.id    
                    }, { where: {id: item.id}, transaction}); 
                }
            }
        }
        await transaction.commit();
        return res.status(200).json('producto creado!');
    } catch (e) { 
        await transaction.rollback();
        console.error('Error:', e);
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });
    }
});

router.put('/:id', async (req, res) => { 
    const { brand, category, color, description, id, images, name, price,
        size, stock } = req.body;
    const transaction = await sequelize.transaction();
    try { 
        const product = await Product.update({
            brand:brand, category:category, description:description, name:name, 
            price:price, stock:stock, size:size, color:color,
        }, { where: { id: id}, transaction});
        await transaction.commit();
        return res.status(200).json('producto actualizado!');
    } catch (e) { 
        await transaction.rollback();
        console.error('Error:', e);
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });
    }
});

router.delete('/:id', async (req, res) => { 
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try { 
        const images = await Image.findAll({ where: { productId: id } });
        if (images.length > 0) {
            await Image.destroy({ where: { productId: id }, transaction });
        }
        const deletedProduct = await Product.destroy({ where: { id }, transaction });
        await transaction.commit();
        if (deletedProduct) {
            return res.status(200).json({ message: 'Producto eliminado correctamente' });
        } else {
            return res.status(404).json({ error: true, message: 'Producto no encontrado' });
        }

    } catch (e) { 
        await transaction.rollback();
        console.error(e)
        return res.status(500).json({
            error: e,
            message: 'Error al eliminar el producto',
        });
    }
});



export default router;