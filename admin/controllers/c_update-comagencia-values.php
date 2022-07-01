<?php 
require_once '../../models/db/connection.php';
class Agency_commission extends Connection{
	function update(){
		$arr_comagencia = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"id" => $_POST['id']
		];
		try{
			$sql = "CALL sp_update_comagencia(:data_name, :data_value, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_comagencia as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$agencycommission_values = new Agency_commission();
echo $agencycommission_values->update();