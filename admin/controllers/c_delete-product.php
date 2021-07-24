<?php 
require_once '../../models/db/connection.php';
class Delete_Product extends Connection{
	function delete(){
		$id = $_POST['id'];

		try{
			$sql = "DELETE FROM tbl_products WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$product = new Delete_Product();
echo $product->delete();