<?php 
require_once '../../models/db/connection.php';
class List_byIdAdmin extends Connection{
	
	function list($id){
		try{
			$sql = "SELECT * FROM tbl_admin WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}