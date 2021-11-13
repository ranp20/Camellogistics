<?php
session_start();
if(isset($_POST) && count($_POST) > 0){
	include 'c_generate-pdf.php';
}else{
	header("Location: marketplace-logistico");
}