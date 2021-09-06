<?php 
require_once '../models/db/connection.php';
class Add_Users extends Connection{
	function add($arr_userdata){

		try{
			$sql = "CALL sp_add_user(:username, :password)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_userdata as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}