<?php 	
if(isset($_POST)){
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