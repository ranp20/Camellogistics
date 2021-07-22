<?php 
require_once '../../models/db/connection.php';
class Add_Regulator extends Connection{	
	function add(){
		$name = $_POST['name'];
		try{
			$sql = "CALL sp_add_regulator (:name)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":name", $name);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}
$add = new Add_Regulator();
echo $add->add();