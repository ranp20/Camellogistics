<?php 
require_once '../models/db/connection.php';
class list_rateByPortOriginLCL extends Connection{
	function list(){
		
		$portOrigin = $_POST['nameportOrigin'];
		$typetransport = $_POST['typetransport'];

		try{
			$sql = "CALL sp_list_rateByPortOriginLCL(:namePortOrigin,:typetransport)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":namePortOrigin", $portOrigin);
			$stm->bindValue(":typetransport", $typetransport);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);

			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$puertoOriginLCL = new list_rateByPortOriginLCL();
echo $puertoOriginLCL->list();