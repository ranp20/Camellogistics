/*$(function(){
  listBanner_p();
});
// ------------ LISTAR REGULADORES
function listBanner_p(){ 
  $.ajax({
    url: "../admin/controllers/c_list-banner-principal.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;

      $("#tbl_banner_p").html(template);
    }else{
      response.forEach(e => {
      
      var pathphoto = "../admin/views/assets/img/banner_principal/"+e.photo;

      template += `
        <tr id="item-${e.id}">
          <td class='center'>${e.id}</td>
          <td class="cont-img-table">
            <a href="${pathphoto}" target="_blank">
              <img loading="lazy" src="${pathphoto}">
            </a>
          </td>
          <td class="cont-btn-update">
            <a class="btn-update-banner-p" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id}"
              data-photo="${pathphoto}"
              >Editar</a>
          </td>
          <!--<td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-banner-p" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id}"
              >Eliminar</a>
          </td>-->
        </tr>
        `;
      });
      
      $("#tbl_banner_p").html(template);
    }

  });
}
// ------------ LISTAR DATOS EN EL MODAL - ACTUALIZAR
$(document).on('click', '.btn-update-banner-p', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      photo: $(this).attr('data-photo')
    };
    $('#idupdate-banner-p').val(item_data['id']);
    $('#c-previewImg').find("img").attr("src", item_data['photo']);

  });
});
// ------------ ACTUALIZAR RESTAURANTE POR ID
$(document).on('click', '#btnupdate-banner-p', function(e){
  e.preventDefault();
  
  var formdata = new FormData();

  var filelength = $('.images-update')[0].files.length;
  for (var i = 0;i < filelength; i ++) {
    formdata.append("imagen", $('.images-update')[0].files[i]);
  }
  formdata.append("id", $('#idupdate-banner-p').val());

  $.ajax({
    url: "../admin/controllers/c_update-banner-principal.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((res) => {
    if(res == "true"){
      listBanner_p();
      $('#updateModal').modal("hide");
    }else{
      console.log('Lo sentimos, ocurriño un error al actualizar el banner');
    }
  });
});
$("#images").on("change", function(e){
  let readerImg = new FileReader();
  //ACCEDE A LA PROPIEDAD DE LA IMAGEN MEDIANTE EL CONTROL... 
  readerImg.readAsDataURL(e.target.files[0]);
  //CUANDO LA IMAGEN SE HAYA TERMINADO DE SUBIR(CARGAR)...
  readerImg.onload = function(){
    //CARGAR LA IMAGEN EN EL CONTENEDOR...
    $("#c-previewImg").find("img").attr("src", readerImg.result);
  }
});
// ------------ LISTAR ID EN EL MODAL - ELIMINAR
// $(document).on('click', '.btn-delete-banner-p', function(e){
//   e.preventDefault();
//   var id = $(this).attr('data-id');
//   $('#iddelete-banner-principal').val(id);
// });

// // ------------ ELIMINAR PAÍS
// $(document).on('click', '#btndelete-banner-principal', function(e){
//   e.preventDefault();
// 	var id = $('#iddelete-banner-principal').val();
//   $.ajax({
//     url: "../admin/controllers/c_delete-banner-principal.php",
//     method: "POST",
//     data: {id : id},
//   }).done((e) => {
//     $("#item-" + id).remove();
//     $('#deleteModal').modal("hide");
//   });
// });*/