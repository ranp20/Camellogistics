<?php
session_start();
$r = "";
// print_r($_POST);
// exit();
if(isset($_GET['action']) && $_GET['action'] == "SaveChanges" && isset($_GET['assoc'])){
	$arr_postSettings = [];

	// ------------ AJUSTES - HOME
	if($_GET['assoc'] == 'home_settings'){
		if(isset($_POST) && count($_POST) > 0){
			// WHATSAPP
			$whatsapp_phone = (isset($_POST['whatsapp_phone'])) ? str_replace(" ", "", $_POST['whatsapp_phone']) : 0;
			$whatsapp_text = (isset($_POST['whatsapp_text']) && $_POST['whatsapp_text'] != "") ? $_POST['whatsapp_text'] : "";
			// INFORMACIÓN GENERAL
			$infogeneral_address = (isset($_POST['infogeneral_address']) && $_POST['infogeneral_address'] != "") ? $_POST['infogeneral_address'] : "";
			$infogeneral_email = (isset($_POST['infogeneral_email']) && $_POST['infogeneral_email'] != "") ? $_POST['infogeneral_email'] : "";
			$infogeneral_telephone = (isset($_POST['infogeneral_telephone']) && $_POST['infogeneral_telephone'] != "") ? $_POST['infogeneral_telephone'] : 0;
			// INFORMACIÓN ASESOR
			$infogeneral_asesor_telephone = (isset($_POST['infogeneral_asesor_telephone'])) ? str_replace(" ", "", $_POST['infogeneral_asesor_telephone']) : 0;

			$arr_postSettings = [
				"whatsapp_phone" => $whatsapp_phone,
				"whatsapp_text" => $whatsapp_text,
				"infogeneral_address" => $infogeneral_address,
				"infogeneral_email" => $infogeneral_email,
				"infogeneral_telephone" => $infogeneral_telephone,
				"infogeneral_asesor_telephone" => $infogeneral_asesor_telephone
			];
		}else{
			$r = array(
				'res' => 'false'
			);
		}
	}
	// ------------ AJUSTES - CONDICIONES
	if($_GET['assoc'] == 'conditions_settings'){
		if(isset($_POST) && count($_POST) > 0){
			$arr_infogeneral_conditions = (isset($_POST['infogeneral_conditions']) && $_POST['infogeneral_conditions'] != "") ? $_POST['infogeneral_conditions'] : "[]";
			$arr_infogeneral_conditions_bold = (isset($_POST['infogeneral_conditions_bold']) && $_POST['infogeneral_conditions_bold'] != "") ? $_POST['infogeneral_conditions_bold'] : "[]";
			$asign_infogeneral_conditions = [];
		 	$asign_infogeneral_conditions = array();
     	foreach ($arr_infogeneral_conditions as $key => $value){
       	$comb = array('text' => $value, 'font_weight' => '');
       	foreach ($arr_infogeneral_conditions_bold as $k => $v){
         	if($k == $key){
           	$comb['font_weight'] = $v;
           	break;
         	}else{
          	$comb['font_weight'] = $v;
         	}
       	}
   			$asign_infogeneral_conditions[] = $comb;
     	}
			$infogeneral_conditions = json_encode($asign_infogeneral_conditions);

			$arr_postSettings = [
				"infogeneral_conditions" => $infogeneral_conditions
			];
		}else{
			$r = array(
				'res' => 'false'
			);
		}
	}

	// ------------ AJUSTES - BANNERS
	if($_GET['assoc'] == 'banners_settings'){
		if(isset($_FILES) && count($_FILES) > 0){
			$home_banner_principal = "";
			$home_banner_principal_file_origin = $_FILES['home_banner_principal']['name'];
			$home_banner_principal_file_lowercase = strtolower($home_banner_principal_file_origin);
			$home_banner_principal_file_temp = $_FILES['home_banner_principal']['tmp_name'];
			$home_banner_principal_file_folder = "../views/assets/img/banner_principal/";
			if(move_uploaded_file($home_banner_principal_file_temp, $home_banner_principal_file_folder . $home_banner_principal_file_lowercase)){
				$home_banner_principal = strtolower($_FILES['home_banner_principal']['name']);
			}
			$arr_postSettings = [
				"home_banner_principal" => $home_banner_principal
			];
		}else{
			$r = array(
				'res' => 'false'
			);
		}
	}

	require_once 'connection.php';
	$sql = "";
	foreach($arr_postSettings as $key => $valor){
		$sql_valid = "SELECT setting_name FROM tbl_settings WHERE setting_name = '".$key."'";
		$row_valid = $con_u->query($sql_valid);
		$numb_rows = $row_valid->rowCount();
		if($numb_rows > 0){
			$sql = "UPDATE tbl_settings SET setting_value = '".$valor."' WHERE setting_name = '".$key."'";
		}else{
			$sql = "INSERT INTO tbl_settings (setting_name, setting_value) VALUES ('".$key."','".$valor."')";
		}
		$sql_db = $sql;
		$result = $con_u->prepare($sql_db);
		$result->execute();
		if($result == true){
			$r = array(
				'res' => 'updated',
				'message' => 'Éxito, se ha actualizado el registro correctamente.'
			);
		}else{
			$r = array(
				'res' => 'not-updated',
				'message' => 'Error, lo sentimos hubo un error al actualizar el registro.'
			);
		}
	}
}else{
	$r = array(
		'res' => 'false'
	);
}
die(json_encode($r));