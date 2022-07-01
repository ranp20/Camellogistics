<?php 
require_once '../../models/db/connection.php';
class Other_values_cert_conform extends Connection{
	function list(){
		try{
			$sql = "CALL sp_list_other_values_cert_conform()";
			$stm = $this->con->prepare($sql);
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$other_values_cert_conform = new Other_values_cert_conform();
echo $other_values_cert_conform->list();