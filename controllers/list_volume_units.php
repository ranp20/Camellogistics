<?php 

require_once '../models/db/connection.php';
class list_Volume_Units extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_volume_units";
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

$volume_units = new list_Volume_Units();
echo $volume_units->list();