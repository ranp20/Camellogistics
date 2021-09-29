<?php 
require_once '../models/db/connection.php';
class Add_Quotation_User extends Connection{
	function add($arr_userdata){

		try{
			$sql = "CALL sp_add_quotation_user()";
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