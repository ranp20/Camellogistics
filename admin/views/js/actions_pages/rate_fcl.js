$(() => {
	listUtilitiesFCL();
});
// ------------ AGREGAR ARCHIVO DE EXCEL LCL
$(document).on('submit', '#form-add-spreadsheetfcl', function(e){
  e.preventDefault();
  $("#btnadd-spreadsheetfcl").attr("disabled", true);
  $("#btnadd-spreadsheetfcl").addClass("showloader");
  $(".cont-modalbootstrap__footer--btncancel").attr("disabled", true);
  $(".cont-modalbootstrap__footer--btncancel").addClass("not-cancel");
	var spreadsheet = ($("#spreadsheetfcl"))[0].files[0];
	var maxsize = spreadsheet.size > 4000000;
	if(maxsize){
    Swal.fire({
      title: 'Atención!',
      html: `<span class='font-w-300'>Archivo a subir debe tener un máximo de 4MB.</span>`,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
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
	}).done((e) => {
    if(e != ""){
  		var r = JSON.parse(e);
  		if(r.response == "inserted"){
  			listUtilitiesFCL();
  			$("#btnadd-spreadsheetfcl").attr("disabled", false);
  			$("#btnadd-spreadsheetfcl").removeClass("showloader");
  			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
    		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
        $('#addspreadsheetfclModal').modal("hide");
  			$('#form-add-spreadsheetfcl')[0].reset();
  			Swal.fire({
          title: 'Agregado!',
          html: `<span class='font-w-300'>Se ha subido el archivo satisfactoriamente.</span>`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
  		}else if(r.response == "updated"){
  			listUtilitiesFCL();
  			$("#btnadd-spreadsheetfcl").attr("disabled", false);
  			$("#btnadd-spreadsheetfcl").removeClass("showloader");
  			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
    		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
        $('#addspreadsheetfclModal').modal("hide");
  			$('#form-add-spreadsheetfcl')[0].reset();
        Swal.fire({
          title: 'Actualizado!',
          html: `<span class='font-w-300'>Se ha actualizado el registro satisfactoriamente.</span>`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
  		}else{
  			Swal.fire({
          title: 'Error!',
          html: `<span class='font-w-300'>Lo sentimos, hubo un error al subir el archivo.</span>`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
  		}
    }else{
      Swal.fire({
        title: 'Error!',
        html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
	});
});
// ------------ LISTAR - UTILIDADES
function listUtilitiesFCL(){ 
  $.ajax({
    url: "../admin/controllers/c_list-utilities-rate-fcl.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  }).done((e) => {
    if(e != ""){
      var r = JSON.parse(e);
      var template = "";
      if(r.length == 0){
        template = `<tr>
          <td colspan="5">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_utilities_rate_fcl").html(template);
      }else{
        $.each(r, function(i,e){
          template += `
            <tr id="item-${e.id}">
              <td class='center'>${e.id}</td>
              <td class='center'>${e.utility}</td>
              <td class='center'>${e.val_desde}</td>
              <td class='center'>${e.val_hasta}</td>
            </tr>`;
        });      
        $("#tbl_utilities_rate_fcl").html(template);
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}