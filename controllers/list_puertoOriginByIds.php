<?php 
require_once '../models/db/connection.php';
class list_puertoOriginById extends Connection{
	function list(){
		$arr_byidorigin = [
			"idpaisportOrigin" => $_POST['idpaisportOrigin'],
			"idportOrigin" => $_POST['idportOrigin']
		];
		try{
			$sql = "CALL sp_list_portOrigin_by_id(:idpaisportOrigin, :idportOrigin)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_byidorigin as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC); 
			$res = json_encode($data);
			echo $res;
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$puertoOrigin = new list_puertoOriginById();
echo $puertoOrigin->list();