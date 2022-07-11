<?php
require_once '../models/db/connection.php';
class list_puertoOriginLCL extends Connection{
	function list(){
		try{
			$sql = "SELECT 
								trlcl.id,
								trlcl.country_origin as 'pais',
								trlcl.port_origin as 'puerto'
							FROM tbl_rate_lcl trlcl ORDER BY trlcl.port_origin ASC";

			if(isset($_POST['searchList']) && $_POST['searchList'] != ""){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT 
									trlcl.id,
									trlcl.country_origin as 'pais',
									trlcl.port_origin as 'puerto'
								FROM tbl_rate_lcl trlcl
								WHERE trlcl.country_origin LIKE '%".$search."%' OR
											trlcl.port_origin LIKE '%".$search."%'
								ORDER BY trlcl.port_origin ASC";
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