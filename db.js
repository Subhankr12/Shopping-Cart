const Sequelize = require('sequelize')

const db = new Sequelize({
   dialect: 'sqlite',
   storage: __dirname + '/vendors.db'
})

const Vendor = db.define('vendor', {

   name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
   }
})

const Product = db.define('product', {
   name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
   },
   price: Sequelize.INTEGER,
   quantity: Sequelize.INTEGER,
   vendorId: {
      type: Sequelize.INTEGER,
      references: {
         model: 'Vendors',
         key: 'id'
      }
   }

})

Vendor.hasMany(Product)
Product.belongsTo(Vendor)

module.exports = {
   db,
   Vendor,
   Product
}