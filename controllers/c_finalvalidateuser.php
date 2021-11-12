<?php
session_start();
if(isset($_POST) && count($_POST) > 0){
	if($_SESSION['user_camel']['username'] != "Invitado"){
		
	}else{
		print_r($_POST);
		exit();
	}
}else{
	header("Location: marketplace-logistico");
}