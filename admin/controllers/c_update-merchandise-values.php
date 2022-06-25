<?php 
require_once '../../models/db/connection.php';
class Merchandise_values extends Connection{
	function update(){
		$arr_merchandisevalues = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"id" => $_POST['id']
		];

		try{
			$sql = "CALL sp_update_merchandisevalue(:data_name, :data_value, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_merchandisevalues as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$merchandise_values = new Merchandise_values();
echo $merchandise_values->update();