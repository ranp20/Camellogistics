<?php
$r = "";
if(isset($_POST) && !empty($_POST)){
	$arr_updquotation = [
		'id_gencoderand' => $_POST['id_gencoderand'],
		'code_quote' => $_POST['code_quote'],
		'ndoc_cli' => $_POST['ndoc_cli'],
		'name_enterprise_cli' => $_POST['name_enterprise_cli'],
		'telephone_cli' => $_POST['telephone_cli']
	];
	require_once '../models/quotation-user.php';
	$quoteuser = new Quotation_user();
	$validupdate = $quoteuser->valid_updatequotation($arr_updquotation['id_gencoderand'], $arr_updquotation['code_quote']);
	if($validupdate['res'] == "notexists"){
		$updquote = $quoteuser->update_quotation_user($arr_updquotation);
		if($updquote == "true"){
			$r = array(
				"res" => "upd_quote"
			);
		}else{
			$r = array(
				"res" => "false"
			);	
		}
	}else if($validupdate['res'] == "exists"){
		$r = array(
			"res" => "already_update"
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