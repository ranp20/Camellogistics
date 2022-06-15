<?php 
require_once '../models/db/connection.php';
class Validate_by_codegenrand extends Connection{
	function list(){
		$id_codegenrand = $_POST['id_codegenrand'];
		$code_quote = $_POST['code_quote'];
		try{
			$sql = "CALL sp_validateuser_genpdf(:id_codegenrand,:code_quote)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(':id_codegenrand', $id_codegenrand);
			$stm->bindValue(':code_quote', $code_quote);
			$stm->execute();
			$data = $stm->fetch(PDO::FETCH_ASSOC);
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$valid_codegenbyrand = new Validate_by_codegenrand();
echo $valid_codegenbyrand->list();