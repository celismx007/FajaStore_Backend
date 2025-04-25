import express from 'express'; 
import { Product, Image } from '../models/mainExport.js';
import sequelize from '../database/connection.js';
import { where } from 'sequelize';

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
    const { image, productId } = req.body; 
    try { 
        var product; 
        if(!productId) {
            product = await Image.create({
                image:image }); 
        } else { 
            product = await Image.create({
                image:image, productId: productId }); 
        }
        return res.status(200).json(product);
    } catch (e) { 
        console.log(e)
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
        const updateProduct = await Product.update({
            brand:brand, category:category, description:description, name:name, 
            price:price, stock:stock, size:size, color:color,
        }, { where: { id: id}, transaction});
        if( Array.isArray(images)){ 
            for(const item of images) { 
                if ( item.id) { 
                    await Image.update({
                        image:item.image    
                    }, { where: {productId: item.productId}, transaction}); 
                } else { 
                    await Image.create({
                        image:item.image, productId: id
                    }, { transaction}); 
                }
            }
        }
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
    try { 
        const image = await Image.destroy({
            where: { id },
            }); 
        return res.status(200).json(image);
    } catch (e) { 
        console.log(e)
        return res.status(500).json({
            error: e,
            message: 'Error in the query',
        });

    }
});



export default router;