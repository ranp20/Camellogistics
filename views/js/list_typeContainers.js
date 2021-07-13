$(function(){
	list_typ_containers();
	list_typ_measurement_units();
	list_typ_volume_units();
});
/************************** MOSTRAR LOS TIPOS DE CONTENEDORES EN EL MODAL DE TIOS DE CONTENEDORES **************************/
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
			      	<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" id="container-${e.id}" item-container="${i}">
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
			      	<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" id="container-${e.id}" item-container="${i}">
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
			      	<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" id="container-${e.id}" item-container="${i}">
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
			      	<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--c--item" id="container-${e.id}" item-container="${i}">
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
	if(itemcontainer == 0){
		var tipocontainer = $(this).find("div").find("p").find("span:first-child").text();
		$("#val-typecontainerflete").text(tipocontainer.toLowerCase());
		$("#val-typecontainerflete").attr("typecontainer", tipocontainer.toLowerCase());
	}else{
		var tipocontainer = $(this).find("div").find("p").find("span:first-child").text();
		$("#val-typecontainerflete").text(tipocontainer.toLowerCase());
		$("#val-typecontainerflete").attr("typecontainer", tipocontainer.toLowerCase());

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

		$("#detail-CalcToModalAssoc").addClass("show");
		$("#container-containOptsContainers").removeClass("show");

	}else{
		$(".cnt-modalFValidateMCont").add($(".cnt-modalFValidateMCont--c").addClass("show")).addClass("show");

		var titleAttrMContainersP = $("#val-CalcPacksRequestModal").parent().find("label").text();
		var titleAttrMContainersW = $("#val-CalcWeightRequestModal").parent().parent().find("label").text();
		var titleAttrMContainersV	= $("#val-CalcVolumeRequestModal").parent().parent().find("label").text();	
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
	
	$(".cnt-modalFValidateMCont").removeClass("show");
});