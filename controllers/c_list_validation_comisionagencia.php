<?php 
require_once '../models/db/connection.php';
class list_Validation_comisionagencia extends Connection{
	function list(){
		try{
			$sql = "CALL sp_list_validation_comisionagencia()";
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
$validationcomagencia = new list_Validation_comisionagencia();
echo $validationcomagencia->list();