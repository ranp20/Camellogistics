<?php 
require_once '../../models/db/connection.php';
class Other_values_com_agencia extends Connection{
	function list(){
		try{
			$sql = "CALL sp_list_other_values_com_agencia()";
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
$other_values_com_agencia = new Other_values_com_agencia();
echo $other_values_com_agencia->list();