<?php 
require_once '../models/db/connection.php';
class list_InsuranceValues_aduanas extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_insurance_values_aduanas";
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
$insurancevalues = new list_InsuranceValues_aduanas();
echo $insurancevalues->list();