<?php 
require_once '../../models/db/connection.php';
class Insurance_values_aduanas extends Connection{
	function update(){
		$arr_insurancevalues_aduanas = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"id" => $_POST['id']
		];
		try{
			$sql = "CALL sp_update_insurancevalue_aduanas(:data_name, :data_value, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_insurancevalues_aduanas as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$insurance_values = new Insurance_values_aduanas();
echo $insurance_values->update();