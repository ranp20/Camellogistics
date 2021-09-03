<?php 
require_once '../../models/db/connection.php';
class Utilities_rate_lcl_transport extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_utility_rate_lcl_transport";
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
$rate_lcl_transport = new Utilities_rate_lcl_transport();
echo $rate_lcl_transport->list();