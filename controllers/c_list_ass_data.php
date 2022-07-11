<?php 
require_once '../models/db/connection.php';
class List_asesor_data extends Connection{
	function list(){
		try{
			$sql = "CALL sp_list_asesor_data()";
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
$lts_asesordata = new List_asesor_data();
echo $lts_asesordata->list();