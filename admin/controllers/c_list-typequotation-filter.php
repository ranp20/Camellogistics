<?php 
require_once '../../models/db/connection.php';
class TypeQuotation_filter extends Connection{
	function list(){

		print_r($_POST);
		exit();
		$id_codegenrand = $_POST['id_codegenrand'];
		try{
			$sql = "CALL sp_list_type_quotation_filter(:id_codegenrand)";
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
$typequotation_codegen = new TypeQuotation_filter();
echo $typequotation_codegen->list();