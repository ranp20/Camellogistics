<?php 	
if(isset($_POST) && count($_POST) > 0){
	echo "<pre>";
	print_r($_POST);
	echo "</pre>";
	exit();
}else{
	echo "Error al recibir los datos.";
}

// if(isset($_POST)){
// 	require_once '../models/users.php';
// 	$users = new Users();
// 	$get_user = $users->get_users($_POST['username_cli']);

// 	$res = array(
// 		"username" => $get_user[0]['username'],
// 		"response" => "true"
// 	);
// }else{
// 	echo "Error. Lo sentimo hubo un error al validar el usuario.";
// 	$res = array(
// 		"response" => "false"
// 	);
// }
// die(json_encode($res));