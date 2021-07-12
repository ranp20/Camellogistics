<?php 
require_once '../models/db/connection.php';
class list_Calculation_Data extends Connection{
	function list(){

		try{
			$sql = "SELECT tcd.id as 'id', tcd.packages as 'bultos', tcd.weight as 'peso', tcd.volume as 'volumen', tmu.prefix as 'prefijo'
							FROM tbl_calculation_data tcd	INNER JOIN tbl_mass_units tmu ON tcd.id_unit_mass = tmu.id ORDER BY tcd.id ASC";
			$stm = $this->con->query($sql);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);

			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}

$calculation_data = new list_Calculation_Data();
echo $calculation_data->list();