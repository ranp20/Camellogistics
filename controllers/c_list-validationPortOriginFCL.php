<?php
require_once '../models/db/connection.php';
class list_validExistsByPortOriginFCL extends Connection{
	function list(){
		$portOrigin = $_POST['nameportOrigin'];
		$typetransport = $_POST['typetransport'];
		try{
			$sql = "CALL sp_list_validationPortOriginFCL(:namePortOrigin,:typetransport)";
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
$existspuertoOriginFCL = new list_validExistsByPortOriginFCL();
echo $existspuertoOriginFCL->list();