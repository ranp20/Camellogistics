<?php 
require_once '../models/db/connection.php';
class list_QuotationValues extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_quotation_values";
			$stm = $this->con->query($sql);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);

			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}

$quotationvalues = new list_QuotationValues();
echo $quotationvalues->list();