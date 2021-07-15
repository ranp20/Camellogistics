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
													<input type="checkbox" id="">
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
													<input type="checkbox" id="">
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
													<input type="checkbox" id="">
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
													<input type="checkbox" id="">
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