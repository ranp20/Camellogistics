<?php 
require_once '../../models/db/connection.php';
class List_byIdAdmin extends Connection{
	function list($email){
		try{
			$sql = "SELECT * FROM tbl_admin WHERE email = :email";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":email", $email);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}