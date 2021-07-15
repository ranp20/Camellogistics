var idCountryOrigin = 0;

/************************** OBTENER EL VALOR DEL ID DE ORIGEN **************************/
$(document).on("click", "#list-originCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){
  idCountryOrigin = $(this).attr("idpaisattr");
  return idCountryOrigin;
});

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
    data: {searchList : searchVal, idpais : idCountryOrigin },
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
      }, 4500);
    }else{
      response.forEach(e => {
      
      if(e.idpais != idCountryOrigin){
        template += `
          <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item" id="${e.idpuerto}" idpaisDestino="${e.idpais}">
          	<span>${e.pais} - ${e.puerto}</span>
          </li>
          `;
      }
      });

      $("#list-destinyCountriesandPort").html(template);
    }
  });
}
/************************** BUSQUEDA EN TIEMPO REAL DE PUERTO DE DESTINO - LCL **************************/
$(document).on("keyup", "#input-vallistdestiny", function(){	
  
  if($("#input-vallistorigin").val() == ""){
    $("#input-vallistdestiny").attr("aria-expanded", false);
    $("#input-vallistdestiny").css({"background-color":"#dddd","cursor":"not-allowed"});
    $("#input-vallistdestiny").attr("title", "Seleccione un puerto de origen");
    $("#list-destinyCountriesandPort").html(`
      <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">
        <span>No encontrado</span>
      </li>
    `);
  }else{
    $("#input-vallistdestiny").attr("aria-expanded", true);
    $("#input-vallistdestiny").css({"background-color":"#fff","cursor":"pointer"});
    $("#input-vallistdestiny").removeAttr("title");
  }

  /************************** VALIDACIÓN AL PUERTO DE DESTINO **************************/
  if($("#input-vallistdestiny").val() == ""){
    $("#input-vallistdestiny").removeAttr("id-puertodestiny");
    $("#input-vallistdestiny").removeAttr("idpaisDestino");
  }else{
    $("#input-vallistdestiny").attr("aria-expanded", true);
    $("#input-vallistdestiny").removeAttr("disabled");
  }

  $("#list-destinyCountriesandPort").addClass("show");
	var searchVal = $(this).val();
  if(searchVal != ""){
    list_puertoDestinyLCL(searchVal);
  }else{
    list_puertoDestinyLCL();
  }
});
/************************** FOCUS EN EL INPUT DE DESTINO **************************/
$("#input-vallistdestiny").focus(function(){
  if($("#input-vallistorigin").val() == ""){
    alert("Debes seleccionar una opcíon de origen válida");
    $("#input-vallistdestiny").attr("aria-expanded", false);
    $("#input-vallistdestiny").css({"background-color":"#dddd","cursor":"not-allowed"});
    $("#input-vallistdestiny").attr("disabled","disabled");
  }else{
    $("#input-vallistdestiny").attr("aria-expanded", true);
    $("#input-vallistdestiny").css({"background-color":"#fff","cursor":"pointer"});
    $("#input-vallistdestiny").removeAttr("disabled");
  }
});
/************************** FIJAR EL VALOR DEL PUERTO EN EL INPUT **************************/
$(document).on("click", "#list-destinyCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){ 
	$("#list-destinyCountriesandPort").removeClass("show");
	$("#input-vallistdestiny").attr("id-puertodestiny", $(this).attr("id"));
	$("#input-vallistdestiny").val($(this).find("span").text());
  
  /************************** GUARDAR INFO. EN LOCALSTORAGE **************************/
  localStorage.setItem("port_DId", $(this).attr("id"));
  localStorage.setItem("port_DName", $(this).find("span").text());
});