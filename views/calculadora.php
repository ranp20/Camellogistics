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
			<div id="step-One" class="c-CalculatorStep--form--contStep ptop-2">
				<div class="box-container">
					<div class="c-CalculatorStep--form--contStep--cTitle">
						<h2 class="c-CalculatorStep--form--contStep--cTitle--title b-bottom">¡COTIZA TÚ FLETE!</h2>
						<h3 class="c-CalculatorStep--form--contStep--cTitle--desc">PASO 1. Selecciona el Servicio</h3>
					</div>
					<div class="c-CalculatorStep--form--contStep--cStep">
						<ul class="c-CalculatorStep--form--contStep--cStep--m" id="cont-typeServicesOneStep"></ul>
					</div>
				<input type="hidden" id="text_tipo_flete" name="text_tipo_flete" value="">
				</div>
			</div>
			<!------------------------------------------ SEGUNDA FASE - PASO 2 (INICIO) ----------------------------------->
			<div id="step-Two" class="c-CalculatorStep--form--contStep hide step-hidden ptop-2">
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
			<div id="step-TwoPointOne" class="c-SelServicesOrNotStep--contStep hide step-hidden"></div>
			<!------------------------------------------- CUARTA FASE - PASO 3 (INICIO - FIN) ----------------------------->
			
			<!-- OTHERS DEVELOPERS (INICIO) -->
			<div id="fase_reporte_maritimo_con_servicios">			
				
			</div>
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