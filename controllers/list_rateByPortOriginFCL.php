<?php 
require_once '../models/db/connection.php';
class list_rateByPortOriginFCL extends Connection{
	function list(){

		$portOrigin = $_POST['nameportOrigin'];
		$container = $_POST['container'];

		try{
			$sql = "CALL sp_list_rateByPortOriginFCL(:namePortOrigin,:container)";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":namePortOrigin", $portOrigin);
			$stm->bindValue(":container", $container);
			$stm->execute();
			
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);

			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$puertoOriginFCL = new list_rateByPortOriginFCL();
echo $puertoOriginFCL->list();