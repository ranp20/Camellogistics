<?php 
require_once '../../models/db/connection.php';
class Update_Regulator extends Connection{
	function update(){

		$arr_regulator = [
			"name" => $_POST['name'],
			"id" => $_POST['id']
		];

		try{
			$sql = "UPDATE tbl_regulators SET name = :name WHERE id = :id";
			$stm = $this->con->prepare($sql);
			foreach ($arr_regulator as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$regulator = new Update_Regulator();
echo $regulator->update();