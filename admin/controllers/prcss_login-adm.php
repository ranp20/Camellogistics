<?php 
if(isset($_POST)){
	$arr_logiadm = [
		"email" => $_POST['loginadm'][0]['value'],
		"password" => $_POST['loginadm'][1]['value']
	];

	require_once 'c_login-adm.php';
	$login = new Login_Adm();
	$verify = $login->Login($arr_logiadm);

	if(!empty($verify)){

		require_once 'c_list-by-admin.php';

		$idadm = $verify[0]['id'];

		$user = new List_byIdAdmin();
		$getbyid = $user->list($idadm);

		if($getbyid > 0){
			session_start();
			$_SESSION['admin'] = $getbyid[0];
			
			$res = array(
				'response' => 'true'
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

}else{
	$res = array(
		'response' => 'false'
	);
}
die(json_encode($res));