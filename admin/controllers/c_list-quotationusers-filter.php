<?php
// if(isset($_POST) && count($_POST) > 0){
	$sql = "";
	$sql = "SELECT
						tquote.id,
						tquote.id_gencode,
						tquote.code_quote,
						tquote.u_login,
						tquote.f_type_service,
						tquote.f_type_transport,
						tquote.f_type_container,
						tquote.u_n_document,
						tquote.u_enterprise,
						tquote.u_telephone
				FROM tbl_quotation_user tquote ORDER BY tquote.id DESC";
	require_once 'connection.php';
	$stm = $con->prepare($sql);
	//$stm->bindValue("option", $option);
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
// 	header("Location: operaciones");
// }