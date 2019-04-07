$(() => {


   $.post('/displayCart', {

      },
      data => {
         for (let items of data) {
            console.log(items)
            $('#cart_items').append(
               `<li>
               ${items.id}
               ${items.vendor.name}
               ${items.productName}
               ${items.price}
               ${items.quantity}
               </li>
                  `

            )
         }
      }
   )

})