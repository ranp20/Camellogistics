<?php
require_once '../models/db/connection.php';
class Add_Calculation_Data extends Connection{
	function list(){
		$arr_addcalculation = [
			"packages" => $_POST['packages'],
			"weight" => $_POST['weight'],
			"volume" => $_POST['volume'],
			"id_unit_mass" => $_POST['id_unit_mass']
		];
		try{
			$sql = "CALL sp_calculation_data (:packages, :weight, :volume, :id_unit_mass)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_addcalculation as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$calculation_data = new Add_Calculation_Data();
echo $calculation_data->list();