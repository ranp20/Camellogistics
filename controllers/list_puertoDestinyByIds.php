<?php 
require_once '../models/db/connection.php';
class list_puertoDestinyById extends Connection{
	function list(){
		$arr_byiddestiny = [
			"idpaisportDestiny" => $_POST['idpaisportDestiny'],
			"idportDestiny" => $_POST['idportDestiny']
		];
		try{
			$sql = "CALL sp_list_portDestiny_by_id(:idpaisportDestiny, :idportDestiny)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_byiddestiny as $key => $value) {
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
$puertoDestiny = new list_puertoDestinyById();
echo $puertoDestiny->list();