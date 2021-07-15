$(function(){
  /************************** LISTAR LOS TIPOS DE SERVICIOS **************************/
	list_typ_services();
  /************************** LISTAR: TIPOS DE CONTENEDORES, TIPOS DE UNIDADES DE MEDIDA Y TIPOS DE UNIDADES DE VOLUMEN **************************/
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
                  <ul class="c-SelServicesQuantity--contStep--cBottom--cListServices--m">
                    <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                      <a href="#" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link">
                        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl">
                          <input type="checkbox" id="service-item-1">
                          <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl--cIcon">
                            <img src="views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-003.png" alt="">
                          </div>
                          <label for="">Gastos Portuarios de Almacenamiento Aduanero</label>
                        </div>
                      </a>
                    </li>
                    <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                      <a href="#" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link">
                        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl">
                          <input type="checkbox" id="service-item-2">
                          <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl--cIcon">
                            <img src="views/assets/img/linea_tiempo/ADUANA-002.png" alt="">
                          </div>
                          <label for=""><b>Cálculo de impuestos y permisos de aduana</b></label>
                        </div>
                      </a>
                    </li>
                    <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                      <a href="#" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link">
                        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl">
                          <input type="checkbox" id="service-item-3">
                          <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl--cIcon">
                            <img src="views/assets/img/linea_tiempo/TRANSPORTE-002.png" alt="">
                          </div>
                          <label for="">Transporte a domicilio</label>
                        </div>
                      </a>
                    </li>
                    <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                      <a href="#" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link">
                        <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl">
                          <input type="checkbox" id="service-item-4">
                          <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--link--cControl--cIcon">
                            <img src="views/assets/img/linea_tiempo/TRANSPORTE-002.png" alt="">
                          </div>
                          <label for="">Seguro de mercancía</label>
                        </div>
                      </a>
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
/************************** CANCELAR LA OPERACIÓN Y VOLVER A LOS PASOS ANTERIORES **************************/
$(document).on("click", "#btn-backStep-cancel", function(){
  alert("¿Seguro que deseas volver?");
  
  /************************** OCULTAR EL CONTENIDO DE ELEGIR SERVICIOS **************************/
  $("#step-Three").addClass("hide step-hidden");
  /************************** LISTAR LOS TIPOS DE CONTENEDORES **************************/
  list_typ_containers();
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
    <!------------------------------------------ SEGUNDA FASE - PASO 2 (FIN) ------------------------------------->
    <!------------------------------------------ TERCERA FASE - PASO 2.1 (INICO) --------------------------------->
    <div id="step-TwoPointOne" class="c-SelServicesOrNotStep--contStep show"></div>
    <!------------------------------------------ TERCERA FASE - PASO 2.1 (FIN) ----------------------------------->
  `);
  /************************** MOSTRAR EL MENSAJE DE CONTENEDOR VACÍO **************************/
  $("#msgNounTypeSend-step").text("Debe escoger tipo de envío");
  /************************** LIMPIAR CUALQUIER TIPO DE VALOR ANTES INGRESADO **************************/

});
/*==========================================================================================
=            CONTENIDO Y VALIDACIÓN DE TODOS LOS CONTROLES EN LOS PASOS 2 Y 2.1            =
==========================================================================================*/