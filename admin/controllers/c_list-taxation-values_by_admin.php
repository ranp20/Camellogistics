<?php 
require_once '../../models/db/connection.php';
class Taxation_values extends Connection{
	function list(){

		try{
			$sql = "CALL sp_list_taxation_values_by_admin()";
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
$taxation_values = new Taxation_values();
echo $taxation_values->list();