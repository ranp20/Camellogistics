<?php 
require_once '../models/db/connection.php';
class list_zonasrateLCLTransport_refrigerado extends Connection{
	function list(){
		$id = $_POST['idpaisdestiny'];

		try{
			$sql = "SELECT 
								tbrtrefr.id,
								tbprov.`name` as 'province',
								tbrtrefr.zona, 
								tbrtrefr.total_1_a_1000 as 'refr_1_1000', 
								tbrtrefr.total_1001_a_2000 as 'refr_1001_2000', 
								tbrtrefr.total_2001_a_3000 as 'refr_2001_3000', 
								tbrtrefr.total_3001_a_4000 as 'refr_3001_4000', 
								tbrtrefr.total_4001_a_5000 as 'refr_4001_5000', 
								tbrtrefr.total_5001_a_7000 as 'refr_5001_7000',
								tbrtrefr.total_20st_40nor as 'refr_20st_40nor'
							FROM tbl_rate_lcl_transport_refrigerado tbrtrefr
							INNER JOIN tbl_distric tbdist ON tbrtrefr.zona = tbdist.`name`
							INNER JOIN tbl_province tbprov ON tbdist.id_province = tbprov.id
							INNER JOIN tbl_aq_paises tbaqpai ON tbprov.id_pais = tbaqpai.pais_id
							WHERE tbaqpai.pais_id = '".$id."'";

			if(isset($_POST['searchList'])){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT 
									tbrtrefr.id,
									tbprov.`name` as 'province',
									tbrtrefr.zona, 
									tbrtrefr.total_1_a_1000 as 'refr_1_1000', 
									tbrtrefr.total_1001_a_2000 as 'refr_1001_2000', 
									tbrtrefr.total_2001_a_3000 as 'refr_2001_3000', 
									tbrtrefr.total_3001_a_4000 as 'refr_3001_4000', 
									tbrtrefr.total_4001_a_5000 as 'refr_4001_5000', 
									tbrtrefr.total_5001_a_7000 as 'refr_5001_7000',
									tbrtrefr.total_20st_40nor as 'refr_20st_40nor'
								FROM tbl_rate_lcl_transport_refrigerado tbrtrefr
								INNER JOIN tbl_distric tbdist ON tbrtrefr.zona = tbdist.`name`
								INNER JOIN tbl_province tbprov ON tbdist.id_province = tbprov.id
								INNER JOIN tbl_aq_paises tbaqpai ON tbprov.id_pais = tbaqpai.pais_id 
																WHERE tbrtrefr.zona LIKE '%".$search."%'
																AND tbaqpai.pais_id = '".$id."'
																ORDER BY tbrtrefr.zona ASC";
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
$ratelcltransport = new list_zonasrateLCLTransport_refrigerado();
echo $ratelcltransport->list();