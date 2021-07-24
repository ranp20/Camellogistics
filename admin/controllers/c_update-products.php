<?php 
require_once '../../models/db/connection.php';
class List_ProductById extends Connection{
	function updatebyid(){
		$id = $_POST["id"];

		try{
			$sql = "SELECT * FROM tbl_products WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC);
			$res = json_encode($data);
			echo $res;

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$product = new List_ProductById();
echo $product->updatebyid();