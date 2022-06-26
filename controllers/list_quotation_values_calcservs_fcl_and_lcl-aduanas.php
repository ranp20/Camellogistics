<?php 
require_once '../models/db/connection.php';
class list_QuotationValuesFclLcl extends Connection{
	function list(){
		try{
			$sql = "CALL sp_list_quotation_values_cal_servs_fcl_and_lcl_aduanas()";
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
$quotationvaluesfcllcl = new list_QuotationValuesFclLcl();
echo $quotationvaluesfcllcl->list();