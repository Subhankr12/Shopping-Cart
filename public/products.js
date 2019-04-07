$(() => {
   $.get("/vendor", data => {
      for (let vendor of data) {
         $("#vendors").append(
            '<option value="' + vendor.id + '">' + vendor.name + '</option>'
         )

      }
   })

   function refreshList() {
      $("#product_list").empty()

      $.get("/product", data => {

         for (let product of data) {
            console.log(product)
            $("#product_list").append(

               $("<li>").text(
                  product.id +
                  " " +
                  product.vendor.name +
                  " " +
                  product.name +
                  " " +
                  product.price +
                  " " +
                  product.quantity
               )
            )
         }
      })
   }

   $("#add_product").click(() => {

      $.post(
         "/product", {
            name: $("#product_name").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
            vendor: $("#vendors").val()
         },
         data => {
            if (data.success == true) {
               refreshList()
            }
         }
      )
   })

   refreshList()
})