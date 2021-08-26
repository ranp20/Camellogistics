<?php 
require_once '../../models/db/connection.php';
class Insurance_values extends Connection{
	function update(){
		$arr_insurancevalues = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"id" => $_POST['id']
		];

		try{
			$sql = "CALL sp_update_insurancevalue(:data_name, :data_value, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_insurancevalues as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$insurance_values = new Insurance_values();
echo $insurance_values->update();