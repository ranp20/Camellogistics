<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Calculadora de Envíos | Camel</title>
  <?php require_once 'includes/header-links.php'; ?>
</head>
<body>
  <?php require_once 'api_whatsapp.php'; ?>
  <?php require_once 'includes/header-top.php'; ?>
	<section id="cont-loader">
		<div class="cont-loader--loader">
			<span class="cont-loader--loader--circle"></span>
			<span class="cont-loader--loader--circle"></span>
			<span class="cont-loader--loader--circle"></span>
			<span class="cont-loader--loader--circle"></span>
		</div>
		<p>Cargando...</p>
	</section>
	<!-- style="display:none!important;pointer-events:none!important;" -->
	<section class="mtop-headertop" id="portfolio">
		<?php require_once 'api_whatsapp.php'; ?>
		<form id="frm_cotizacion" method="POST" class="c-CalculatorStep--form">
			<!------------------------------------------ PRIMERA FASE - PASO 1 (INICIO) ----------------------------------->
			<div id="step-One" class="c-CalculatorStep--form--contStep ptop-2"style="display:none!important;pointer-events:none!important;">
				<div class="box-container">
					<div class="c-CalculatorStep--form--contStep--cTitle">
						<h2 class="c-CalculatorStep--form--contStep--cTitle--title b-bottom">¡COTIZA TÚ FLETE!</h2>
						<h3 class="c-CalculatorStep--form--contStep--cTitle--desc">PASO 1. Selecciona el Servicio</h3>
					</div>
					<div class="c-CalculatorStep--form--contStep--cStep">
						<div id="loaderdataUser"></div>
						<ul class="c-CalculatorStep--form--contStep--cStep--m" id="cont-typeServicesOneStep"></ul>
					</div>
				<input type="hidden" id="text_tipo_flete" name="text_tipo_flete" value="">
				</div>
			</div>
			<!------------------------------------------ SEGUNDA FASE - PASO 2 (INICIO) ----------------------------------->
			<div id="step-Two" class="c-CalculatorStep--form--contStep hide step-hidden ptop-2"style="display:none!important;pointer-events:none!important;">
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
			<!------------------------------------------ TERCERA FASE - PASO 2.1 (INICO) ---------------------------------->
			<div id="step-TwoPointOne" class="c-SelServicesOrNotStep--contStep hide step-hidden"style="display:none!important;pointer-events:none!important;"></div>
			<!------------------------------------------- CUARTA FASE - PASO 3 (INICIO - FIN) ----------------------------->
			<!------------------------------------------- QUINTA FASE - PASO 4 (INICIO - FIN) ----------------------------->
			<div id="step-Four" class="c-FinalQuotation--contStep">
				<div class="box-container">
					<div class="c-FinalQuotation--contStep--cTitle">
						<h3 class="c-FinalQuotation--contStep--cTitle--title">PASO 4. PRESUPUESTO</h3>
					</div>
					<div class="c-FinalQuotation--contStep--cQuotation">
						<div class="c-FinalQuotation--contStep--cQuotation--cTop">
							<p class="c-FinalQuotation--contStep--cQuotation--cTop--title">Resumen de carga</p>
							<div class="c-FinalQuotation--contStep--cQuotation--cTop--c">
								<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo">
									<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo">
										<img src="views/assets/img/logotipo-camel.png" alt="">
										<p class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo--info">
											<span>CHINA - QINGDAO</span>
			                <span>&#8594;</span>
			                <span>PERÚ - CALLAO</span>
										</p>
									</div>
									<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cCodeQuotation">
										<p>
											<span>ID:&nbsp;</span>
											<span>30201 - LCL</span>
										</p>
									</div>
								</div>
								<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation">
									<ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m">
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Transporte</span>
												<span>MARÍTIMO</span>
											</div>
										</li>
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Tipo</span>
												<span>CONTENEDOR COMPARTIDO</span>
											</div>
										</li>
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Cantidad</span>
												<span>1 Bulto de 300kg y 1.08 M³</span>
											</div>
										</li>
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Gasto Portuario y Almacenamiento aduanero</span>
												<span>NO</span>
											</div>
										</li>
									</ul>
									<ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m">
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Impuesto de Aduana</span>
												<span>NO</span>
											</div>
										</li>
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Transporte a Domicilio</span>
												<span>NO</span>
											</div>
										</li>
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Seguro de Mercancía</span>
												<span>NO</span>
											</div>
										</li>
										<li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
											<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
												<span>Permiso Gubernamental Adicional</span>
												<span>No Requiere</span>
											</div>
										</li>
									</ul>
								</div>
								<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDudeInfo">
									<p>¿Dudas? - <a href="#">Click Aquí</a></p>
								</div>
								<div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cValidTimeQuotation">
									<p>Validez de tarifa: 12 Jul - 31 Jul</p>
								</div>
							</div>
						</div>
						<div class="c-FinalQuotation--contStep--cQuotation--cBottom">
							<div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise">
								<img src="views/assets/img/logotipo-camel.png" alt="">
								<div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise--info">
									<h3>SERVICIO LOGÍSTICO</h3>
									<span>Valor FIJO</span>
								</div>
							</div>
							<div class="c-FinalQuotation--contStep--cQuotation--cBottom--c">
								<div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails">
									<div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include">
										<p class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--title">Incluye</p>
										<ul class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m">
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
												<span>FLETE MARÍTIMO</span>
											</li>
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
												<span>HANDLING Y MANEJO DESTINO</span>
											</li>
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
												<span>VISTOS BUENOS</span>
											</li>
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
												<span>DESCARGA</span>
											</li>
										</ul>
									</div>
									<div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude">
										<p class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--title">No incluye</p>
										<ul class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m">
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
												<span>ALMACEN ADUANERO</span>
											</li>
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
												<span>HONORARIOS DE AGENCIA DE ADUANA</span>
											</li>
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
												<span>TRANSPORTE A FÁBRICA IMPORTADOR</span>
											</li>
											<li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
												<span>SEGURO DE MERCANCÍA</span>
											</li>
										</ul>
									</div>
								</div>
								<div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--QuantityQuotation">
									<h1>
										<span>930, 00 USD</span>
									</h1>
									<p>+ IGV 18% 59 USD</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- OTHERS DEVELOPERS (INICIO) -->
			<div id="fase_reporte_maritimo_con_servicios"></div>
			<!-- OTHERS DEVELOPERS (FIN) -->
		  </div>
		</form>	
	</section>
	<!--****************** AREGADOS RECIENTEMENTE *****************-->
	<?php require_once 'includes/form-calculator-flete.php'; ?>
	<?php require_once 'includes/form-validate-container-modal.php'; ?>
	<?php require_once 'includes/form-before-download-pdf.php'; ?>

	<script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
	<script src="<?= $url ?>js/validar_check_vacios.js"></script>
	<script src="<?= $url ?>js/validar_check_vacios_lcl.js"></script>
	<script src="<?= $url ?>js/customs.js"></script>
	<script src="<?= $url ?>js/modal-calculator.js"></script>
	<script src="<?= $url ?>js/cotization_allfunctionsSystem.js"></script>
	<script src="<?= $url ?>js/register-before-download.js"></script>
	</body>
</html>

<!--<script src="<?= $url ?>js/calculadora.js"></script>-->
<!--<script src="<?= $url ?>js/list_typeServices.js"></script>
<script src="<?= $url ?>js/list_typeContainers.js"></script>
<script src="<?= $url ?>js/list_puertoOriginLCL.js"></script>
<script src="<?= $url ?>js/list_puertoDestinyLCL.js"></script>
<script src="<?= $url ?>js/steps_after_calculation.js"></script>
<script src="<?= $url ?>js/steps_sel_services.js"></script>-->
	
	<!-- 080026026
	969 382 537 
	976 388 451 
	
	aniego por roctura de desagüe  
	-->