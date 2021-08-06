<?php 
if(isset($_POST)){
	$arr_data = [
		"idportOrigin" => $_POST['idportOrigin'],
		"idcountryportOrigin" => $_POST['idcountryportOrigin'],
		"idportDestiny" => $_POST['idportDestiny'],
		"idcountryportDestiny" => $_POST['idcountryportDestiny'],
	];
	$response = $arr_data;
}else{
	$response = $arr_data;
}
die(json_encode($response));