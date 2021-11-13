<?php 
require_once '../models/db/connection.php';
class Add_UnQuotation_User extends Connection{
	function add(){
		$arr_userquotation = [
			'id_gencoderand' => $_POST['id_gencoderand'],
			'code_quote' => $_POST['code_quote'],
			'ndoc_cli' => $_POST['ndoc_cli'],
			'name_enterprise_cli' => $_POST['name_enterprise_cli'],
			'telephone_cli' => $_POST['telephone_cli'],
			'email' => $_POST['email']
		];

		try{
			$sql = "CALL sp_add_unlogged_user(:id_gencoderand,:code_quote,:ndoc_cli,:name_enterprise_cli,:telephone_cli,:email)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_userquotation as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$add_unloggeduser = new Add_UnQuotation_User();
echo $add_unloggeduser->add();