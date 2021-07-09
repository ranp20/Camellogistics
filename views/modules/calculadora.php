<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<section class="mtop-headertop bg-light" id="portfolio">
	<?php require_once 'api_whatsapp.php'; ?>
	<form id="frm_cotizacion" method="POST" action="views/modules/act_maritimo.php">
		<div class="container">
			<div id="fase1">
				<div class="text-center">
					<br><br>
					<h4 class="section-heading text-uppercase">¡COTIZA TÚ FLETE!</h4>
					<h3 class="section-subheading text-muted">PASO 1. Selecciona el Servicio</h3>
				</div>
				<div class="row">
					<div class="col-lg-7 col-sm-6 mb-6">
						<div class="portfolio-item">
							<a  href="#" id="transporte_maritimo">
								<img class="img-fluid" src="views/assets/img/camel-imagen-1.png" alt="..." />
							</a>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 mb-4 mb-sm-0">
						<div class="portfolio-item">
							<a  href="#" id="transporte_aereo">
								<img class="img-fluid" src="views/assets/img/camel-imagen-2.png" alt="..." />
							</a>
						</div>
					</div>
					<input type="hidden" id="text_tipo_flete" name="text_tipo_flete" value="">
				</div>
			</div>	
			<div id="fase2">
				<br><br>
				<div class="text-center">
					<h3 class="section-subheading text-muted">PASO 2. Indica Ruta y Tipo de Contenedor</h3>
				</div>
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
<?php require_once 'includes/form-before-download-pdf.php'; ?>

<script src="<?= $url ?>js/jquery-3.5.1.min.js"></script>
<script src="<?= $url ?>js/calculadora.js"></script>
<script src="<?= $url ?>js/validar_check_vacios.js"></script>
<script src="<?= $url ?>js/validar_check_vacios_lcl.js"></script>
<script src="<?= $url ?>js/register-before-download.js"></script>
	
	<!-- 080026026
	969 382 537 
	976 388 451 
	
	aniego por roctura de desagüe  
	-->