<?php 
require_once '../../models/db/connection.php';
class Quotation_values extends Connection{
	function update(){
		$arr_quotationvalues = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"id" => $_POST['id']
		];

		try{
			$sql = "CALL sp_update_quotationvalue(:data_name, :data_value, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_quotationvalues as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$quotation_values = new Quotation_values();
echo $quotation_values->update();