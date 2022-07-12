<?php
require_once '../models/db/connection.php';
class list_validAmmountByTypeTransport extends Connection{
	function list(){
		$portOrigin = $_POST['nameportOrigin'];
		$typetransport = $_POST['typetransport'];
		try{
			$sql = "CALL sp_list_validationAmmountTypeTransport(:namePortOrigin,:typetransport)";
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
$valid_ammounttypetrans = new list_validAmmountByTypeTransport();
echo $valid_ammounttypetrans->list();