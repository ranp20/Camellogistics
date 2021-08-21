<?php 
require_once '../../models/db/connection.php';
class List_Ids_rateFCL extends Connection{
	function list(){
		try{
			$sql = "SELECT id FROM tbl_rate_fcl";
			$stm = $this->con->query($sql);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);
		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}