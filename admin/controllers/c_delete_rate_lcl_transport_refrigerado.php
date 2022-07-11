<?php 
require_once '../../models/db/connection.php';
class Delete_Rate_LCL_transport_refrigerado extends Connection{
	function delete(){
		try{
			$sql = "CALL sp_delete_all_rate_lcl_transport_refrigerado()";
			$stm = $this->con->prepare($sql);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}