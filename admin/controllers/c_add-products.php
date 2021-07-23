<?php 
require_once '../../models/db/connection.php';
class Add_Products extends Connection{	
	function add(){
		print_r($_POST);
		exit();
		try{
			$sql = "CALL sp_add_product(:name)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":name", $name);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}
$products = new Add_Products();
echo $products->add();