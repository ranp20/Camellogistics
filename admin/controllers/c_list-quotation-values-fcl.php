<?php 
require_once '../../models/db/connection.php';
class Quotation_values_FCL extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_quotation_values_fcl";
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
$quotation_values_fcl = new Quotation_values_FCL();
echo $quotation_values_fcl->list();