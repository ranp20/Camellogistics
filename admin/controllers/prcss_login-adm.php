<?php 
if(isset($_POST) && count($_POST) > 0){
	$arr_logiadm = [
		"email" => $_POST['adm-log-email'],
		"password" => $_POST['adm-log-pass']
	];

	$chkrempass = (isset($_POST['adm-remem-pass'])) ? $_POST['adm-remem-pass'] : "";

	require_once 'c_login-adm.php';
	$login = new Login_Adm();
	$verify = $login->Login($arr_logiadm);

	if(!empty($verify) && $verify == "true"){
		require_once 'c_list-by-admin.php';

		$emailadm = $arr_logiadm['email'];

		$user = new List_byIdAdmin();
		$getbyemail = $user->list($emailadm);

		if(count($getbyemail) > 0){
			// INICIAR SESIÓN
			session_start();
			$_SESSION['admin_camel'] = $getbyemail[0];

			if($chkrempass == "on"){
				$resadm_email = $getbyemail[0]['email'];
				$resadm_pass = $getbyemail[0]['password'];
				
				// CREAR COOKIES
				$cookie_expiration_time = time() + (10 * 365 * 24 * 60 * 60); // COOKIE EXPIRA EN 10 AÑOS
				if(count($_COOKIE) > 0){
					setcookie("adm-email", json_encode($resadm_email), $cookie_expiration_time, '/', '', true, true);
					setcookie("adm-password", json_encode($resadm_pass), $cookie_expiration_time, '/', '', true, true);
			  }else{
			  	//echo "Cookies NO soportadas";
			  }
			}
			
			$res = array(
				'response' => 'true',
				'received' => $getbyemail[0]
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