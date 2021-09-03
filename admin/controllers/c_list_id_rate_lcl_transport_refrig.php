<?php 
require_once '../../models/db/connection.php';
class List_Ids_rateLCLTransport_refri extends Connection{
	function list(){
		try{
			$sql = "SELECT id FROM tbl_rate_lcl_transport_refrigerado";
			$stm = $this->con->query($sql);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);
		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}