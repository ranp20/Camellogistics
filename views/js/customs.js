/************************** LOADER EN LA WEB **************************/
window.addEventListener('load', function(){
  const loadcli = document.querySelector('#cont-loader');
  loadcli.className += ' hidden';
})
/*========================================================================================
=            PASO 1. AVANZAR AL SIGUIENTE PASO AL HACER CLICK EN UNO DE LOS SERVICIOS            =
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