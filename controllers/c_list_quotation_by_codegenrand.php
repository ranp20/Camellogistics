<?php 
require_once '../models/db/connection.php';
class List_quotation_by_codegenrand extends Connection{
	function list(){
		$id_codegenrand = $_POST['id_codegenrand'];
		try{
			$sql = "CALL sp_list_quotation_by_codegenrand(:id_gencode)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(':id_gencode', $id_codegenrand);
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$codegenbyrand = new List_quotation_by_codegenrand();
echo $codegenbyrand->list();