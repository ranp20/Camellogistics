<?php 
require_once '../models/db/connection.php';
class list_Type_Containers extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_type_container";
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

$type_containers = new list_Type_Containers();
echo $type_containers->list();