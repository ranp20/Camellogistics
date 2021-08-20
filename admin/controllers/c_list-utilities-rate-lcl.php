<?php 
require_once '../../models/db/connection.php';
class Utilities_rate_lcl extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_utility_rate_lcl";
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
$rate_lcl = new Utilities_rate_lcl();
echo $rate_lcl->list();