<?php
require_once '../models/db/connection.php';
class list_puertoDestinyLCL extends Connection{
	function list(){
		try{
			$sql = "SELECT
								trlcl.id,
								tacountry.pais_id as 'pais_id',
								tacountry.pais as 'pais',
								trlcl.port_destiny as 'puerto'
							FROM tbl_rate_lcl trlcl
								INNER JOIN tbl_aq_puertos taport ON taport.puerto = trlcl.port_destiny
								INNER JOIN tbl_aq_paises tacountry ON tacountry.pais_id = taport.pais_id
							ORDER BY trlcl.id ASC LIMIT 1";

			if(isset($_POST['searchList']) && $_POST['searchList'] != ""){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT
									trlcl.id,
									tacountry.pais_id as 'pais_id',
									tacountry.pais as 'pais',
									trlcl.port_destiny as 'puerto'
								FROM tbl_rate_lcl trlcl
									INNER JOIN tbl_aq_puertos taport ON taport.puerto = trlcl.port_destiny
									INNER JOIN tbl_aq_paises tacountry ON tacountry.pais_id = taport.pais_id
								WHERE trlcl.port_destiny LIKE '%".$search."%'
								ORDER BY trlcl.id ASC LIMIT 1";
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
$puertoDestiny = new list_puertoDestinyLCL();
echo $puertoDestiny->list();