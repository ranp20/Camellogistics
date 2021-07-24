<?php 
require_once '../../models/db/connection.php';
class Update_Product extends Connection{
	function update(){
		$arr_product = [
			"name" => $_POST['name'],
			"regulated" => $_POST['regulated'],
			"id_regulator" => $_POST['id_regulator'],
			"id_regulator_two" => $_POST['id_regulatortwo'],
			"id" => $_POST['id']
		];

		try{
			$sql = "CALL sp_update_product(:name, :regulated, :id_regulator, :id_regulator_two, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_product as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$product = new Update_Product();
echo $product->update();