$(function(){
  /************************** LISTAR LOS TIPOS DE SERVICIOS **************************/
	list_typ_services();
  /************************** LISTAR: TIPOS DE CONTENEDORES, TIPOS DE UNIDADES DE PESO Y TIPOS DE UNIDADES DE VOLUMEN **************************/
  list_typ_containers();
  list_typ_measurement_units();
  list_typ_volume_units();
  /************************** LISTAR EL PUERTO DE ORIGEN **************************/
  list_puertoOriginLCL();
  /************************** LISTAR EL PUERTO DE DESTINO **************************/
  list_puertoDestinyLCL();
});
/************************** MOSTRAR LOS TIPOS DE SERVICIOS PARA LA COTZACIÓN **************************/
function list_typ_services(){
	$.ajax({
    url: "controllers/list_type_services.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <li class="c-CalculatorStep--form--contStep--cStep--m--item">
        	<span>No se econtraron resultados</span>
        </li>
      `;
      $("#cont-typeServicesOneStep").html(template);
    }else{
      $.each(response, function(i, e) {
      	var pathimgservice = "views/assets/img/"+e.photo;
      	
      	$("#cont-typeServicesOneStep").append(`
    			<li class="c-CalculatorStep--form--contStep--cStep--m--item" id="typeservice-${e.id}" item-service="${i}">
						<a href="#" id="${e.type}" class="c-CalculatorStep--form--contStep--cStep--m--link">
							<img class="img-fluid" src="${pathimgservice}" alt=""/>
						</a>
					</li>
      	`);
      });
    }
  });
}

/************************** MOSTRAR LOS TIPOS DE CONTENEDORES EN EL MODAL DE TIPOS DE CONTENEDORES **************************/
function list_typ_containers(){
  $.ajax({
    url: "controllers/list_type_containers.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <span>No se econtraron resultados</span>
      `;
      $("#cont-containOptsContainers").html(template);

    }else{

      $.each(response, function(i, e) {
        var pathimgcont = "views/assets/img/utilities/"+e.photo;
        var quantity_clients = "";
        var name_two = "";
        if(e.name_two == "No especificado"){
          var name_two = "";
          if(e.type == "CONTENEDOR COMPARTIDO"){
            quantity_clients = "Varios clientes";
            template += `
              <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" idcontainer="${e.id}" item-container="${i}">
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cImg">
                  <img src="${pathimgcont}" alt="">
                </div>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cDesc">
                  <p><span>${e.type}</span><span>(${e.prefix})</span></p>
                  <span>${e.quantity_containers} - ${quantity_clients}</span>
                </div>
              </div>
            `;        
          }else{
            quantity_clients = "Un cliente";
            template += `
              <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" idcontainer="${e.id}" item-container="${i}">
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cImg">
                  <img src="${pathimgcont}" alt="">
                </div>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cDesc">
                  <p><span>${e.type}</span><span>(${e.prefix})</span></p>
                  <span>${e.quantity_containers} - ${quantity_clients}</span>
                </div>
              </div>
            `;
          }       
        }else{
          name_two = " ó "+e.name_two;
          if(e.type == "CONTENEDOR COMPARTIDO"){
            quantity_clients = "Varios clientes";
            template += `
              <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" idcontainer="${e.id}" item-container="${i}">
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cImg">
                  <img src="${pathimgcont}" alt="">
                </div>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cDesc">
                  <p><span>${e.type}</span><span>(${e.prefix})</span><span>${name_two}</span></p>
                  <span>${e.quantity_containers} - ${quantity_clients}</span>
                </div>
              </div>
            `;        
          }else{
            quantity_clients = "Un cliente";
            template += `
              <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" idcontainer="${e.id}" item-container="${i}">
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cImg">
                  <img src="${pathimgcont}" alt="">
                </div>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item--cDesc">
                  <p><span>${e.type}</span><span>(${e.prefix})</span></p>
                  <span>${e.quantity_containers} - ${quantity_clients}</span>
                </div>
              </div>
            `;
          }
        }
      });
      $("#cont-containOptsContainers").html(template);      
    }
  });
}
/************************** MOSTRAR EL MODAL DE TIPOS DE CONTENEDORES **************************/
$(document).on("click", "#val-typecontainerflete", function(){
  $("#container-containOptsContainers").toggleClass("show");
});
/************************** MOSTRAR EL MODAL DE - CONTENEDOR (LCL) **************************/
$(document).on("click", `.c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item`, function(){
  var itemcontainer = $(this).attr('item-container');
  var idtypecontainer = $(this).attr("idcontainer");
  if(itemcontainer == 0){
    var tipocontainer = $(this).find("div").find("p").find("span:first-child").text();
    $("#val-typecontainerflete").text(tipocontainer.toLowerCase());
    $("#val-typecontainerflete").attr("typecontainer", tipocontainer.toLowerCase());
    $("#val-typecontainerflete").attr("idtypecontainer", idtypecontainer);
  }else{
    var tipocontainer = $(this).find("div").find("p").find("span:first-child").text();
    $("#val-typecontainerflete").text(tipocontainer.toLowerCase());
    $("#val-typecontainerflete").attr("typecontainer", tipocontainer.toLowerCase());
    $("#val-typecontainerflete").attr("idtypecontainer", idtypecontainer);

    $("#container-containOptsContainers").addClass("activeItem");
    $("#cont-fillDatabyContain").addClass("show");
  }
});
/************************** LISTAR LOS VALORES DE LAS UNIDADES DE MEDIDA DE PESO **************************/
function list_typ_measurement_units(){
  $.ajax({
    url: "controllers/list_mass_units.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `<option><span>No se econtraron resultados</span></option>`;
      $("#valinput-peso").html(template);
    }else{
      $.each(response, function(i, e) {
        var prefix = e.prefix;
        var prefixFinalWriting = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        template += `<option id="${e.id}" prefixmassUnit="${prefixFinalWriting}">${e.unit}</option>`;
      });
      $("#valinput-peso").html(template);
    }
  });
}
/************************** LISTAR LOS VALORES DE LAS UNIDADES DE MEDIDA DEL VOLUMEN **************************/
function list_typ_volume_units(){
  $.ajax({
    url: "controllers/list_volume_units.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `<option><span>No se econtraron resultados</span></option>`;
      $("#valinput-volumen").html(template);
    }else{
      $.each(response, function(i, e) {
        template += `<option id="${e.id}" prefixvolumeUnit="${e.prefix}">${e.unit}</option>`;
      });
      $("#valinput-volumen").html(template);
    }
  });
}
/************************** OBTENER Y FIJAR EL VALOR DEL PREFIJO EN EL SMALL DE VOLUMEN **************************/
$("#valinput-peso").on("change", function(){
  var thisWPSelectedOpt = $("#valinput-peso option:selected").attr("prefixmassUnit");
  $("#small-valWPrefixCalcReqModal").text(thisWPSelectedOpt);
});
/************************** OBTENER Y FIJAR EL VALOR DEL PREFIJO EN EL SMALL DE VOLUMEN **************************/
$("#valinput-volumen").on("change", function(){
  var thisVPSelectedOpt = $("#valinput-volumen option:selected").attr("prefixvolumeUnit");
  $("#small-valVPrefixCalcReqModal").text(thisVPSelectedOpt);
});
/************************** CERRAR EL MODAL DE LOS TIPOS DE CONTENEDORES **************************/
$(document).on("click", "#btn-backToModalContainers", function(){
  $("#container-containOptsContainers").removeClass("show");
});
$(document).on("click", "#btn-saveToModalContainers", function(){
  if($("#val-CalcPacksRequestModal").val() != "" && $("#val-CalcWeightRequestModal").val() != "" && $("#val-CalcVolumeRequestModal").val() != ""){
    /************************** DEVOLVER LOS VALORES AL PRIMER MODAL **************************/
    var valCalcNewPMCont = $("#val-CalcPacksRequestModal").val();
    var valCalcNewWMCont = $("#val-CalcWeightRequestModal").val();
    var valCalcNewVMCont = $("#val-CalcVolumeRequestModal").val();
    var valPrefixNewWMCont = $("#val-CalcWeightRequestModal").parent().find("select option:selected").attr("prefixmassunit");
    var valPrefixNewVMCont = $("#val-CalcVolumeRequestModal").parent().find("select option:selected").attr("prefixvolumeunit");
    /************************** FIJAR LOS VALORES EN EL SMALL **************************/
    $("#small-valPCalcReqModal").text(valCalcNewPMCont);
    $("#small-valWCalcReqModal").text(valCalcNewWMCont);
    $("#small-valVCalcReqModal").text(valCalcNewVMCont);
    $("#small-valWPrefixCalcReqModal").text(valPrefixNewWMCont);
    $("#small-valVPrefixCalcReqModal").text(valPrefixNewVMCont);

    /************************** OCULTAR EL MENSAJE DE CONTENEDOR VACÍO **************************/
    $("#msgNounTypeSend-step").text("");

    /************************** SOBREESCRIBIR VALORES DEL LOCALSTORAGE **************************/
    localStorage.setItem("tot_packages", valCalcNewPMCont);
    localStorage.setItem("tot_weight", valCalcNewWMCont);
    localStorage.setItem("tot_volume", valCalcNewVMCont);

    /************************** HABILITAR EL SIGUIENTE CONTROL **************************/
    $("#input-vallistorigin").removeAttr("disabled");

    $("#detail-CalcToModalAssoc").addClass("show");
    $("#container-containOptsContainers").removeClass("show");

  }else{
    $(".cnt-modalFValidateMCont").add($(".cnt-modalFValidateMCont--c").addClass("show")).addClass("show");

    var titleAttrMContainersP = $("#val-CalcPacksRequestModal").parent().find("label").text();
    var titleAttrMContainersW = $("#val-CalcWeightRequestModal").parent().parent().find("label").text();
    var titleAttrMContainersV = $("#val-CalcVolumeRequestModal").parent().parent().find("label").text();  
  }
});
/************************** CERRAR EL MODAL DE VALIDACIÓN DE CONTENDORES - ICON CLOSE **************************/
$(document).on("click", "#btn-closeiconFValidateMCont", function(){
  $(".cnt-modalFValidateMCont").removeClass("show");
});
/************************** CERRAR EL MODAL DE VALIDACIÓN DE CONTENDORES - BUTTON BACK **************************/
$(document).on("click", "#btn-CancelValidateMConts", function(){
  $(".cnt-modalFValidateMCont").removeClass("show");
});
/************************** GUARDAR EL VALOR POR DEFECTO DE LA VALIDACIÓN PARA CONTENEDORES **************************/
$(document).on("click", "#btn-addValidateMConts", function(){
  ($("#val-CalcPacksRequestModal").val() == "") ? $("#val-CalcPacksRequestModal").val(1) : $("#val-CalcPacksRequestModal").val();
  ($("#val-CalcWeightRequestModal").val() == "") ? $("#val-CalcWeightRequestModal").val(1) : $("#val-CalcWeightRequestModal").val();
  ($("#val-CalcVolumeRequestModal").val() == "") ? $("#val-CalcVolumeRequestModal").val(1) : $("#val-CalcVolumeRequestModal").val();

  var valPrefixToNewWMValiCont = $("#val-CalcWeightRequestModal").parent().find("select option:selected").attr("prefixmassunit");
  var valPrefixToNewVMValiCont = $("#val-CalcVolumeRequestModal").parent().find("select option:selected").attr("prefixvolumeunit");
  /************************** FIJAR LOS VALORES EN EL SMALL **************************/
  $("#small-valPCalcReqModal").text(1);
  $("#small-valWCalcReqModal").text(1);
  $("#small-valVCalcReqModal").text(1);
  $("#small-valWPrefixCalcReqModal").text(valPrefixToNewWMValiCont);
  $("#small-valVPrefixCalcReqModal").text(valPrefixToNewVMValiCont);

  /************************** OCULTAR EL MENSAJE DE CONTENEDOR VACÍO **************************/
  $("#msgNounTypeSend-step").text("");

  /************************** SOBREESCRIBIR VALORES DEL LOCALSTORAGE **************************/
  localStorage.setItem("tot_packages", 1);
  localStorage.setItem("tot_weight", 1);
  localStorage.setItem("tot_volume", 1);
  
  $("#detail-CalcToModalAssoc").addClass("show");
  $(".cnt-modalFValidateMCont").removeClass("show");
});

/************************** OBTENER EL VALOR DEL ID DE ORIGEN **************************/
$(document).on("click", `.c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item`, function(){
  $("#input-vallistorigin").attr("aria-expanded", true);
  $("#input-vallistorigin").css({"background-color":"#fff","cursor":"pointer"});
  $("#input-vallistorigin").removeAttr("disabled");
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
      }, 4500);
    }else{
      response.forEach(e => {
      template += `
        <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item" id="${e.idpuerto}" idpaisattr="${e.idpais}">
          <span>${e.pais} - ${e.puerto}</span>
        </li>
        `;
      });
      $("#list-originCountriesandPort").html(template);
    }
  });
}
/************************** BUSQUEDA EN TIEMPO REAL DE PUERTO DE ORIGIN - LCL **************************/
$(document).on("keyup", "#input-vallistorigin", function(){ 

  if($("#val-typecontainerflete").attr("idtypecontainer") && 
    $("#val-CalcPacksRequestModal").val() != "" &&
    $("#val-CalcWeightRequestModal").val() != "" &&
    $("#val-CalcVolumeRequestModal").val() != ""){
    $("#input-vallistorigin").attr("aria-expanded", true);
    $("#input-vallistorigin").css({"background-color":"#fff","cursor":"pointer"});
  }else{
    /************************** VALIDACIÓN AL PUERTO DE ORIGEN **************************/
    alert("Debes seleccionar un tipo  de contenedor");
    $("#input-vallistorigin").val("");
    $("#input-vallistorigin").attr("aria-expanded", false);
    $("#input-vallistorigin").css({"background-color":"#dddd","cursor":"not-allowed"});
    $("#list-originCountriesandPort").html(`
      <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">
        <span>Seleccione contenedor</span>
      </li>
    `);
  }

  if($("#input-vallistorigin").val() == ""){
    /************************** VALIDACIÓN AL PUERTO DE ORIGEN **************************/
    $("#input-vallistorigin").removeAttr("id-puertoorigin");
    $("#input-vallistorigin").removeAttr("id-paispuertoorigin");
    $("#input-vallistorigin").attr("aria-expanded", false);
    /************************** VALIDACIÓN AL PUERTO DE DESTINO **************************/
    $("#input-vallistdestiny").attr("aria-expanded", false);
    $("#input-vallistdestiny").css({"background-color":"#dddd","cursor":"not-allowed"});
    $("#input-vallistdestiny").attr("disabled","disabled");
  }else{
    /************************** VALIDACIÓN AL PUERTO DE ORIGEN **************************/
    $("#input-vallistorigin").attr("aria-expanded", true);
    /************************** VALIDACIÓN AL PUERTO DE DESTINO **************************/
    $("#input-vallistdestiny").attr("aria-expanded", true);
    $("#input-vallistdestiny").css({"background-color":"#fff","cursor":"pointer"});
    $("#input-vallistdestiny").removeAttr("disabled");
  }

  $("#list-originCountriesandPort").addClass("show");
  var searchVal = $(this).val();
  if(searchVal != ""){
    list_puertoOriginLCL(searchVal);
  }else{
    list_puertoOriginLCL();
  }
});
/************************** FOCUS EN EL INPUT DE ORIGEN **************************/
$("#input-vallistorigin").focus(function(){
  if($("#val-typecontainerflete").attr("idtypecontainer") && 
    $("#val-CalcPacksRequestModal").val() != "" &&
    $("#val-CalcWeightRequestModal").val() != "" &&
    $("#val-CalcVolumeRequestModal").val() != ""){
    $("#input-vallistorigin").attr("aria-expanded", true);
    $("#input-vallistorigin").css({"background-color":"#fff","cursor":"pointer"});
    $("#input-vallistorigin").removeAttr("disabled");
  }else{
    /************************** VALIDACIÓN AL PUERTO DE ORIGEN **************************/
    alert("Debes seleccionar un tipo  de contenedor");
    $("#input-vallistorigin").attr("aria-expanded", false);
    $("#input-vallistorigin").css({"background-color":"#dddd","cursor":"not-allowed"});
    $("#input-vallistorigin").attr("disabled","disabled");
  }
});
/************************** FIJAR EL VALOR DEL PUERTO EN EL INPUT **************************/
$(document).on("click", "#list-originCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){ 
  $("#list-originCountriesandPort").removeClass("show");
  $("#input-vallistorigin").attr("id-puertoorigin", $(this).attr("id"));
  $("#input-vallistorigin").attr("id-paispuertoorigin", $(this).attr("idpaisattr"));
  $("#input-vallistorigin").val($(this).find("span").text());

  /************************** GUARDAR INFO. EN LOCALSTORAGE **************************/
  localStorage.setItem("port_OId", $(this).attr("id"));
  localStorage.setItem("port_OName", $(this).find("span").text());
});

/************************** VARIABLE DE PAÍS DE ORIGEN **************************/
var idCountryOrigin = 0;

/************************** OBTENER EL VALOR DEL ID DE ORIGEN **************************/
$(document).on("click", "#list-originCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){
  idCountryOrigin = $(this).attr("idpaisattr");
  return idCountryOrigin;
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

/*==========================================================================================================
=            PASO 2.1. AVANZAR AL PASO 2.1 AL HACER CLICK EN EL BOTÓN DE "SIGUIENTE" DEL PASO 2            =
===========================================================================================================*/
$(document).on("click", "#btn-ValidToshowNextStep", function(){
  
  if($("#val-typecontainerflete").attr("idtypecontainer") && 
    $("#val-CalcPacksRequestModal").val() != "" &&
    $("#val-CalcWeightRequestModal").val() != "" &&
    $("#val-CalcVolumeRequestModal").val() != "" &&
    $("#input-vallistorigin").attr("id-puertoorigin") &&
    $("#input-vallistdestiny").attr("id-puertodestiny")){

    /************************** LOADER PARA HABILITAR LA SIGUIENTE FASE **************************/
    $("#portfolio").append(`
      <div id="loader-clasic-op85">
        <div class="loader-clasic-op85--c"></div>
      </div>
    `);

    setTimeout(function(){
      $("#loader-clasic-op85").remove();
    }, 1100);

    $("#step-TwoPointOne").addClass("show");
    $("#step-TwoPointOne").removeClass("hide step-hidden");
    
    $("#step-TwoPointOne").html(`
      <div class="box-container">
        <div class="c-SelServicesOrNotStep--contStep--cTitle">
          <h3 class="c-SelServicesOrNotStep--contStep--cTitle--title">2.1 Elige una opción</h3>
        </div>
        <div class="c-SelServicesOrNotStep--contStep--cOptionsServices">
          <ul class="c-SelServicesOrNotStep--contStep--cOptionsServices--m" id="c-listItemsSelRs">
            <li class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--item" id="c-listItemsSelRs--withS">
              <a href="#" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link">
                <p>OPCIÓN 1</p>
                <div class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--cControl">
                  <input type="radio" id="chk-optServSel-1" name="chk-optServSel-1" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--check">
                  <label for="chk-optServSel-1">AGREGAR SERVICIOS DE ADUANA EN DESTINO</label>
                </div>
              </a>
            </li>
            <li class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--item" id="c-listItemsSelRs--withoutS">
              <a href="#" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link">
                <p>OPCIÓN 2</p>
                <div class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--cControl">
                  <input type="radio" id="chk-optServSel-2" name="chk-optServSel-2" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--check">
                  <label for="chk-optServSel-2">NO AGREGAR SERVICIOS "SOLO DESEEO FLETE"</label>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    `);

    if(!document.querySelector("#step-TwoPointOne").classList.contains("hide") && !document.querySelector("#step-TwoPointOne").classList.contains("step-hidden")){
      $("#btn-ValidToshowNextStep").remove();
    }
  }else{
    alert("Completa los campos primero");
  }
});

/************************** VALIDAR EL CLICK DE ACUERDO AL CHECK QUE SE SELECCIONA **************************/
$(document).on("click", "#c-listItemsSelRs li", function(e){
  e.preventDefault();
  var itemsSelOpt = $(this);
  $.each(itemsSelOpt, function(i, e){
    var indexItemSel = itemsSelOpt.index();
    if(indexItemSel == 0){
      
      /************************** OCULTAR LOS DEMÁS PASOS **************************/
      $("#step-Two").add($("#step-TwoPointOne").removeClass("show")).removeClass("show");
      $("#step-Two").add($("#step-TwoPointOne").addClass("hide step-hidden")).addClass("hide step-hidden");
      /************************** LOADER PARA HABILITAR LA SIGUIENTE FASE **************************/
      $("#portfolio").append(`
        <div id="loader-clasic-op100">
          <div class="loader-clasic-op100--c"></div>
        </div>
      `);
      setTimeout(function(){
        $("#loader-clasic-op100").remove();
      }, 1100);

      /************************** GENERAR EL PASO SIGUIENTE - SELECCIONAR SERVICIOS EXTRA **************************/
      $("#frm_cotizacion").html(`
        <div id="step-Three" class="c-SelServicesQuantity--contStep">
        <div class="box-container">
          <div class="c-SelServicesQuantity--contStep--cTop">
            <button type="button" class="c-SelServicesQuantity--contStep--cTop--btnBackStep" id="btn-backStep-cancel">VOLVER</button>
            <div class="c-SelServicesQuantity--contStep--cTop--calcSummary">
              <h3 class="c-SelServicesQuantity--contStep--cTop--calcSummary--title">Resumen de Ruta</h3>
              <p class="c-SelServicesQuantity--contStep--cTop--calcSummary--text"><b>Flete Marítimo</b></p>
              <p class="c-SelServicesQuantity--contStep--cTop--calcSummary--text">
                <span>CHINA - QINGDAO</span>
                <span>&#8594;</span>
                <span>PERÚ - CALLAO</span>
              </p>
              <p class="c-SelServicesQuantity--contStep--cTop--calcSummary--text"><b>1 Bulto de 3000 Kg y 1.08 M³</b></p>
            </div>
            <div class="c-SelServicesQuantity--contStep--cBottom">
              <div class="c-SelServicesQuantity--contStep--cBottom--cTitle">
                <h3 class="c-SelServicesQuantity--contStep--cBottom--cTitle--title">PASO 3. Agrega Servicios Adicionales</h3>
              </div>
              <div class="c-SelServicesQuantity--contStep--cBottom--cSelAllRadOrNot">
                <p class="c-SelServicesQuantity--contStep--cBottom--cSelAllRadOrNot--desc">
                  <span>Selecciona 1 o </span>
                  <a href="#">MÁS</a>
                  <span>Servicios adicionales</span>
                </p>
              </div>
              <div class="c-SelServicesQuantity--contStep--cBottom--cListServices">
                <ul class="c-SelServicesQuantity--contStep--cBottom--cListServices--m" id="m-listseleted-services">
                  <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                    <label for="service-item-1" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                      <input type="checkbox" id="service-item-1" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                        <img src="views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-003.png" alt="">
                      </div>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text">Gastos Portuarios de Almacenamiento Aduanero</span>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                    </label>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                    <label for="service-item-2" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                      <input type="checkbox" id="service-item-2" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                        <img src="views/assets/img/linea_tiempo/ADUANA-002.png" alt="">
                      </div>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text"><b>Cálculo de impuesto y permisos de aduana</b></span>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                    </label>
                    <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont" id="cont-selTwoOptsServicesFill">
                      
                    </div>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                    <label for="service-item-3" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                      <input type="checkbox" id="service-item-3" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                        <img src="views/assets/img/linea_tiempo/TRANSPORTE-002.png" alt="">
                      </div>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text">Transporte a domicilio</span>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                    </label>
                    <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont" id="cont-selThreeOptsServicesFill"></div>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                    <label for="service-item-4" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                      <input type="checkbox" id="service-item-4" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                        <img src="views/assets/img/linea_tiempo/TRANSPORTE-002.png" alt="">
                      </div>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text">Seguro de mercancía</span>
                      <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                    </label>
                  </li>
                </ul>
                <button type="button" class="c-SelServicesQuantity--contStep--cBottom--cListServices--btnAddCotizationS">CALCULAR COTIZACIÓN</button>
              </div>
            </div>
            <div class="c-SelServicesQuantity--contStep--cLogisticChain" id="line-InfoLogisticChain">
              <p class="c-SelServicesQuantity--contStep--cLogisticChain--title">CADENA LOGÍSTICA</p>
              <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain">
                <ul class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m">
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cIcon">
                      <img src="views/assets/img/linea_tiempo/FABRICA-DE-ORIGEN-001.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--txt">FÁBRICA PROVEEDOR</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cIcon">
                      <img src="views/assets/img/linea_tiempo/TRANSPORTE-001.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--txt">TRANSPORTE EN ORIGEN</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cIcon">
                      <img src="views/assets/img/linea_tiempo/ADUANA-001.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--txt">ADUANA EN ORIGEN</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cIcon">
                      <img src="views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-001.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--item--txt">PUERTO EN ORIGEN</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep selStepComplete">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cIcon selIconComplete">
                      <img src="views/assets/img/linea_tiempo/fleteMaritimo.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine selLineComplete">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine--circleL selCircleLComplete"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--txt">FLETE MARÍTIMO</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cIcon">
                      <img src="views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-002.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--txt">PUERTO Y ALMACEN DE DESTINO</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cIcon">
                      <img src="views/assets/img/linea_tiempo/ADUANA-003.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--txt">ADUANA DESTINO</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cIcon">
                      <img src="views/assets/img/linea_tiempo/TRANSPORTE-003.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--txt">TRANSPORTE DESTINO</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cIcon">
                      <img src="views/assets/img/linea_tiempo/ALMACEN-003.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--txt">ALMACEN IMPORTADOR</small>
                  </li>
                  <li class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep">
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cIcon">
                      <img src="views/assets/img/linea_tiempo/fleteMaritimo.png" alt="">
                    </div>
                    <div class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine">
                      <span class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--cLine--circleL"></span>
                    </div>
                    <small class="c-SelServicesQuantity--contStep--cLogisticChain--cInfoLogisticChain--m--itemCurrStep--txt">SEGURO DE MERCANCÍA</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      `);
    }else{
      alert("Mostrar directamente el detalle de cotización y que el usuario descargue el PDF.");
    }
  });
});
/************************** SELECCIONAR CADA ITEM DEL LISTADO DE CHECKBOXS **************************/
$(document).on("click", "#m-listseleted-services li", function(){
  var itemServicesSel = $(this);
  var itemServicesSelinput = $(this).find("label").find("input");

  var indexServicesSel = itemServicesSel.index();
  if(itemServicesSelinput.is(":checked")){
    $(this).find("label").find("span.c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck").html(`
        <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 125"><g transform="translate(0,-952.36218)"><path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" d="m 44.97403,963.37302 c -2.840184,0.072 -5.693944,0.4522 -8.5,1.1562 -20.857032,5.2334 -33.5458917,26.48676 -28.3125,47.34378 5.23332,20.857 26.455468,33.5458 47.3125,28.3125 20.85703,-5.2333 33.5459,-26.4555 28.3125,-47.31252 a 3.0002999,3.0002999 0 1 0 -5.78125,1.4688 c 4.44412,17.71182 -6.28807,35.58702 -24,40.03122 -17.711856,4.4442 -35.6183,-6.2569 -40.0625,-23.9688 -4.444128,-17.71182 6.288072,-35.61832 24,-40.06238 9.500832,-2.384 19.55487,-0.4287 27.46875,5.34366 a 3.0002999,3.0002999 0 1 0 3.53125,-4.81246 c -7.01186,-5.1146 -15.44827,-7.7172 -23.96875,-7.5 z m 44.875,1.9375 a 3.0003,3.0003 0 0 0 -2.03125,0.9687 c -10.63829,11.13046 -27.84252,30.07256 -39.03125,41.87498 l -14.8125,-13.06242 a 3.0103986,3.0103986 0 1 0 -4,4.5 l 17,15.00002 a 3.0003,3.0003 0 0 0 4.15625,-0.1563 c 11.17675,-11.6935 29.95443,-32.44352 41,-43.99998 a 3.0003,3.0003 0 0 0 -2.28125,-5.125 z"  fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"/></g></svg>
    `);
  }else{
    $(this).find("label").find("span.c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck").html("");
  }

  /************************** CONTENIDO DEL ELEMENTO 2 - SERVICIO 2 **************************/
  if(indexServicesSel == 1 && $("#service-item-2").is(":checked")){
    $("#cont-selTwoOptsServicesFill").html(`
      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c">
        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control">
          <input type="text" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--input" placeholder="Producto" id="ipt-ListProductRequestAll">
          <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList" id="cont-showSListAllTProducts">
            <ul class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m">
              <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m--item">
                <p>ADITIVOS ALIMENTICIOS</p>
                <small><span>Regulador</span><span>MINAGRI / SENASA</span></small>
              </li>
              <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m--item">
                <p>AGRICULTURA(FRUTAS Y VEGETALES)</p>
                <small><span>Regulador</span><span>SENASA</span></small>
              </li>
              <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m--item">
                <p>AIRE ACONDICIONADO</p>
                <small><span>Regulador</span><span>OTO / OFICINA TÉCNICA DEOZO</span></small>
              </li>
              <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m--item">
                <p>ADITIVOS ALIMENTICIOS</p>
                <small><span>Regulador</span><span>MINAGRI / SENASA</span></small>
              </li>
              <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m--item">
                <p>AGRICULTURA(FRUTAS Y VEGETALES)</p>
                <small><span>Regulador</span><span>SENASA</span></small>
              </li>
              <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--cList--m--item">
                <p>AIRE ACONDICIONADO</p>
                <small><span>Regulador</span><span>OTO / OFICINA TÉCNICA DEOZO</span></small>
              </li>
            </ul>
          </div>
          <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--spanAlertMsg">Si tu producto NO APARECE, elegir CARGA GENERAL</span>
        </div>
        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control">
          <input type="text" id="ipt-valueProductRequest" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--input" placeholder="Valor de mercancía $" maxlength="13">
          <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c--control--spanAlertMsg">Ingrese valor exacto, SIN DECIMALES</span>
        </div>
      </div>
      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--cOneItem">
        <select name="" id="" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--cOneItem--select">
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
        <span>¿Ha realizado importaciones previamente?</span>
      </div>
    `);
  }else{
    $("#cont-selTwoOptsServicesFill").html("");
  }

  /************************** CONTENIDO DEL ELEMENTO 3 - SERVICIO 3 **************************/
  if(indexServicesSel == 2 && $("#service-item-3").is(":checked")){
    $("#cont-selThreeOptsServicesFill").html(`
      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50">
      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control">
        <input type="text" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--input" placeholder="Provincia" id="ipt-ListProvinciasByCountryRequestAll">
        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList" id="cont-showSListAllProvinciasByCountry">
          <ul class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m">
            <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m--item">
              <p>LIMA</p>
              <small><span>País:</span><span>Perú</span></small>
            </li>
            <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m--item">
              <p>HUANCAVELICA</p>
              <small><span>País:</span><span>Perú</span></small>
            </li>
            <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m--item">
              <p>PUNO</p>
              <small><span>País:</span><span>Perú</span></small>
            </li>
          </ul> 
        </div>
        <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--spanAlertMsg">Debe seleccionar la provincia</span>
      </div>
      <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control">
        <input type="text" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--input" placeholder="Distrito" id="ipt-ListDistritosByProvinciasRequestAll">
        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList" id="cont-showSListAllDistritosByProvincias">
          <ul class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m">
            <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m--item">
              <p>LIMA</p>
              <small><span>País:</span><span>Perú</span></small>
            </li>
            <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m--item">
              <p>HUANCAVELICA</p>
              <small><span>País:</span><span>Perú</span></small>
            </li>
            <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--cList--m--item">
              <p>PUNO</p>
              <small><span>País:</span><span>Perú</span></small>
            </li>
          </ul> 
        </div>
        <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont--c50--control--spanAlertMsg">Debe seleccionar el distrito</span>
      </div>
    </div>
    `);
  }else{
    $("#cont-selThreeOptsServicesFill").html("");
  }
});
/************************** MOSTRAR EL LISTADO DE TIPOS DE PRODUCTOS **************************/
//$(document).on("focus", "#ipt-ListProductRequestAll", function(){$("#cont-showSListAllTProducts").addClass("show");});
//$(document).on("blur", "#ipt-ListProductRequestAll", function(){$("#cont-showSListAllTProducts").removeClass("show");});
$(document).on("keyup", "#ipt-ListProductRequestAll", function(){$("#cont-showSListAllTProducts").addClass("show");});

/************************** VALIDAR INPUT - VALOR DE PRODUCTO IMPORTADO **************************/
$(document).on("input", "#ipt-valueProductRequest", function(e){
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
     return false;
  }else{
      //limit length but allow backspace so that you can still delete the numbers.
      if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
          return false;
      }
  }

  let value = e.target.value;
  e.target.value = value.replace(/[^A-Z\d-]/g, "");
  $(this).val(function(i, v) {
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".") + " USD";
  });
});
$(document).on("keyup", "#ipt-valueProductRequest", function(){
  if($(this).val() == "" || $(this).val() == 0 || $(this).val() == " USD" || $(this).val() == ".00" || $(this).val() == 0.00){
    $(this).val("");
  }
});

/*==========================================================================================================
=                               CANCELAR EL PROCESO DESDE EL PUNTO O PASO 3                                =
==========================================================================================================*/
/************************** CANCELAR LA OPERACIÓN Y VOLVER A LOS PASOS ANTERIORES **************************/
$(document).on("click", "#btn-backStep-cancel", function(){
  alert("¿Seguro que deseas volver?");
  
  /************************** OCULTAR EL CONTENIDO DE ELEGIR SERVICIOS **************************/
  $("#step-Three").addClass("hide step-hidden");
  /************************** LOADER PARA HABILITAR LA SIGUIENTE FASE **************************/
  $("#portfolio").append(`
    <div id="loader-clasic-op100">
      <div class="loader-clasic-op100--c"></div>
    </div>
  `);
  setTimeout(function(){
    $("#loader-clasic-op100").remove();
  }, 1100);
  /************************** LISTAR LOS TIPOS DE CONTENEDORES, UNIDADES DE PESO Y UNIDADES DE VOLUMEN **************************/
  list_typ_containers();
  list_typ_measurement_units();
  list_typ_volume_units();
  /************************** GENERAR NUEVAMENTE LA ESTRUCTURA DE LOS PASOS 2 Y 2.1 **************************/
  $("#frm_cotizacion").html(`
    <!------------------------------------------ SEGUNDA FASE - PASO 2 (INICIO) ----------------------------------->
    <div id="step-Two" class="c-CalculatorStep--form--contStep show">
      <div class="box-container">
        <div class="c-CalculatorStep--form--contStep--cTitledesconly">
          <h3 class="c-CalculatorStep--form--contStep--cTitledesconly--desc">PASO 2. Indica Ruta y Tipo de Contenedor</h3>
        </div>
        <div class="c-CalculatorStep--form--contStep--cStepSelects">
          <div class="c-CalculatorStep--form--contStep--cStepSelects--item">
            <p class="c-CalculatorStep--form--contStep--cStepSelects--item--title">Tipo envío</p>
            <button type="button" id="val-typecontainerflete" class="c-CalculatorStep--form--contStep--cStepSelects--item--fakeselbtn">Elija una opción</button>
            <span id="msgNounTypeSend-step"></span>
            <small id="detail-CalcToModalAssoc">
              <span>Bultos = <span id="small-valPCalcReqModal"></span>,&nbsp;</span>
              <span>Peso = <span id="small-valWCalcReqModal"></span>&nbsp;<span id="small-valWPrefixCalcReqModal"></span>,&nbsp;</span>
              <span>Volumen = <span id="small-valVCalcReqModal"></span>&nbsp;<span id="small-valVPrefixCalcReqModal"></span></span>
            </small>
            <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts" id="container-containOptsContainers">
              <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c" id="cont-containOptsContainers"></div>
              <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer" id="cont-fillDatabyContain">
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
                  <label for="">BULTOS</label>
                  <input type="number" value="1" placeholder="Ingrese nro. de bultos" id="val-CalcPacksRequestModal">
                </div>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
                  <label for="">PESO</label>
                  <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl--twocontrols">
                    <input type="number" placeholder="Ingrese peso" id="val-CalcWeightRequestModal">
                    <select name="" id="valinput-peso"></select>
                  </div>
                </div>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
                  <label for="">VOLUMEN</label>
                  <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl--twocontrols">
                    <input type="number" placeholder="Ingrese volumen" id="val-CalcVolumeRequestModal">
                    <select name="" id="valinput-volumen"></select>
                  </div>
                </div>
                <a href="#" id="Add-fromcalculatorModal" class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--linkModalDatas">AYUDA - CALCULA VOLUMEN (m3) AQUÍ</a>
                <div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cbtnsActs">
                  <a href="#" id="btn-backToModalContainers">VOLVER</a>
                  <button type="button" id="btn-saveToModalContainers">GUARDAR</button>
                </div>
              </div>
            </div>
          </div>
          <div class="c-CalculatorStep--form--contStep--cStepSelects--item">
            <p class="c-CalculatorStep--form--contStep--cStepSelects--item--title">Origen</p>
            <input type="text" placeholder="ESCRIBA País, Ciudad o Puerto" id="input-vallistorigin">
            <span id="msgNounOriginSend-step"></span>
            <div class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems">
              <ul class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list" id="list-originCountriesandPort"></ul>
            </div>
          </div>
          <div class="c-CalculatorStep--form--contStep--cStepSelects--item">
            <p class="c-CalculatorStep--form--contStep--cStepSelects--item--title">Destino</p>
            <input type="text" placeholder="País, Ciudad o Puerto" id="input-vallistdestiny">
            <span id="msgNounDestinySend-step"></span>
            <div class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems">
              <ul class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list" id="list-destinyCountriesandPort">
                <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">Selecciona un contenedor</li>
              </ul>
            </div>
          </div>
          <div class="c-CalculatorStep--form--contStep--cStepSelects--item">
            <button type="button" id="btn-ValidToshowNextStep" class="c-CalculatorStep--form--contStep--cStepSelects--item--nextbtn">SIGUIENTE</button>
          </div>
        </div>        
      </div>
    </div>
    <!------------------------------------------ TERCERA FASE - PASO 2.1 (INICO) --------------------------------->
    <div id="step-TwoPointOne" class="c-SelServicesOrNotStep--contStep show"></div>
  `);
  /************************** MOSTRAR EL MENSAJE DE CONTENEDOR VACÍO **************************/
  $("#msgNounTypeSend-step").text("Debe escoger tipo de envío");
  /************************** OBTENER Y FIJAR EL VALOR DEL PREFIJO EN EL SMALL DE VOLUMEN **************************/
  $("#valinput-peso").on("change", function(){
    var thisWPSelectedOpt = $("#valinput-peso option:selected").attr("prefixmassUnit");
    $("#small-valWPrefixCalcReqModal").text(thisWPSelectedOpt);
  });
  /************************** OBTENER Y FIJAR EL VALOR DEL PREFIJO EN EL SMALL DE VOLUMEN **************************/
  $("#valinput-volumen").on("change", function(){
    var thisVPSelectedOpt = $("#valinput-volumen option:selected").attr("prefixvolumeUnit");
    $("#small-valVPrefixCalcReqModal").text(thisVPSelectedOpt);
  });
  /************************** LIMPIAR CUALQUIER TIPO DE VALOR ANTES INGRESADO QUE COMPROMETA DATO IMPORTANTES **************************/

});
/*==========================================================================================
=            CONTENIDO Y VALIDACIÓN DE TODOS LOS CONTROLES EN LOS PASOS 2 Y 2.1            =
==========================================================================================*/