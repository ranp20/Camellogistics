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
<section class="mtop-headertop" id="portfolio">
	<?php require_once 'api_whatsapp.php'; ?>
	<form id="frm_cotizacion" method="POST" action="views/modules/act_maritimo.php" class="c-CalculatorStep--form">
		<!------------------------------------------ PRIMERA FASE - PASO 1 (INICIO) -------------------------------->
		<div id="step-One" class="c-CalculatorStep--form--contStep">
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
		<!------------------------------------------ PRIMERA FASE - PASO 1 (FIN) ----------------------------------->
		<!------------------------------------------ SEGUNDA FASE - PASO 2 (INICIO) ----------------------------------->				
		<!-----------------------------------------------------------------  CUSTOMIZATION (INICIO) -->
		<div id="step-Two" class="c-CalculatorStep--form--contStep hide step-hidden">
			<div class="box-container">
				<div class="c-CalculatorStep--form--contStep--cTitledesconly">
					<h3 class="c-CalculatorStep--form--contStep--cTitledesconly--desc">PASO 2. Indica Ruta y Tipo de Contenedor</h3>
				</div>
				<div class="c-CalculatorStep--form--contStep--cStepSelects">
					<div class="c-CalculatorStep--form--contStep--cStepSelects--item">
						<p class="c-CalculatorStep--form--contStep--cStepSelects--item--title">Tipo envío</p>
						<button type="button" id="val-typecontainerflete" class="c-CalculatorStep--form--contStep--cStepSelects--item--fakeselbtn">Elija una opción</button>
						<span id="msgNounTypeSend-step">Debe escoger tipo de envío</span>
						<small id="detail-CalcToModalAssoc">
							<span>Bultos = <span id="small-valPCalcReqModal"></span>,</span>
							<span> Peso = <span id="small-valWCalcReqModal"></span> kg,</span>
							<span> Volumen = <span id="small-valVCalcReqModal"></span> M³</span>
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
										<input type="number" value="" placeholder="Ingrese peso" id="val-CalcWeightRequestModal">
										<select name="" id="valinput-peso">
											<option value="1">Kilogramos</option>
											<option value="2">Libras</option>
											<option value="3">Toneladas</option>
										</select>
									</div>
								</div>
								<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
									<label for="">VOLUMEN</label>
									<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl--twocontrols">
										<input type="number" value="" placeholder="Ingrese volumen" id="val-CalcVolumeRequestModal">
										<select name="" id="valinput-volumen">
											<option value="1">Metros cúbicos</option>
											<option value="2">Pies cúbicos</option>
										</select>
									</div>
								</div>
								<a href="#" id="Add-fromcalculatorModal" class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--linkModalDatas">AYUDA - CALCULA VOLUMEN (m3) AQUÍ</a>
								<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cbtnsActs">
									<a href="#">VOLVER</a>
									<button type="button">GUARDAR</button>
								</div>
							</div>
						</div>
					</div>
					<div class="c-CalculatorStep--form--contStep--cStepSelects--item">
						<p class="c-CalculatorStep--form--contStep--cStepSelects--item--title">Origen</p>
						<input type="text" placeholder="ESCRIBA País, Ciudad o Puerto" id="input-vallistorigin">
						<span id="msgNounOriginSend-step">ESCRIBA país o puerto de origen</span>
						<div class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems">
							<ul class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list" id="list-originCountriesandPort"></ul>
						</div>
					</div>
					<div class="c-CalculatorStep--form--contStep--cStepSelects--item">
						<p class="c-CalculatorStep--form--contStep--cStepSelects--item--title">Destino</p>
						<input type="text" placeholder="País, Ciudad o Puerto" id="input-vallistdestiny">
						<span id="msgNounDestinySend-step">Seleccione un puerto de destino válido</span>
						<div class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems">
							<ul class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list" id="list-destinyCountriesandPort">
								<li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">Selecciona un contenedor</li>
							</ul>
						</div>
					</div>
					<div class="c-CalculatorStep--form--contStep--cStepSelects--item">
						<button type="button" id="link-showNextStep" class="c-CalculatorStep--form--contStep--cStepSelects--item--nextbtn">SIGUIENTE</button>
					</div>
				</div>
				<!-----------------------------------------------------------------  CUSTOMIZATION (FIN) -->
				<div class="row">
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Tipo envío</div>
								<div class="portfolio-caption-subheading text-muted">
									<select id="tip_contenedor" name="tip_contenedor" class="select2">
										<option value="">Elija una Opcion</option>
										<option value="con_completo">Contenedor Completo (FCL)</option>
										<option value="con_compartido">Contenedor Compartido (LCL)</option>
									</select>
								</div>
							</div>  
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
							<div class="portfolio-caption">
							<div class="portfolio-caption-heading">Origen</div>
								<div class="portfolio-caption-subheading text-muted">
									<select id="puertos_orig" name="puertos_orig" class="select2">
										<option value="">Pais, Ciudad o Puerto</option>
										<?php
											//$vistapuertoOrig = new MvcController();
											//$vistapuertoOrig -> vistaPuertosOrigController();
										?>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Destino</div>
								<div class="portfolio-caption-subheading text-muted">
									<select id="puertos_dest" name="puertos_dest" class="select2">
										<option value="">Pais, Ciudad o Puerto</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading"></div>
								<div class="portfolio-caption-subheading text-muted">
									<div align="center">
										<input type="submit" id="next_maritimo" rel_user_it='' name="next_maritimo" class="button" value="Siguiente">
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-4 col-sm-12 mb-4">
						<div class="portfolio-item">
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading"></div>
								<div class="portfolio-caption-subheading text-muted">
									<div id="detail_contenedor">
										<div id="cont_1"></div>
										<div id="cont_2"></div>
										<div id="cont_3"></div>
										<div id="cont_4"></div>
									</div>
									<div id="list_cont_completo">
										<div class="rell_spi">
										</div>
										<div align="center">
											<div id="estimar" class="button">Guardar</div>
											<input type="hidden" id="tot_pre_cont" name="tot_pre_cont" value="">
										</div>	
									</div>
									
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mb-4">
						
					</div>
					<div class="col-lg-3 col-sm-6 mb-4">
						
					</div>
					<div class="col-lg-4 col-sm-6 mb-4">
						
					</div>
				</div>	
				
			</div>
		</div>
		<!------------------------------------------ SEGUNDA FASE - PASO 2 (FIN) ----------------------------------->
			<div id="fase_21">				
				<center>
					<div class="text-center">
						<h3 id="tit_el_op" class="section-subheading text-muted">2.1 Elige una opcion</h3>
					</div>
				</center>
				<div class="row">
					<div class="col-lg-3 col-sm-6 mb-4">
					</div>
					<div id="boton_serv">
					</div>
					<div id="boton_serv_lcl">
					</div>
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
							<div class="portfolio-caption">					
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="fase3">
				
			</div>
			<div id="fase31">
				
			</div>
			<div id="cadena_logistica">
				
			</div>

			<div id="fase_time_line">
				<div class="row">
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">	
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
							<div class="text-center">
								<div id="marco_linea_tiempo">
									<div id="marc_img_icon_serv">
										<div id="img_icon_serv"></div>
										SERVICIOS
									</div>
									<div class="line_azul"><hr color="blue" /></div>
									<div id="marc_img_icon_serv">
										<div id="img_icon_ruta"></div>
										RUTA
									</div>		
									<div class="line_azul"><hr color="blue" /></div>
									<div id="marc_img_icon_serv">
										<div id="img_icon_serv_extra"></div>
											Serv. EXTRAS
										</div>	
										<div class="line_azul"><hr color="blue" /></div>
										<div id="marc_img_icon_serv">
											<div id="img_icon_presup"></div>
											PRESUPUESTO
										</div>	
									</div>						
								</div>
							</div>
						</div>
					</div>	
					<div class="col-lg-3 col-sm-6 mb-4">
						<div class="portfolio-item">
			
						</div>
					</div>
				</div>
			</div>
			<div id="fase_reporte_maritimo_con_servicios">			
			</div>
	  </div>
	</form>	
</section>
<!--****************** AREGADOS RECIENTEMENTE *****************-->
<?php require_once 'includes/form-calculator-flete.php'; ?>
<?php require_once 'includes/form-before-download-pdf.php'; ?>

<script src="<?= $url ?>js/jquery-3.5.1.min.js"></script>
<script src="<?= $url ?>js/calculadora.js"></script>
<script src="<?= $url ?>js/validar_check_vacios.js"></script>
<script src="<?= $url ?>js/validar_check_vacios_lcl.js"></script>
<script src="<?= $url ?>js/register-before-download.js"></script>
<script src="<?= $url ?>js/customs.js"></script>
<script src="<?= $url ?>js/list_puertoOriginLCL.js"></script>
<script src="<?= $url ?>js/list_puertoDestinyLCL.js"></script>
<script src="<?= $url ?>js/modal-calculator.js"></script>
	
	<!-- 080026026
	969 382 537 
	976 388 451 
	
	aniego por roctura de desagüe  
	-->