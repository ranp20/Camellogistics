<?php
require_once '../models/db/connection.php';
class list_puertoOriginLCL extends Connection{
	function list(){
		try{
			$sql = "SELECT tap.puerto_id as 'idpuerto', tap.puerto as 'puerto', tapa.pais_id as 'idpais', tapa.pais as 'pais' 
							FROM tbl_aq_puertos tap	INNER JOIN tbl_aq_paises tapa ON tap.pais_id = tapa.pais_id ORDER BY tap.puerto_id DESC";

			if(isset($_POST['searchList']) && $_POST['searchList'] != ""){
				//$search = $this->con->real_escape_string($_POST['searchList']);
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT tap.puerto_id as 'idpuerto', tap.puerto as 'puerto', tapa.pais_id as 'idpais', tapa.pais as 'pais' 
							FROM tbl_aq_puertos tap	INNER JOIN tbl_aq_paises tapa ON tap.pais_id = tapa.pais_id 
								WHERE tap.puerto LIKE '%".$search."%' OR
											tapa.pais LIKE '%".$search."%'
								ORDER BY puerto_id DESC";
			}

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
$puertoOrigin = new list_puertoOriginLCL();
echo $puertoOrigin->list();