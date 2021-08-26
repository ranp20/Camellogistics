<?php 
require_once '../../models/db/connection.php';
class Insurance_values extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_insurance_values";
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
$insurance_values = new Insurance_values();
echo $insurance_values->list();