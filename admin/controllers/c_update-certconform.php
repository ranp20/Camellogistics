<?php 
require_once '../../models/db/connection.php';
class Certificate_conform extends Connection{
	function update(){
		$arr_certiconform = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"id" => $_POST['id']
		];
		try{
			$sql = "CALL sp_update_certconform(:data_name, :data_value, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_certiconform as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$certiconform_values = new Certificate_conform();
echo $certiconform_values->update();