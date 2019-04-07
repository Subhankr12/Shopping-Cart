const express = require("express")
const {
   db,
   Vendor,
   Product,
   Cart
} = require("./db")

const app = express()
const PORT = process.env.PORT || 3444

app.use(express.json())
app.use(
   express.urlencoded({
      extended: true
   })
)

app.use("/products", express.static(__dirname + "/public"))

app.get("/vendor", async (req, res) => {
   let vendor_name = await Vendor.findAll()
   res.send(vendor_name)
})

app.post("/vendor", (req, res) => {
   Vendor.create({
      name: req.body.name
   })
   res.send({
      success: true
   })
})

app.get("/product", async (req, res) => {
   let products = await Product.findAll({
      include: [Vendor]
   })
   res.send(products)
})

app.post("/product", (req, res) => {
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

app.post("/addCart", async (req, res) => {

   let check_cart = await Cart.findOne({
      where: {
         productName: req.body.name
      }
   })

   if (check_cart) {
      await Cart.update({
         quantity: parseInt(check_cart.quantity) + 1
      }, {
         where: {
            id: check_cart.id
         }
      })
   } else {
      let product = await Product.findOne({
         where: {
            name: req.body.name
         }
      })

      await Cart.create({
         productName: req.body.name,
         productId: product.id,
         quantity: 1,
         price: product.price,
         vendorId: product.vendorId
      })
   }
})

app.post("/displayCart", async (req, res) => {
   let cart = await Cart.findAll({
      include: [Vendor]
   })

   res.send(cart)
})

db.sync({

}).then(() => {
   app.listen(PORT, () => {
      console.log("Server Started")
   })
})