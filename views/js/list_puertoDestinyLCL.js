$(function(){
	list_puertoDestinyLCL();
});
/************************** MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN **************************/
function list_puertoDestinyLCL(searchVal){ 
  $.ajax({
    url: "controllers/list_puertoDestinyLCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {

    var response = JSON.parse(res);
    var template = "";

    if($("#input-vallistdestiny").val() == "" || $("#input-vallistdestiny").val() == 0 || response.length == 0){
      template = `
        <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">
        	<span>No encontrado</span>
        </li>
      `;
      $("#list-destinyCountriesandPort").html(template);
      setTimeout(function(){
        $("#list-destinyCountriesandPort").removeClass("show");
      }, 1000);
    }else{
      response.forEach(e => {
      template += `
        <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item" id="${e.idpuerto}">
        	<span>${e.puerto} - ${e.pais}</span>
        </li>
        `;
      });
      $("#list-destinyCountriesandPort").html(template);
    }
  });
}
/************************** BUSQUEDA EN TIEMPO REAL DE PUERTO DE DESTINO - LCL **************************/
$(document).on("keyup", "#input-vallistdestiny", function(){	
	$("#list-destinyCountriesandPort").addClass("show");
	var searchVal = $(this).val();
  if(searchVal != ""){
    list_puertoDestinyLCL(searchVal);
  }else{
    list_puertoDestinyLCL();
  }
});
/************************** FIJAR EL VALOR DEL PUERTO EN EL INPUT **************************/
$(document).on("click", "#list-destinyCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){ 
	$("#list-destinyCountriesandPort").removeClass("show");
	$("#input-vallistdestiny").attr("id-puertodestiny", $(this).attr("id"));
	$("#input-vallistdestiny").val($(this).find("span").text());
});