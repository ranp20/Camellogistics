<?php
session_start();
if(isset($_POST) && count($_POST) > 0){
	print_r($_POST);
	exit();

	
	
}else{
	header("Location: marketplace-logistico");
}