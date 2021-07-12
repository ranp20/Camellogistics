$(function(){
	list_typ_containers();
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