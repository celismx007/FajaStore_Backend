import Product from './productModel.js';
import Image from './imageModel.js'
import User from './userModel.js'
import Account from './accountModel.js';
import ClientBuyer from './clientBuyerModel.js'
import RequestedProduct from './requestedProductModel.js';
import UnitsProduct from './unitsProductModel.js';


User.hasOne(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(ClientBuyer, { foreignKey: 'userId' });
ClientBuyer.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(RequestedProduct, { foreignKey: 'productId' });
RequestedProduct.belongsTo(Product, { foreignKey: 'productId' });

ClientBuyer.hasMany(RequestedProduct, { foreignKey: 'clientBuyersId' });
RequestedProduct.belongsTo(ClientBuyer, { foreignKey: 'clientBuyersId' });

Product.hasMany(UnitsProduct, { foreignKey: "productId"});
UnitsProduct.belongsTo(Product, { foreignKey: "productId" });


export { 
    User, 
    Account,
    Product,
    Image,
    ClientBuyer,
    RequestedProduct,
    UnitsProduct,
}