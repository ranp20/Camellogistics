$(() => {
	listUtilitiesLCL();
});
// ------------ AGREGAR ARCHIVO DE EXCEL LCL
$(document).on('submit', '#form-add-spreadsheetlcl', function(e){
  e.preventDefault();
  $("#btnadd-spreadsheetlcl").attr("disabled", true);
  $("#btnadd-spreadsheetlcl").addClass("showloader");
  $(".cont-modalbootstrap__footer--btncancel").attr("disabled", true);
  $(".cont-modalbootstrap__footer--btncancel").addClass("not-cancel");
	var spreadsheet = ($("#spreadsheetlcl"))[0].files[0];
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
	}).done((e) => {
    if(e != ""){
  		var r = JSON.parse(e);
  		if(r.response == "inserted"){
  			listUtilitiesLCL();
  			$("#btnadd-spreadsheetlcl").attr("disabled", false);
  			$("#btnadd-spreadsheetlcl").removeClass("showloader");
  			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
    		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
        $('#addspreadsheetlclModal').modal("hide");
  			$('#form-add-spreadsheetlcl')[0].reset();
        Swal.fire({
          title: 'Agregado!',
          html: `<span class='font-w-300'>Se ha subido el archivo satisfactoriamente.</span>`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
  		}else if(r.response == "updated"){
  			listUtilitiesLCL();
  			$("#btnadd-spreadsheetlcl").attr("disabled", false);
  			$("#btnadd-spreadsheetlcl").removeClass("showloader");
  			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
    		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
        $('#addspreadsheetlclModal').modal("hide");
  			$('#form-add-spreadsheetlcl')[0].reset();
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
function listUtilitiesLCL(){ 
  $.ajax({
    url: "../admin/controllers/c_list-utilities-rate-lcl.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  }).done((e) => {
    if(e != ""){
      var r = JSON.parse(e);
      var template = "";
      if(r.length == 0){
        template = `
        <tr>
          <td colspan="5">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_utilities_rate_lcl").html(template);
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
        $("#tbl_utilities_rate_lcl").html(template);
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}