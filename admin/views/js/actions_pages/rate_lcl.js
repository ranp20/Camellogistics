$(function(){
	listUtilitiesLCL();
});
/************************** AGREGAR ARCHIVO DE EXCEL LCL **************************/
$(document).on('submit', '#form-add-spreadsheetlcl', function(e){
  e.preventDefault();

  $("#btnadd-spreadsheetlcl").attr("disabled", true);
  $("#btnadd-spreadsheetlcl").addClass("showloader");
  $(".cont-modalbootstrap__footer--btncancel").attr("disabled", true);
  $(".cont-modalbootstrap__footer--btncancel").addClass("not-cancel");

	var spreadsheet = ($("#spreadsheetlcl"))[0].files[0];
	var yy = spreadsheet.size > 4000000;
	if (yy) {
	  alert("Imagen a subir maximo 4mb");
	  return;
	}
	var data = new FormData();
	data.append("spreadsheetlcl", spreadsheet);
	data.append("utilitylcl", $("#utilitylcl").val());
	data.append("validdesdelcl", $("#validdesdelcl").val());
	data.append("validhastalcl", $("#validhastalcl").val());

	$.ajax({
	  url: "../admin/controllers/prcss_add-spreadsheet_lcl.php",
	  type: "POST",
	  data: data,
	  processData: false,
	  contentType: false
	}).done((res) => {
		var result = JSON.parse(res);
		if(result.response == "inserted"){
			alert("Se ha insertado con éxito el Excel");
			
			listUtilitiesLCL();
			$("#btnadd-spreadsheetlcl").attr("disabled", false);
			$("#btnadd-spreadsheetlcl").removeClass("showloader");
			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
  		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
      $('#addspreadsheetlclModal').modal("hide");
			$('#form-add-spreadsheetlcl')[0].reset();
		}else if(result.response == "updated"){
			alert("Se ha actuaizado con éxito el Excel");
			
			listUtilitiesLCL();
			$("#btnadd-spreadsheetlcl").attr("disabled", false);
			$("#btnadd-spreadsheetlcl").removeClass("showloader");
			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
  		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
      $('#addspreadsheetlclModal').modal("hide");
			$('#form-add-spreadsheetlcl')[0].reset();
		}else{
			console.log('Lo sentimos ocurrió un error al insertar el registro');
		}
	});
});
/************************** LISTAR - UTILIDADES **************************/
function listUtilitiesLCL(){ 
  $.ajax({
    url: "../admin/controllers/c_list-utilities-rate-lcl.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  }).done((e) => {

    var response = JSON.parse(e);
    var template = "";
    if(response.length == 0){
      template = `
        <tr>
          <td colspan="5">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;

      $("#tbl_utilities_rate_lcl").html(template);
    }else{
      response.forEach(e => {
      
      template += `
        <tr id="item-${e.id}">
          <td class='center'>${e.id}</td>
          <td class='center'>${e.utility}</td>
          <td class='center'>${e.val_desde}</td>
          <td class='center'>${e.val_hasta}</td>
          <!--<td class="cont-btn-update">
            <a class="btn-update-rateutilitylcl" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id}"
              data-utility="${e.utility}"
              data-valdesde="${e.val_desde}"
              data-valhasta="${e.val_hasta}"
              >Editar</a>
          </td>
          <td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-rateutilitylcl" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id}"
              >Eliminar</a>
          </td>-->
        </tr>
        `;
      });
      
      $("#tbl_utilities_rate_lcl").html(template);
    }

  });
}