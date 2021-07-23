$(function(){
  listRegulators();
  //load(1);
});
/************************** PAGINACIÓN DE CONTENIDO **************************/
// function load(page){
//   var parametros = {"action": "filter","page": page};
//   $("#loader").fadeIn('slow');
//   $.ajax({
//     url:'../admin/controllers/pag_regulators.php',
//     method: 'POST',
//     data: parametros,
//     beforeSend: function(){
//       $("#loader").html("<img src='../admin/views/assets/img/Utilities/loader.gif'>");
//     },
//     success:function(data){
//       console.log(data);
//       $(".outer_div").html(data).fadeIn('slow');
//       $("#loader").html("");
//     }
//   });
// }
/************************** AGREGAR REGULADOR **************************/
$(document).on('submit', '#form-add-regulator', function(e){
  e.preventDefault();
  var formdata = $(this).serializeArray();
  $.ajax({
    url: "../admin/controllers/c_add-regulators.php",
    method: "POST",
    data: formdata,
  }).done((res) => {
    if(res == "true"){
      $('#form-add-regulator')[0].reset();
      listRegulators();
      $('#addregulatorModal').modal("hide");
    }else{
      console.log('Lo sentimos, ocurrió un error al agregar el registro');
    }
  });
});
/************************** LISTAR REGULADORES **************************/
function listRegulators(searchVal){ 
  $.ajax({
    url: "../admin/controllers/list_regulators.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {

    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <tr>
          <td colspan="7">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;

      $("#tbl_regulators").html(template);
    }else{
      response.forEach(e => {
      
      template += `
        <tr id="item-${e.id}">
          <td class='center'>${e.id}</td>
          <td class='center'>${e.name}</td>
          <td class="cont-btn-update">
            <a class="btn-update-regulator" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id}"
              data-name="${e.name}"
              >Editar</a>
          </td>
          <td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-regulator" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id}"
              >Eliminar</a>
          </td>
        </tr>
        `;
      });
      
      $("#tbl_regulators").html(template);
    }

  });
}

/************************** BUSCADOR EN TIEMPO REAL **************************/
$(document).on('keyup', '#searchregulators', function() {
  var searchVal = $(this).val();

  if(searchVal != ""){
    listRegulators(searchVal);
  }else{
    listRegulators();
  }
});

/************************** LISTAR DATOS EN EL MODAL - ACTUALIZAR **************************/
$(document).on('click', '.btn-update-regulator', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      name: $(this).attr('data-name')
    };
    $('#idupdate-regulator').val(item_data['id']);
    $('#name-update').val(item_data['name']);

  });
});

/************************** ACTUALIZAR RESTAURANTE POR ID **************************/
$(document).on('click', '#btnupdate-regulator', function(e){
  e.preventDefault();
  
  var formdata = new FormData();

  formdata.append("name", $('#name-update').val());
  formdata.append("id", $('#idupdate-regulator').val());

  $.ajax({
    url: "../admin/controllers/c_update-regulator.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((res) => {
    listRegulators();
    $('#updateModal').modal("hide");
  });
});

/************************** LISTAR ID EN EL MODAL - ELIMINAR **************************/
$(document).on('click', '.btn-delete-regulator', function(e){
  e.preventDefault();
  var id = $(this).attr('data-id');
  $('#iddelete-regulator').val(id);
});

/************************** ELIMINAR PAÍS **************************/
$(document).on('click', '#btndelete-regulator', function(e){
  e.preventDefault();
	var id = $('#iddelete-regulator').val();
  $.ajax({
    url: "../admin/controllers/c_delete-regulator.php",
    method: "POST",
    data: {id : id},
  }).done((e) => {
    $("#item-" + id).remove();
    $('#deleteModal').modal("hide");
  });
});