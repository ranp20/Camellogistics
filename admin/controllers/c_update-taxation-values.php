<?php 
require_once '../../models/db/connection.php';
class Taxation_values extends Connection{
	function update(){
		$arr_taxationvalues = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"data_valuetwo" => $_POST['data_valuetwo'],
			"id" => $_POST['id']
		];

		try{
			$sql = "CALL sp_update_taxation_values(:data_name, :data_value, :data_valuetwo, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_taxationvalues as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$taxation_values = new Taxation_values();
echo $taxation_values->update();