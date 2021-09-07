<?php 
require_once '../models/db/connection.php';
class Login_User extends Connection{
	function LoginU($arr_userdatalogin){
		try{
			$sql = "CALL sp_verify_user(:username, :password)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_userdatalogin as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}