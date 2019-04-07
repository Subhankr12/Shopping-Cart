function addToCart(target) {
   console.log(target)
   $.post(
      "/addCart", {
         name: target
      },
      data => {
         console.log(data)
      }
   )
}






function refreshList() {

   $('#products').empty()

   $.get("/product", data => {

      for (let product of data) {
         // console.log(product.name)
         $('#products').append(

            `
             <div id="card">
               <div>${product.vendor.name}</div> 
               <div>${product.name}</div> 
               <div>&#8377; ${product.price}</div>
               <button id = "shop_add" onclick='addToCart("${product.name}")'>ADD TO CART</button>
               </div>
               `
         )
      }
   })


}

refreshList()