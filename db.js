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

module.exports = {
   db,
   Vendor
}