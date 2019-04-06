const express = require('express')
const {
   db,
   Vendor
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
   extended: true
}))

app.use('/vendors', express.static(__dirname + '/public'))



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

db.sync({

   })
   .then(() => {
      app.listen(3444, () => {
         console.log('Server Started')
      })
   })