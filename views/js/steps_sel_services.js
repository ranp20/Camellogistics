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
/************************** VOLVER A GENERAR LOS PASOS ANTERIORES **************************/
$(document).on("click", "#btn-backStep-cancel", function(){
	alert("¿Seguro que deseas volver?");
	$("#step-Three").addClass("hide step-hidden");

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
});
/*==========================================================================================
=            CONTENIDO Y VALIDACIÓN DE TODOS LOS CONTROLES EN LOS PASOS 2 Y 2.1            =
==========================================================================================*/