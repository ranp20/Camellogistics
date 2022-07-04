<?php 
require_once '../models/db/connection.php';
class list_Districs extends Connection{
	function list(){
		$id = $_POST['idpaisdestiny'];
		try{
			$sql = "SELECT tdist.id, tdist.name as 'distric',	tdist.id_province, tbp.name as 'province' 
							FROM tbl_distric tdist INNER JOIN tbl_province tbp ON tbp.id = tdist.id_province INNER JOIN tbl_aq_paises tbpai ON tbpai.pais_id = tbp.id_pais
							WHERE tbpai.pais_id = '".$id."' ORDER BY tdist.name ASC";

			if(isset($_POST['searchList'])){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT tdist.id, tdist.name as 'distric',	tdist.id_province, tbp.name as 'province' 
								FROM tbl_distric tdist INNER JOIN tbl_province tbp ON tbp.id = tdist.id_province INNER JOIN tbl_aq_paises tbpai ON tbpai.pais_id = tbp.id_pais 
								WHERE tdist.name LIKE '%".$search."%'
								AND tbpai.pais_id = '".$id."'
								ORDER BY tdist.name ASC";
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
$districs = new list_Districs();
echo $districs->list();