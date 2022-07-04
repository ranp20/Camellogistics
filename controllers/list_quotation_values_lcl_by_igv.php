<?php 
require_once '../models/db/connection.php';
class list_QuotationValuesLCL_by_igv extends Connection{
	function list(){
		try{
			$sql = "CALL sp_list_quotation_values_lcl_by_igv()";
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
$quotationvalues = new list_QuotationValuesLCL_by_igv();
echo $quotationvalues->list();