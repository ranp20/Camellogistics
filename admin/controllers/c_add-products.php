<?php 
require_once '../../models/db/connection.php';
class Add_Products extends Connection{	
	function add(){
		$arr_product = [
			"name" => $_POST['name'],
			"regulate" => $_POST['regulate'],
			"id_regulator" => (isset($_POST['id_regulatorone'])) ? $_POST['id_regulatorone'] : 0,
			"id_regulator_two" => (isset($_POST['id_regulatortwo'])) ? $_POST['id_regulatortwo'] : 0
		];

		try{
			$sql = "CALL sp_add_product(:name, :regulate, :id_regulator, :id_regulator_two)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_product as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}
$products = new Add_Products();
echo $products->add();