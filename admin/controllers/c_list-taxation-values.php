<?php 
require_once '../../models/db/connection.php';
class Taxation_values extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_taxation_values";
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
$taxation_values = new Taxation_values();
echo $taxation_values->list();