<?php
require_once '../models/db/connection.php';
class list_Mass_Units extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_mass_units";
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
$mass_units = new list_Mass_Units();
echo $mass_units->list();