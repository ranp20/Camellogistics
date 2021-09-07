<?php
if(isset($_POST) && count($_POST) > 0){
	$arr_userdata = [
		'username' => $_POST['u-username'],
		'password' => $_POST['u-password']
	];

	require_once '../models/users.php';
	$user = new Users();
	$getdata = $user->get_users($arr_userdata['username']);
	
	if(count($getdata) > 0){
		session_start();
		$_SESSION['user_camel'] = $getdata[0];

		$res = array(
			'response' => 'true',
			'received' => $getdata[0]
		);
	}else{
		$res = array(
			'response' => 'false'
		);
	}

}else{
	$res = array(
		'response' => 'false'
	);
}
die(json_encode($res));