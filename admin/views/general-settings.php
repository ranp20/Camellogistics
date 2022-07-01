<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['admin_camel'])){
	header("Location: ../admin");
}
require_once '../controllers/config.php';
$settings = new List_Settings();
$adm_config = $settings->list();
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Ajustes de Inicio</title>
	<!-- INCLUIR SWEETALERTS2 -->
	<link rel="stylesheet" href="../node_modules/sweetalert2/dist/sweetalert2.min.css">
	<script type="text/javascript" src="../node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border non-box-shadow p-onlydesktop-1rm">
					<div class="cont-dashCamel__addtitle">
						<h2 class="cont-dashCamel__addtitle--title">AJUSTES</h2>
					</div>				
					<section class="cont-dashCamel--cHSettings" id="cont-dashCamel--cHSettings">
						<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody">
							<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings">
								<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideLinkAnchors">
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideLinkAnchors__cLinks" id="c-Settings_linksAnchors">
										<ul id="c-Settings_linksAnchors-m">
											<li data-target="#anchor_settings_home">Home</li>
											<!-- <li data-target="#anchor_settings_convert-divise">Otros Valores</li> -->
											<li data-target="#anchor_settings_banners">Banners</li>
											<li data-target="#anchor_settings_logos">Logos</li>
											<li data-target="#anchor_settings_about-us">Nosotros</li>
										</ul>
									</div>
								</div>
								<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors">
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_home">
										<form action="" method="POST" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm">
											<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody">
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardTitle">
													<h4>Home</h4>
												</div>
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody">
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Whatsapp</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem">
										          <label for="whatsapp_phone" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Número de whatsapp</label>
										          <input type="text" id="whatsapp_phone" name="whatsapp_phone" data-valformat="withspacesforthreenumbers" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input" value="<?php
										          if(isset($adm_config('whatsapp_phone')['setting_value'])){
										          	echo preg_replace('/(\d{1,3})(?=(\d{3})+$)/', '$1 ', $adm_config('whatsapp_phone')['setting_value']);
										          }else{
										          	echo "";
										          }
										          //echo $config->list("whatsapp_phone")[0]["setting_value"];
										        ?>" placeholder="(+51) 999 999 999" maxlength="11">
										        </div>
										        <div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="whatsapp_phone" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Texto de whatsapp</label>
										          <textarea id="whatsapp_text" name="whatsapp_text" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__textarea" placeholder="Escribe aquí el texto para WhatsApp" maxlength="999"><?php 
										          if(isset($adm_config('whatsapp_phone')['setting_value'])){
										          	echo $adm_config('whatsapp_text')['setting_value']; 
										          }else{
										          	echo "";
										          }
										        	?></textarea>
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
														<button name="home_settings" type="submit" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
															<span>Guardar</span>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									<!-- 
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_convert-divise">
										<form action="" method="POST" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm">
											<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody">
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardTitle">
													<h4>Otros valores</h4>
												</div>
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody">
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">COMISIÓN DE AGENCIA</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="ammountCifValidation" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Montos mayores al valor CIF</label>
										          <input type="text" id="ammountCifValidation" name="ammountCifValidation" data-valformat="withcomedecimal" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input md-w-control" value="<?php
										          if(isset($adm_config('quotation_ammountcifvalidation')['setting_value'])){
											          $ammountcifvalidation = $adm_config('quotation_ammountcifvalidation')['setting_value'];
											          if($ammountcifvalidation != ""){
											          	echo number_format($adm_config('quotation_ammountcifvalidation')['setting_value'],2);
											          }else{
											          	echo "";
											          }
									          	}else{
									          		echo "";
									          	}
										        	?>" placeholder="Ejm: 5,000" maxlength="12">
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="ammountCifMaxValidation" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Valor para montos mayores al máximo CIF (%)</label>
										          <input type="text" id="ammountCifMaxValidation" name="ammountCifMaxValidation" data-valformat="withtwodecimals" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input md-w-control" value="<?php
										          if(isset($adm_config('quotation_ammountcifmaxvalidation')['setting_value'])){
											          $ammountcifmaxvalidation = $adm_config('quotation_ammountcifmaxvalidation')['setting_value'];
											          if($ammountcifmaxvalidation != ""){
											          	echo number_format($adm_config('quotation_ammountcifmaxvalidation')['setting_value'],2);
											          }else{
											          	echo "";
											          }
									          	}else{
									          		echo "";
									          	}
										        	?>" placeholder="Ejm: 0.5" maxlength="12">
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">CERTIFICADO DE CONFORMIDAD</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="ammountCertiConformValidation" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Monto a validar</label>
										          <input type="text" id="ammountCertiConformValidation" name="ammountCertiConformValidation" data-valformat="withcomedecimal" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input md-w-control" value="<?php
										          if(isset($adm_config('quotation_ammountcerticonformvalidation')['setting_value'])){
											          $ammountcifvalidation = $adm_config('quotation_ammountcerticonformvalidation')['setting_value'];
											          if($ammountcifvalidation != ""){
											          	echo number_format($adm_config('quotation_ammountcerticonformvalidation')['setting_value'],2);
											          }else{
											          	echo "";
											          }
									          	}else{
									          		echo "";
									          	}
										        	?>" placeholder="Ejm: 5,000" maxlength="12">
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
														<button name="quotation_settings" type="submit" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
															<span>Guardar</span>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									 -->
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_banners">
										<form action="" method="POST" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm" enctype="multipart/form-data">
											<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody">
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardTitle">
													<h4>Banners</h4>
												</div>
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody">
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Home</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="home_banner_principal" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Banner principal</label>
										          <div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto mdesk-w-control">
										          	<?php
										          		if(isset($adm_config("home_banner_principal")['setting_value'])){
											          		$pathbannerp = $adm_config("home_banner_principal")['setting_value'];
											          		$path_banner_principal = "";
											          		if($pathbannerp != ""){
											          			$path_banner_principal = $url."assets/img/banner_principal/".$adm_config("home_banner_principal")['setting_value'];
											          			echo "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__cImg mx-sz-big already-upload'>
											          		<img src='{$path_banner_principal}' alt='home_banner_principal' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__cImg__imgUpload'>
											          	</div>";
											          		}else{
											          			$path_banner_principal = $url."assets/img/utilities/icon-upload.svg";
											          			echo "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__cImg mx-sz-big'>
											          		<img src='{$path_banner_principal}' alt='home_banner_principal' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__cImg__imgUpload'>
											          	</div>";
											          		};
										          		}else{
										          			$path_banner_principal = $url."assets/img/utilities/icon-upload.svg"; 
											          			echo "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__cImg mx-sz-big'>
											          		<img src='{$path_banner_principal}' alt='home_banner_principal' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__cImg__imgUpload'>
											          	</div>";
										          		}
										          	?>
										          	<input type="file" id="home_banner_principal" name="home_banner_principal" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__cUploadPhoto__input banner_principal-upload" value="" placeholder="Eleja el archivo a subir" accept="img/*">
										          </div>
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
														<button name="banners_settings" type="submit" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
															<span>Guardar</span>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_logos">
										<form action="" method="POST" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm">
											<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody">
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardTitle">
													<h4>Logo</h4>
												</div>
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody">
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Logo</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
														<button type="submit" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
															<span>Guardar</span>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_about-us">
										<form action="" method="POST" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm">
											<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody">
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardTitle">
													<h4>Nosotros</h4>
												</div>
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody">
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Nosotros</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
														<button type="submit" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
															<span>Guardar</span>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/general-settings.js"></script>
</body>
</html>