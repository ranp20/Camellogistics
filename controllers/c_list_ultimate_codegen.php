<?php 
require_once '../models/db/connection.php';
class List_ultimate_codegen extends Connection{
	function list(){

		try{
			$sql = "CALL sp_list_ultimate_codegen()";
			$stm = $this->con->prepare($sql);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			//return $data;
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$codegen = new List_ultimate_codegen();
echo $codegen->list();