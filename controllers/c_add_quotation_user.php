<?php 
require_once '../models/db/connection.php';
class Add_Quotation_User extends Connection{
	function add($arr_userdata){

		try{
			$sql = "CALL sp_add_quotation_user(
			"ranppuntos20@gmail.com", 
			"TRANSPORTE MARÍTIMO", 
			"MARÍTIMO", 
			"CARGA GENERAL", 
			"SERVICES S.A.C.", 
			"990124256", 
			"TRANSPORTE MARÍTIMO", 
			"CARGA GENERAL", 
			"QINGDAO-CHINA", 
			"3000Kg/1.08CBM", 
			"30 Días", 
			"45000", 
			"1702.96", 
			"120.35", 
			"47329.26"
			)";
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