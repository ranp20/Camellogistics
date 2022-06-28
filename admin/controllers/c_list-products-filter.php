<?php
// if(isset($_POST) && count($_POST) > 0){
	$sql = "";
	$sql = "SELECT tbp.id as 'id_prod', tbp.name as 'name_prod', tbp.regulated, tbp.id_regulator, tbp.id_regulator_two, (SELECT tbr.name FROM tbl_regulators tbr WHERE tbr.id = tbp.id_regulator) as 'reguladorOne', (SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo', tbp.amount_additional as 'montoadd',	tbp.ad_valoren as 'ad_valoren',	tbp.impuesto_selectivo as 'impuesto_selectivo',	tbp.antidumping as 'antidumping' FROM tbl_products tbp ORDER BY tbp.id DESC";

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