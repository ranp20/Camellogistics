<?php 
require_once '../models/db/connection.php';
class list_rateByPortOrigin extends Connection{
	function list(){
		
		$portOrigin = $_POST['nameportOrigin'];

		try{
			$sql = "CALL sp_list_rateByPortOrigin(:namePortOrigin)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":namePortOrigin", $portOrigin);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);

			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$puertoOrigin = new list_rateByPortOrigin();
echo $puertoOrigin->list();