/************************** LOADER EN LA WEB **************************/
window.addEventListener('load', function(){
  const loadcli = document.querySelector('#cont-loader');
  loadcli.className += ' hidden';
})
/*================================================================================================
=            PASO 1. AVANZAR AL SIGUIENTE PASO AL HACER CLICK EN UNO DE LOS SERVICIOS            =
================================================================================================*/
$(document).on("click", ".c-CalculatorStep--form--contStep--cStep--m--item a", function(){
	var typeService = $(this).attr("id");
	if(typeService == "MARÍTIMO"){
		$("#step-One").addClass('hide step-hidden');
		$("#step-Two").addClass('show').removeClass('step-hidden').removeClass('hide');

		/************************** MOSTRAR EL MENSAJE DE CONTENEDOR VACÍO **************************/
		$("#msgNounTypeSend-step").text("Debe escoger tipo de envío");
		/************************** INFORMARCIÓN DE LA ACCIONES DEL USUARIO - LOCALSTORAGE... **************************/
		//#1 . SELECCIONAR EL TIPO DE SERVICIO + PAGES...
		var selService = localStorage.setItem("type_service", typeService);
		var stepOne_LocalStorage = localStorage.setItem("stepOne", true);
		var stepTwo_LocalStorage = localStorage.setItem("stepTwo", false);
		var stepThree_LocalStorage = localStorage.setItem("stepThree", false);
		var stepFour_LocalStorage = localStorage.setItem("stepFour", false);
		//#2 . CREAR LOS VALORES DE CÁLCULO...
		var TotalPackages = localStorage.setItem("tot_packages", 0);
		var TotalWeight = localStorage.setItem("tot_weight", 0);
		var TotalVolume = localStorage.setItem("tot_volume", 0);
		//#3 . CREAR LA INFORMACIÓN DE PUERTOS DE ORIGEN Y DESTINO...
		var portOriginId = localStorage.setItem("port_OId", 0);
		var portDestinyId = localStorage.setItem("port_DId", 0);
		var portOriginName = localStorage.setItem("port_OName", "");
		var portDestinyName = localStorage.setItem("port_DName", "");

	}else{
		console.log('Esta ópcion aún no está disponible');
	}
});