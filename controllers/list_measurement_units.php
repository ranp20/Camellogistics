<?php
require_once '../models/db/connection.php';
class list_Measurement_Units extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_measurement_units";
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
$measurement_units = new list_Measurement_Units();
echo $measurement_units->list();