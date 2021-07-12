<?php 
require_once '../models/db/connection.php';
class list_Type_Services extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_type_service";
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

$type_services = new list_Type_Services();
echo $type_services->list();