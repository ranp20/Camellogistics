<?php
// if(isset($_POST) && count($_POST) > 0){
	$sql = "";
	$sql = "SELECT 
						tulcltrans.id, 
						tulcltrans.utility
					FROM tbl_utility_rate_lcl_transport tulcltrans ORDER BY tulcltrans.id ASC";

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