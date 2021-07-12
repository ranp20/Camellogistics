/************************** LOADER EN LA WEB **************************/
window.addEventListener('load', function(){
  const loadcli = document.querySelector('#cont-loader');
  loadcli.className += ' hidden';
})

$(function(){
	list_typ_services();
	list_typ_containers();
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
/*========================================================================================
=            AVANZAR AL SIGUIENTE PASO AL HACER CLICK EN UNO DE LOS SERVICIOS            =
=========================================================================================*/
$(document).on("click", ".c-CalculatorStep--form--contStep--cStep--m--item a", function(){
	var typeService = $(this).attr("id");
	if(typeService == "MARÍTIMO"){
		$("#step-One").addClass('hide step-hidden');
		$("#step-Two").addClass('show').removeClass('step-hidden').removeClass('hide');
		var selService = localStorage.setItem("type_service", typeService);

		//INFORMACIÓN DE LAS ACCIONES DEL USUARIOS...
		var stepOne_LocalStorage = localStorage.setItem("stepOne", true);
		var stepTwo_LocalStorage = localStorage.setItem("stepTwo", false);
		var stepThree_LocalStorage = localStorage.setItem("stepThree", false);
		var stepFour_LocalStorage = localStorage.setItem("stepFour", false);
		
	}else{
		console.log('Esta ópcion aún no está disponible');
	}
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