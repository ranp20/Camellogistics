<?php 
require_once '../../models/db/connection.php';
class Quotation_values_FCL extends Connection{
	function update(){
		$arr_quotationvalues = [
			"data_name" => $_POST['data_name'],
			"data_value" => $_POST['data_value'],
			"data_value_prov" => $_POST['data_value_prov'],
			"id" => $_POST['id']
		];

		try{
			$sql = "CALL sp_update_quotationvalue_fcl(:data_name, :data_value, :data_value_prov, :id)";
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
$quotation_values_fcl = new Quotation_values_FCL();
echo $quotation_values_fcl->update();