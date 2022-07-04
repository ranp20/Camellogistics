<?php 
require_once '../models/db/connection.php';
class list_quotationValues_lcl extends Connection{
	function list(){
		$requires_servs = $_POST['require_servs'];
		try{
			$sql = "CALL sp_list_quotation_values_lcl(:require_servs)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(':require_servs',$requires_servs);
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$quotationvalues_lcl = new list_quotationValues_lcl();
echo $quotationvalues_lcl->list();