<?php
if(isset($_POST) && count($_POST) > 0){
	$arr_userdata = [
		'username' => $_POST['u-username'],
		'password' => $_POST['u-password']
	];

	require_once '../models/users.php';
	$user = new Users();
	$verifymail = $user->verify_email($arr_userdata['username']);

	if($verifymail == "true"){
		$res = array(
			'response' => 'equals'
		);
	}else{

		require_once 'add_user.php';
		$add_user = new Add_Users();
		$validate = $add_user->add($arr_userdata);

		if($validate == "true"){

			$getdata = $user->get_users($arr_userdata['username']);
			
			if(count($getdata) > 0){
				session_start();
				$_SESSION['user_camel'] = $getdata[0];

				$res = array(
					'response' => 'true'
				);
			}else{
				$res = array(
					'response' => 'errinsert'
				);	
			}

		}else{
			$res = array(
				'response' => 'errinsert'
			);		
		}
	}
}else{
	$res = array(
		'response' => 'false'
	);
}
die(json_encode($res));