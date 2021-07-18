<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
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
	<form id="frm_cotizacion" method="POST" action="views/modules/act_maritimo.php" class="c-CalculatorStep--form">
		<!------------------------------------------ PRIMERA FASE - PASO 1 (INICIO) ----------------------------------->
		<div id="step-One" class="c-CalculatorStep--form--contStep"style="display:none!important;pointer-events:none!important;">
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
		<div id="step-Two" class="c-CalculatorStep--form--contStep hide step-hidden"style="display:none!important;pointer-events:none!important;">
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
              <ul class="c-SelServicesQuantity--contStep--cBottom--cListServices--m" id="m-listseleted-services">
                <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                  <label for="service-item-1" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                    <input type="checkbox" id="service-item-1" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                    <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                      <img src="views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-003.png" alt="">
                    </div>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text">Gastos Portuarios de Almacenamiento Aduanero</span>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                  </label>
                </li>
                <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                  <label for="service-item-2" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                    <input type="checkbox" id="service-item-2" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                    <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                      <img src="views/assets/img/linea_tiempo/ADUANA-002.png" alt="">
                    </div>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text"><b>Cálculo de impuesto y permisos de aduana</b></span>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                  </label>
                  <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont" id="cont-selTwoOptsServicesFill">
                  	
                  </div>
                </li>
                <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                  <label for="service-item-3" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                    <input type="checkbox" id="service-item-3" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                    <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                      <img src="views/assets/img/linea_tiempo/TRANSPORTE-002.png" alt="">
                    </div>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text">Transporte a domicilio</span>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                  </label>
                  <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item--cont" id="cont-selThreeOptsServicesFill"></div>
                </li>
                <li class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--item">
                  <label for="service-item-4" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel">
                    <input type="checkbox" id="service-item-4" class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--input">
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--checkbox"></span>
                    <div class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIcon">
                      <img src="views/assets/img/linea_tiempo/TRANSPORTE-002.png" alt="">
                    </div>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--text">Seguro de mercancía</span>
                    <span class="c-SelServicesQuantity--contStep--cBottom--cListServices--m--linklabel--cIconChck"></span>
                  </label>
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

<script src="<?= $url ?>js/jquery-3.5.1.min.js"></script>
<script src="<?= $url ?>js/calculadora.js"></script>
<script src="<?= $url ?>js/validar_check_vacios.js"></script>
<script src="<?= $url ?>js/validar_check_vacios_lcl.js"></script>
<script src="<?= $url ?>js/customs.js"></script>
<script src="<?= $url ?>js/modal-calculator.js"></script>
<!--<script src="<?= $url ?>js/list_typeServices.js"></script>
<script src="<?= $url ?>js/list_typeContainers.js"></script>
<script src="<?= $url ?>js/list_puertoOriginLCL.js"></script>
<script src="<?= $url ?>js/list_puertoDestinyLCL.js"></script>
<script src="<?= $url ?>js/steps_after_calculation.js"></script>
<script src="<?= $url ?>js/steps_sel_services.js"></script>-->
<script src="<?= $url ?>js/cotization_allfunctionsSystem.js"></script>
<script src="<?= $url ?>js/register-before-download.js"></script>
	
	<!-- 080026026
	969 382 537 
	976 388 451 
	
	aniego por roctura de desagüe  
	-->