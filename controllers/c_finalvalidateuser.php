<?php
/*
session_start();
if(isset($_POST) && count($_POST) > 0){

	$arr_userquotation = [
		'id_gencoderand' => $_POST['id_gencoderand'],
		'code_quote' => $_POST['code_quote'],
		'ndoc_cli' => $_POST['ndoc_cli'],
		'name_enterprise_cli' => $_POST['name_enterprise_cli_cli'],
		'telephone_cli' => $_POST['telephone_cli']
	];

	require_once 'c_update_quotation_user.php';
	$quoteupd = new Update_Quotation_User();
	$updatequotation = $quoteupd->update();
	print_r($updatequotation);

}else{
	header("Location: marketplace-logistico");
}
*/