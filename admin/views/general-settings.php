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
											<li data-target="#anchor_settings_conditions">Condiciones</li>
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
										        ?>" placeholder="999 999 999" maxlength="11">
										        </div>
										        <div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="whatsapp_text" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Texto de whatsapp</label>
										          <textarea id="whatsapp_text" name="whatsapp_text" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__textarea" placeholder="Escribe aquí el texto para WhatsApp" maxlength="999"><?php 
										          if(isset($adm_config('whatsapp_text')['setting_value'])){
										          	echo $adm_config('whatsapp_text')['setting_value'];
										          }else{
										          	echo "";
										          }
										        	?></textarea>
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Información General</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="infogeneral_address" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Dirección</label>
										          <input type="text" id="infogeneral_address" name="infogeneral_address" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input" value="<?php
										          if(isset($adm_config('infogeneral_address')['setting_value'])){
										          	echo $adm_config('infogeneral_address')['setting_value'];
										          }else{
										          	echo "";
										          }
										        ?>" placeholder="Ejm: Av. Dos de Mayo" maxlength="">
										        </div>
										        <div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="infogeneral_email" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Correo Electrónico</label>
										          <input type="text" id="infogeneral_email" name="infogeneral_email" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input" value="<?php
										          if(isset($adm_config('infogeneral_email')['setting_value'])){
										          	echo $adm_config('infogeneral_email')['setting_value'];
										          }else{
										          	echo "";
										          }
										        ?>" placeholder="Ejm: info@gmail.com" maxlength="">
										        </div>
										        <div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="infogeneral_telephone" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Teléfono</label>
										          <input type="text" id="infogeneral_telephone" name="infogeneral_telephone" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input" value="<?php
										          if(isset($adm_config('infogeneral_telephone')['setting_value'])){
										          	echo $adm_config('infogeneral_telephone')['setting_value'];
										          }else{
										          	echo "";
										          }
										        ?>" placeholder="999 999 999">
										        </div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Información Asesor</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
										        <div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem w-100">
										          <label for="infogeneral_asesor_telephone" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__label">Teléfono</label>
										          <input type="text" id="infogeneral_asesor_telephone" name="infogeneral_asesor_telephone" data-valformat="withspacesforthreenumbers" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__ctrlItem__input" value="<?php
										          if(isset($adm_config('infogeneral_asesor_telephone')['setting_value'])){
										          	echo preg_replace('/(\d{1,3})(?=(\d{3})+$)/', '$1 ', $adm_config('infogeneral_asesor_telephone')['setting_value']);
										          }else{
										          	echo "";
										          }
										        ?>" placeholder="999 999 999" maxlength="11">
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
									<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting" id="anchor_settings_conditions">
										<form action="" method="POST" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm">
											<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody">
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardTitle">
													<h4>Home</h4>
												</div>
												<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody">
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol">
														<h3 class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardTitle">Condiciones Generales</h3>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls">
														<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls">
															<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cBtn">
																<button type="button" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cBtn__btn" title="Agregar condición" id="btn-addConditions">Agregar</button>
															</div>
															<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms">
																<?php
																	
																	$tmp_conditions = "";
																	$count_cond = 0;
																	if(isset($adm_config('infogeneral_conditions')['setting_value']) && $adm_config('infogeneral_conditions')['setting_value'] != "" && $adm_config('infogeneral_conditions')['setting_value'] != "[]"){
																		
																		$list_conditions = json_decode($adm_config('infogeneral_conditions')['setting_value'], true);
																		// echo "<pre>";
																		// print_r($list_conditions);
																		// echo "</pre>";

																		$tmp_conditions = "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m' id='lts-allConditions'>";
																		foreach ($list_conditions as $key => $value){
																			$count_cond++;
																			if($value['font_weight'] == "bold"){
																				$tmp_conditions .= "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm item-condition' id='item-{$count_cond}'>
																				<textarea class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__input t-bold' data-bold='bold' cols='30' rows='1' name='infogeneral_conditions[]' id='condition_{$count_cond}' placeholder='Ingrese la condición' required>{$value['text']}</textarea>
																				<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns'>
																					<button type='button' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns__btndel btn-del' title='Eliminar condición'>
																						<span>
																							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='18px' height='18px'><path d='M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'/></svg>
																						</span>
																					</button>
																					<button type='button' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns__btnbold t-bold btn-bold' title='Poner en negrita la condición'>
																						<span>
																							<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='18px' height='18px' version='1.1' viewBox='0 0 700 700'><g xmlns='http://www.w3.org/2000/svg'><path d='m450.3 261.65c25.453 17.703 48.227 43.645 59.645 72.66 3.1758 8.0625 5.8281 16.844 7.207 25.426 3.4883 21.762 0.80469 44.832-6.3516 65.613-1.9805 5.7617-4.3555 11.406-7.1562 16.828-2.8242 5.4766-6.1641 10.773-9.8438 15.691-16.684 22.309-38.27 40.207-64.551 50.031-18.727 6.9883-38.633 10.141-58.605 10.109-53.652-0.078124-189.34 0-189.34 0v-476h187.14c28.285 0 55.254 14.312 75.242 33.57 5.6797 5.4727 11.105 11.504 15.883 17.797 12.219 16.109 22.758 34.641 26.82 54.633 3.8594 19.098 3.293 38.258-2.9531 56.789-1.7305 5.1289-3.8398 10.152-6.2109 15.008-4.6367 9.4766-9.5859 17.898-15.754 26.434-0.69531 0.95312-11.203 15.395-11.18 15.41zm-172.13 189.66s62.016 0.17188 85.559-0.050782c4.3516-0.050781 8.6797-0.57031 12.992-1.082 22.074-2.6719 37.582-22.203 43.445-42.363 5.0977-17.527 4.3008-38.484-2.168-55.559-1.8125-4.8008-4.2891-9.5938-7.2539-13.77-8.4609-11.945-23-25.473-38.629-25.465-26.824 0.023438-93.945 0.066407-93.945 0.066407zm0-202.59h40.945c17.488 0 18.09-0.46875 24.414-1.6406 12.324-2.2852 25.047-11.066 32.414-20.961 7.582-10.176 12.473-22.719 14.117-35.293 1.7422-13.223 1.2617-27.469-3.5234-40.078-7.1523-18.891-21.387-36.746-41.625-42.152-4.6211-1.2305-9.6875-1.9336-14.48-1.9336h-52.27l0.003906 142.06z'/></g></svg>
																						</span>
																					</button>
																				</div>
																			</div>";
																			}else{
																				$tmp_conditions .= "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm item-condition' id='item-{$count_cond}'>
																				<textarea class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__input' data-bold='light' cols='30' rows='1' name='infogeneral_conditions[]' id='condition_{$count_cond}' placeholder='Ingrese la condición' required>{$value['text']}</textarea>
																				<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns'>
																					<button type='button' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns__btndel btn-del' title='Eliminar condición'>
																						<span>
																							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='18px' height='18px'><path d='M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'/></svg>
																						</span>
																					</button>
																					<button type='button' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns__btnbold btn-bold' title='Poner en negrita la condición'>
																						<span>
																							<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='18px' height='18px' version='1.1' viewBox='0 0 700 700'><g xmlns='http://www.w3.org/2000/svg'><path d='m450.3 261.65c25.453 17.703 48.227 43.645 59.645 72.66 3.1758 8.0625 5.8281 16.844 7.207 25.426 3.4883 21.762 0.80469 44.832-6.3516 65.613-1.9805 5.7617-4.3555 11.406-7.1562 16.828-2.8242 5.4766-6.1641 10.773-9.8438 15.691-16.684 22.309-38.27 40.207-64.551 50.031-18.727 6.9883-38.633 10.141-58.605 10.109-53.652-0.078124-189.34 0-189.34 0v-476h187.14c28.285 0 55.254 14.312 75.242 33.57 5.6797 5.4727 11.105 11.504 15.883 17.797 12.219 16.109 22.758 34.641 26.82 54.633 3.8594 19.098 3.293 38.258-2.9531 56.789-1.7305 5.1289-3.8398 10.152-6.2109 15.008-4.6367 9.4766-9.5859 17.898-15.754 26.434-0.69531 0.95312-11.203 15.395-11.18 15.41zm-172.13 189.66s62.016 0.17188 85.559-0.050782c4.3516-0.050781 8.6797-0.57031 12.992-1.082 22.074-2.6719 37.582-22.203 43.445-42.363 5.0977-17.527 4.3008-38.484-2.168-55.559-1.8125-4.8008-4.2891-9.5938-7.2539-13.77-8.4609-11.945-23-25.473-38.629-25.465-26.824 0.023438-93.945 0.066407-93.945 0.066407zm0-202.59h40.945c17.488 0 18.09-0.46875 24.414-1.6406 12.324-2.2852 25.047-11.066 32.414-20.961 7.582-10.176 12.473-22.719 14.117-35.293 1.7422-13.223 1.2617-27.469-3.5234-40.078-7.1523-18.891-21.387-36.746-41.625-42.152-4.6211-1.2305-9.6875-1.9336-14.48-1.9336h-52.27l0.003906 142.06z'/></g></svg>
																						</span>
																					</button>
																				</div>
																			</div>";
																			}
																		}
																		$tmp_conditions .= "</div>";

																	}else{
																		$tmp_conditions = "<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m' id='lts-allConditions'></div>";
																	}
																	echo $tmp_conditions;
																	
																?>
															</div>
														</div>
													</div>
													<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement ta-right">
														<button name="conditions_settings" type="submit" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__colElement__btnFormAction">
															<span>Guardar</span>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
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
	<script type="text/javascript" src="<?= $url;?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url;?>js/actions_pages/general-settings.js"></script>
</body>
</html>