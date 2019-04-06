$(() => {
   function refreshList() {
      $('#vendor_list').empty()

      $.get(
         '/vendor',
         (data) => {
            console.log(data)
            for (let vendor of data) {
               $('#vendor_list').append(
                  $('<li>').text(vendor.id + ' ' + vendor.name)
               )
            }
         }
      )
   }

   $('#add_vendor').click(() => {

      $.post(
         '/vendor', {
            name: $('#vendor_name').val()
         },
         (data) => {
            if (data.success == true) {
               refreshList()
            }
         }
      )

   })

   refreshList()
})