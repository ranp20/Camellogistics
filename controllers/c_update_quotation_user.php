<?php 
require_once '../models/db/connection.php';
class Update_Quotation_User extends Connection{
	function update(){
		$arr_userquotation = [
			'id_gencoderand' => $_POST['id_gencoderand'],
			'code_quote' => $_POST['code_quote'],
			'ndoc_cli' => $_POST['ndoc_cli'],
			'name_enterprise_cli' => $_POST['name_enterprise_cli'],
			'telephone_cli' => $_POST['telephone_cli']
		];
		try{
			$sql = "CALL sp_update_quotation_user(:id_gencoderand,:code_quote,:ndoc_cli,:name_enterprise_cli,:telephone_cli)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_userquotation as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$update_quotationuser = new Update_Quotation_User();
echo $update_quotationuser->update();