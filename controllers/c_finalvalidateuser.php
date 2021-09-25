<?php 	
if(isset($_POST)){

	$arr_cliuser_quote = [
		"ndoc_cli" => $_POST['ndoc_cli'],
		"name_enterprise_cli" => ($_POST['name_enterprise_cli'] != 'undefined' || $_POST['name_enterprise_cli'] != "") ? $_POST['name_enterprise_cli'] : "No especificado",
		"telephone_cli" => ($_POST['telephone_cli'] != 'undefined' || $_POST['telephone_cli'] != "") ? $_POST['telephone_cli'] : "No especificado",
		"username_cli" => $_POST['username_cli']
	];
	print_r($arr_cliuser_quote);
	exit();

	require_once '../models/users.php';
	$users = new Users();
	$get_user = $users->get_users($_POST['userName']);

	$res = array(
		"username" => $get_user[0]['username'],
		"response" => "true"
	);
}else{
	echo "Error. Lo sentimo hubo un error al validar el usuario.";
	$res = array(
		"response" => "false"
	);
}
die(json_encode($res));