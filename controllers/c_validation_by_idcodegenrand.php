<?php 
require_once '../models/db/connection.php';
class Validate_by_codegenrand extends Connection{
	function list(){

		$id_codegenrand = $_POST['id_codegenrand'];
		try{
			$sql = "CALL sp_validateuser_genpdf(:id_codegenrand)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(':id_codegenrand', $id_codegenrand);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC);
			//return $data;
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$valid_codegenbyrand = new Validate_by_codegenrand();
echo $valid_codegenbyrand->list();