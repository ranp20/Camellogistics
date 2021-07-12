$(function(){
	list_puertoOriginLCL();
});
/************************** MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN **************************/
function list_puertoOriginLCL(searchVal){ 
  $.ajax({
    url: "controllers/list_puertoOriginLCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {

    var response = JSON.parse(res);
    var template = "";

    if($("#input-vallistorigin").val() == "" || response.length == 0){
      template = `
        <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">
        	<span>No encontrado</span>
        </li>
      `;
      $("#list-originCountriesandPort").html(template);
      setTimeout(function(){
        $("#list-originCountriesandPort").removeClass("show");
      }, 1000);
    }else{
      response.forEach(e => {
      template += `
        <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item" id="${e.idpuerto}">
        	<span>${e.puerto} - ${e.pais}</span>
        </li>
        `;
      });
      $("#list-originCountriesandPort").html(template);
    }
  });
}
/************************** BUSQUEDA EN TIEMPO REAL DE PUERTO DE ORIGIN - LCL **************************/
$(document).on("keyup", "#input-vallistorigin", function(){	
	$("#list-originCountriesandPort").addClass("show");
	var searchVal = $(this).val();
  if(searchVal != ""){
    list_puertoOriginLCL(searchVal);
  }else{
    list_puertoOriginLCL();
  }
});
/************************** FIJAR EL VALOR DEL PUERTO EN EL INPUT **************************/
$(document).on("click", "#list-originCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){ 
	$("#list-originCountriesandPort").removeClass("show");
  $("#input-vallistorigin").attr("id-puertoorigin", $(this).attr("id"));
	$("#input-vallistorigin").val($(this).find("span").text());
});
