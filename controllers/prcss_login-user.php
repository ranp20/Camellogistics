<?php
if(isset($_POST) && count($_POST) > 0){

	if($_POST['u-username'] != "Invitado" && $_POST['u-typeorder'] != 0){

		$arr_userdatalogin = [
			'username' => $_POST['u-username'],
			'password' => $_POST['u-password']
		];

		require_once 'c_login-user.php';
		$verify_user = new Login_User();
		$validate_user = $verify_user->LoginU($arr_userdatalogin);

		if($validate_user == 'true'){
			require_once '../models/users.php';
			$user = new Users();
			$getdata = $user->get_users($arr_userdatalogin['username']);
			
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
	}else if($_POST['u-username'] == "Invitado" && $_POST['u-typeorder'] == 0){
		session_start();
		$getdata = [
			0 => [
				'username' => 'Invitado'
			]
		];
		$_SESSION['user_camel'] = $getdata[0];

		$res = array(
			'response' => 'true',
			'received' => $getdata[0]
		);
	}else{
		header("Location: ../");
	}

}else{
	$res = array(
		'response' => 'false'
	);
}
die(json_encode($res));