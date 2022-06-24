<?php
$r = "";
if(isset($_POST) && !empty($_POST)){
	require_once 'c_list_ultimate_codegen.php';
	require_once '../models/quotation-user.php';
	$quoteuser = new Quotation_user();
	$codegen_auto = new List_ultimate_codegen();
  $ulti_codegenauto = $codegen_auto->list();

  // echo "<pre>";
  // print_r($_POST);
  // echo "</pre>";
  // exit();

	$arr_userquotation = [
	  'id_codegenrand' => $_POST['id_codegenrand'],
	  'codegenerate' => $ulti_codegenauto[0]['res'],
	  'u_login' => $_POST['u_login'],
	  'f_typetransendinitid' => (!isset($_POST['f_typetransendinitid']) || $_POST['f_typetransendinitid'] == "") ? "ID inválido" : $_POST['f_typetransendinitid'],
	  'f_type_op' => $_POST['f_type_op'],
	  'f_type_serv' => $_POST['f_type_serv'],
	  'f_type_transp' => (!isset($_POST['f_type_transp']) || $_POST['f_type_transp'] == "") ? "No seleccinado" : $_POST['f_type_transp'],
	  'f_type_cont' => $_POST['f_type_cont'],
	  'u_n_document' => $_POST['u_n_document'],
	  'u_enterprise' => $_POST['u_enterprise'],
	  'u_telephone' => $_POST['u_telephone'],
	  'u_service' => $_POST['u_service'],
	  'u_cont' => $_POST['u_cont'],
	  'f_origen' => (!isset($_POST['f_origen']) || $_POST['f_origen'] == "") ? "No especificado" : $_POST['f_origen'],
	  'f_destiny' => (!isset($_POST['f_destiny']) || $_POST['f_destiny'] == "") ? "No especificado" : $_POST['f_destiny'],
	  'f_desc_w_v' => $_POST['f_desc_w_v'],
	  'f_weight_v' => $_POST['f_weight_v'],
	  'f_time_transit' => (!isset($_POST['f_time_transit']) || $_POST['f_time_transit'] == "") ? 0 : $_POST['f_time_transit'],
	  'f_fob' => $_POST['f_fob'],
	  'f_flete' => $_POST['f_flete'],
	  'f_insurance' => $_POST['f_insurance'],
	  'f_cif' => $_POST['f_cif'],
	  'f_v_IGV' => (!isset($_POST['f_v_IGV']) || $_POST['f_v_IGV'] == "") ? 0 : $_POST['f_v_IGV'],
	  'f_v_IPM' => (!isset($_POST['f_v_IPM']) || $_POST['f_v_IPM'] == "") ? 0 : $_POST['f_v_IPM'],
	  'f_importadoprev' => (!isset($_POST['f_importadoprev']) || $_POST['f_importadoprev'] == "") ? "No especificado" : $_POST['f_importadoprev'],
	  'f_v_percepcion' => (!isset($_POST['f_v_percepcion']) || $_POST['f_v_percepcion'] == "") ? 0 : $_POST['f_v_percepcion'],
	  'f_v_ad_valoren' => (!isset($_POST['f_v_ad_valoren']) || $_POST['f_v_ad_valoren'] == "") ? 0 : $_POST['f_v_ad_valoren'],
	  'f_v_impuesto_selectivo' => (!isset($_POST['f_v_impuesto_selectivo']) || $_POST['f_v_impuesto_selectivo'] == "") ? 0 : $_POST['f_v_impuesto_selectivo'],
	  'f_v_antidumping' => (!isset($_POST['f_v_antidumping']) || $_POST['f_v_antidumping'] == "") ? 0 : $_POST['f_v_antidumping'],
	  'f_percepcion' =>  (!isset($_POST['f_percepcion']) || $_POST['f_percepcion'] == "" || $_POST['f_percepcion'] == 0) ? 0 : $_POST['f_percepcion'],
	  'f_ad_valoren' => 0,
	  'f_impuesto_selectivo' => 0,
	  'f_antidumping' => (!isset($_POST['f_antidumping']) || $_POST['f_antidumping'] == "" || $_POST['f_antidumping'] == 0) ? 0 : $_POST['f_antidumping'],
	  'f_IGV' => (!isset($_POST['f_IGV']) || $_POST['f_IGV'] == "" || $_POST['f_IGV'] == 0) ? 0 : $_POST['f_IGV'],
	  'f_IPM' => (!isset($_POST['f_IPM']) || $_POST['f_IPM'] == "" || $_POST['f_IPM'] == 0) ? 0 : $_POST['f_IPM'],
	  'f_emision_BL' => 0,
	  'f_handling' => 0,
	  'f_visto_bueno' => 0,
	  'f_desconsolidacion' => 0,
	  'f_almacen_referencial' => 0,
	  'f_transporte_interno' => (!isset($_POST['f_transporte_interno']) || $_POST['f_transporte_interno'] == "" || $_POST['f_transporte_interno'] == 0) ? 0 : $_POST['f_transporte_interno'],
	  'f_aforo_fisico_y_previo' => 0,
	  'f_gremios_maritimos' => 0,
	  'f_THC' => 0,
	  'f_devolucion_contenedores' => 0,
	  'f_derechos_embarque' => 0,
	  'f_consolidacion' => 0,
	  'f_bohe_o_inspeccion' => 0,
	  'f_comision_agencia' => (!isset($_POST['f_comision_agencia']) || $_POST['f_comision_agencia'] == "" || $_POST['f_comision_agencia'] == 0) ? 0 : $_POST['f_comision_agencia'],
	  'f_gastos_operativos' => (!isset($_POST['f_gastos_operativos']) || $_POST['f_gastos_operativos'] == "" || $_POST['f_gastos_operativos'] == 0) ? 0 : $_POST['f_gastos_operativos'],
	  'f_estiba' => 0,
	  'f_totalinsurance' => $_POST['f_totalinsurance'],
	  'f_totalservices' => $_POST['f_totalservices'],
	  'f_totalservicesIGV18' => $_POST['f_totalservicesIGV18'],
	  'f_totalimpuestos' => $_POST['f_totalimpuestos'],
	  'f_totalwithIGV' => $_POST['f_totalwithIGV'],
	  'f_validdesde' => $_POST['f_validdesde'],
	  'f_validhasta' => $_POST['f_validhasta']
	];

	$validexist = $quoteuser->valid_exist_quotation($arr_userquotation['id_codegenrand'], $arr_userquotation['codegenerate']);
	if($validexist['res'] == "notexists"){
		$savequote = $quoteuser->add_quotation_user($arr_userquotation);	
		if($savequote == "true"){
			$list = $quoteuser->get_by_idcodegenrand($arr_userquotation['id_codegenrand']);
			$r = array(
				"res" => "non_existent",
				"received" => $list
			);
		}else{
			$r = array(
				"res" => "false"
			);		
		}
	}else if($validexist['res'] == "exists"){
		$list = $quoteuser->get_by_idcodegenrand($arr_userquotation['id_codegenrand']);
		$r = array(
			"res" => "already_exists",
			"received" => $list
		);
	}else{
		$r = array(
			"res" => "false"
		);
	}
}else{
	$r = array(
		"res" => "false"
	);
}
die(json_encode($r));