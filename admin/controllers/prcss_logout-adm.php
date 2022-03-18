<?php 
	session_start();
	unset($_SESSION['admin_camel']);
	/*
	$cookie_expiration_time = time() - (10 * 365 * 24 * 60 * 60);
	setcookie("adm-email", json_encode($resadm_email), $cookie_expiration_time, '/', '', true, true);
	setcookie("adm-password", json_encode($resadm_pass), $cookie_expiration_time, '/', '', true, true);
	*/
	header("Location: ../");
?>