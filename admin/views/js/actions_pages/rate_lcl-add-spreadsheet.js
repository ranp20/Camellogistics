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
			//listProducts();
			$("#btnadd-spreadsheetlcl").attr("disabled", false);
			$("#btnadd-spreadsheetlcl").removeClass("showloader");
			$(".cont-modalbootstrap__footer--btncancel").attr("disabled", false);
  		$(".cont-modalbootstrap__footer--btncancel").removeClass("not-cancel");
      $('#addspreadsheetlclModal').modal("hide");
			$('#form-add-spreadsheetlcl')[0].reset();
		}else if(result.response == "updated"){
			alert("Se ha actuaizado con éxito el Excel");
			//listProducts();
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