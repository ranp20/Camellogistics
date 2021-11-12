<?php 
require_once '../models/db/connection.php';
class Update_Quotation_User extends Connection{
	function add(){

		print_r($_POST);
		exit();

		$arr_userquotation = [
			'codegenerate' => $_POST['codegenerate'],
			'u_login' => $_POST['u_login'],
			'f_type_op' => $_POST['f_type_op'],
		];

		try{
			$sql = "CALL sp_update_quotation_user()";
			$stm = $this->con->prepare($sql);
			foreach ($arr_userquotation as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();

			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$update_quotationuser = new Update_Quotation_User();
echo $update_quotationuser->add();