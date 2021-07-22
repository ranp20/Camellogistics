<?php 
	session_start();
	unset($_SESSION['admin_camel']);
	header("Location: ../");
?>