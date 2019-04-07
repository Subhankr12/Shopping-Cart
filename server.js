const express = require('express')
const {
   db,
   Vendor,
   Product
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
   extended: true
}))

app.use('/products', express.static(__dirname + '/public'))



app.get('/vendor', async (req, res) => {
   let vendor_name = await Vendor.findAll()
   res.send(vendor_name)
})

app.post('/vendor', (req, res) => {
   Vendor.create({
      name: req.body.name
   })
   res.send({
      success: true
   })
})



app.get('/product', async (req, res) => {
   let products = await Product.findAll({
      include: [Vendor]
   })
   res.send(products)
})

app.post('/product', (req, res) => {
   Product.create({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      vendorId: req.body.vendor
   })
   res.send({
      success: true
   })
})

db.sync({

   })
   .then(() => {
      app.listen(3444, () => {
         console.log('Server Started')
      })
   })