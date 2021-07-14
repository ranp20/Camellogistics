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
			<div id="loader-clasic">
				<div class="loader-clasic--c"></div>
			</div>
		`);

		setTimeout(function(){
			$("#loader-clasic").remove();
		}, 1100);

		$("#step-Three").removeClass("hide step-hidden");
		$("#step-Three").append(`
			<div class="box-container">
				<div class="c-SelServicesOrNotStep--contStep--cTitle">
					<h3 class="c-SelServicesOrNotStep--contStep--cTitle--title">2.1 Elige una opción</h3>
				</div>
				<div class="c-SelServicesOrNotStep--contStep--cOptionsServices">
					<ul class="c-SelServicesOrNotStep--contStep--cOptionsServices--m" id="m-stepThreeListChk">
						<li class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--item">
							<a href="#" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link">
								<p>OPCIÓN 1</p>
								<div class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--cControl">
									<input type="radio" id="chk-optServSel-1" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--check">
									<label for="chk-optServSel-1">AGREGAR SERVICIOS DE ADUANA EN DESTINO</label>
								</div>
							</a>
						</li>
						<li class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--item">
							<a href="#" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link">
								<p>OPCIÓN 2</p>
								<div class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--cControl">
									<input type="radio" id="chk-optServSel-2" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--check">
									<label for="chk-optServSel-2">NO AGREGAR SERVICIOS "SOLO DESEEO FLETE"</label>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		`);
		if(!document.querySelector("#step-Three").classList.contains("hide") && !document.querySelector("#step-Three").classList.contains("step-hidden")){
			$("#btn-ValidToshowNextStep").remove();
		}
	}else{
		alert("Completa los campos primero");
	}
});
/************************** VALIDAR EL CLICK DE ACUERDO AL CHECK QUE SE SELECCIONA **************************/
$(document).on("click", "#m-stepThreeListChk li", function(){
	alert($(this));
});