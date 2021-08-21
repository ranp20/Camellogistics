<?php 
require_once '../../models/db/connection.php';
class Utilities_rate_fcl extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_utility_rate_fcl";
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
$rate_fcl = new Utilities_rate_fcl();
echo $rate_fcl->list();