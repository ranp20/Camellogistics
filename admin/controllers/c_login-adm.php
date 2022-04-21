<?php 
require_once '../../models/db/connection.php';
class Login_Adm extends Connection{
	function Login($arr_logiadm){
		try{
			$sql = "CALL sp_verify_admin(:email, :password)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_logiadm as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}