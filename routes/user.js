import express from 'express';
import { encrypt } from '../helpers/handleBcrypt.js';
import { User, Account } from '../models/mainExport.js';
import { verifyIfIdExists } from '../helpers/validateData.js';
import { getHandleSuccess } from '../helpers/handleSuccess.js';
import sequelize from '../database/connection.js';


const router = express.Router();


router.get('/', async(req, res, next) =>{
    try{ 
        const users = await User.findAll({
            include: [{
                model: Account,
                attributes: ['user_name', 'password']
                }]
        })
        getHandleSuccess(200)(res, users);
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Fail get Users!',
        });
    }
})

router.get('/:id', async (req, res, next ) => { 
    const { id } = req.params; 
    try{
        const user = await User.findOne({
            where: { id: id },
            include: [ {
              model: Account,
              attributes: ['user_name', 'password']
                }
            ]
        }); 
        verifyIfIdExists(user);
        getHandleSuccess(200)(res, user);
    } catch (e) { 
        console.log(e); 
        return res.status(500).json({
            error: e,
            message: 'Fail get User!',
        });
    }
})

// router.post('/', async (req, res, next) => {
//     const { address, email, lastName, name, phone, phoneNumber, role, status } = req.body;
//     if (!address || !email || !lastName || !name || !phone || !phoneNumber || !role || !status) {
//       return res.status(400).json({ message: 'All fields are required ' });
//     }
//     const transaction = await sequelize.transaction();
//     try {
//       const newUser = await User.create({ 
//         address, creationDate: Date.now(), email, lastName, name, phone, phoneNumber, role: role, status }, {
//         transaction
//       });
//       const password = `${name.charAt(0).toUpperCase() + name.slice(1)}.${email}`;
//       const passwordHash = await encrypt(password);
  
//       //sendEmail(email, { email, password, name });
//       await Account.create({ userId: newUser.id, email, password: passwordHash }, {
//         transaction
//       });
//       await transaction.commit();
//       getHandleSuccess(201)(res, 'User and Account created successfully');
//     } catch (e) {
//       await transaction.rollback();
//       if (e.name === 'SequelizeUniqueConstraintError') {
//         return res.status(400).json({ message: 'Ya existe un usuario con esos datos' });
//       }
//       return res.status(500).json({
//         error: e,
//         message: 'Fail created User!',
//     });
//     }
// });

router.post('/', async (req, res, next) => {
    const { email, lastName, name, password } = req.body;
    const creationDate = new Date().toISOString().split('T')[0];
    if (!email || !lastName || !name || !password) {
      return res.status(400).json({ message: 'All fields are required ' });
    }
    const transaction = await sequelize.transaction();
    try {
      const newUser = await User.create({ 
        creationDate: creationDate, email: email, lastName: lastName, role: 'client', status: 'true' }, {
        transaction
      });
      //const password = `${name.charAt(0).toUpperCase() + name.slice(1)}.${email}`;
      //const passwordHash = await encrypt(password);
  
      //sendEmail(email, { email, password, name });
      //await Account.create({ userId: newUser.id, email, password: passwordHash }, {
      //  transaction
      //});
      const passwordHash = await encrypt(password);
      await Account.create({ userId: newUser.id, userName: name, password: passwordHash }, {
        transaction
      });
      await transaction.commit();
      getHandleSuccess(201)(res, 'User and Account created successfully');
    } catch (e) {
        console.log(e);
      await transaction.rollback();
      if (e.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Ya existe un usuario con esos datos' });
      }
      return res.status(500).json({
        error: e,
        message: 'Fail created User!',
    });
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { address, email, lastName, name, phone, phoneNumber, role, status } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const [updatedUserCount] = await User.update({ address, email, lastName, name, phone, phoneNumber, role, status }, {
        where: { id },
        returning: true,
        transaction
        });
        verifyIfIdExists(updatedUserCount);
        await transaction.commit();
        getHandleSuccess(204)(res);
    } catch (error) {
        await transaction.rollback();
        getHandleError(error, res);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
        return getHandleError(new Error('User not found'), res);
        }
        //const newDeletedStatus = user.deleted ? 0 : 1;
        //await User.update({ deleted: newDeletedStatus }, { where: { id } });
        await User.destroy({ where: { id } });
        //getHandleSuccess(200)(res, `User ${newDeletedStatus ? 'deleted' : 'restored'} successfully`);
        getHandleSuccess(200)(res, `User deleted successfully`);
    } catch (error) {
        getHandleError(error, res);
    }
});
  


export default router;