$(function(){
	listUtilitiesFCL();
});
/************************** AGREGAR ARCHIVO DE EXCEL LCL **************************/
$(document).on('submit', '#form-add-spreadsheetfcl', function(e){
  e.preventDefault();

  $("#btnadd-spreadsheetfcl").attr("disabled", true);
  $("#btnadd-spreadsheetfcl").addClass("showloader");
  $(".cont-modalbootstrap__footer--btncancel").attr("disabled", true);
  $(".cont-modalbootstrap__footer--btncancel").addClass("not-cancel");

	var spreadsheet = ($("#spreadsheetfcl"))[0].files[0];
	var yy = spreadsheet.size > 4000000;
	if (yy) {
	  alert("Imagen a subir maximo 4mb");
	  return;
	}
	var data = new FormData();
	data.append("spreadsheetfcl", spreadsheet);
	data.append("utilityfcl", $("#utilityfcl").val());
	data.append("validdesdefcl", $("#validdesdefcl").val());
	data.append("validhastafcl", $("#validhastafcl").val());

	$.ajax({
	  url: "../admin/controllers/prcss_add-spreadsheet_fcl.php",
	  type: "POST",
	  data: data,
	  processData: false,
	  contentType: false
	}).done((res) => {
		var result = JSON.parse(res);
		if(result.response == "inserted"){
			alert("Se ha insertado con éxito el Excel");
			
			listUtilitiesFCL();
			$("#btnadd-spreadsheetfcl").attr("disabled", false);
			$("#btnadd-spreadsheetfcl").removeClass("showloader");
			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
  		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
      $('#addspreadsheetfclModal').modal("hide");
			$('#form-add-spreadsheetfcl')[0].reset();
		}else if(result.response == "updated"){
			alert("Se ha actuaizado con éxito el Excel");
			
			listUtilitiesFCL();
			$("#btnadd-spreadsheetfcl").attr("disabled", false);
			$("#btnadd-spreadsheetfcl").removeClass("showloader");
			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
  		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
      $('#addspreadsheetfclModal').modal("hide");
			$('#form-add-spreadsheetfcl')[0].reset();
		}else{
			console.log('Lo sentimos ocurrió un error al insertar el registro');
		}
	});
});
/************************** LISTAR - UTILIDADES **************************/
function listUtilitiesFCL(){ 
  $.ajax({
    url: "../admin/controllers/c_list-utilities-rate-fcl.php",
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

      $("#tbl_utilities_rate_fcl").html(template);
    }else{
      response.forEach(e => {
      
      template += `
        <tr id="item-${e.id}">
          <td class='center'>${e.id}</td>
          <td class='center'>${e.utility}</td>
          <td class='center'>${e.val_desde}</td>
          <td class='center'>${e.val_hasta}</td>
          <!--<td class="cont-btn-update">
            <a class="btn-update-rateutilityfcl" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id}"
              data-utility="${e.utility}"
              data-valdesde="${e.val_desde}"
              data-valhasta="${e.val_hasta}"
              >Editar</a>
          </td>
          <td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-rateutilityfcl" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id}"
              >Eliminar</a>
          </td>-->
        </tr>
        `;
      });
      
      $("#tbl_utilities_rate_fcl").html(template);
    }

  });
}