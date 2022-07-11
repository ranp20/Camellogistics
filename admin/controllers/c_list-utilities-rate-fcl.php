<?php
// if(isset($_POST) && count($_POST) > 0){
	$sql = "";
	$sql = "SELECT 
						tufcl.id, 
						tufcl.utility, 
						tufcl.val_desde,
						tufcl.val_hasta
					FROM tbl_utility_rate_fcl tufcl ORDER BY tufcl.id ASC";

	require_once 'connection.php';
	$stm = $con->prepare($sql);
	$stm->execute();
	$data = $stm->fetchAll(PDO::FETCH_ASSOC);
	if(isset($data) && !empty($data)){
		foreach ($data as $key => $value){
			$res['data'][] = array_map("utf8_encode",$value);
		}
		$output = json_encode($res);
	}else{
		$data = null;
		$output = json_encode($data);
	}
	echo $output;

// }else{
// 	header("Location: productos");
// }