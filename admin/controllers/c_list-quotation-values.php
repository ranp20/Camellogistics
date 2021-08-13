<?php 
require_once '../../models/db/connection.php';
class Quotation_values extends Connection{
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
$quotation_values = new Quotation_values();
echo $quotation_values->list();