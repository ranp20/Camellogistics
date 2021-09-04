<?php 
require_once '../models/db/connection.php';
class list_zonasrateLCLTransport_imo extends Connection{
	function list(){
		//$id = $_POST['idpaisdestiny'];

		try{
			$sql = "SELECT zona, total_1_a_1000, total_1001_a_2000, total_2001_a_3000, total_3001_a_4000, total_4001_a_5000, total_5001_a_7000,
											total_20st_40nor FROM tbl_rate_lcl_transport_imo";

			if(isset($_POST['searchList'])){
				//$search = $this->con->real_escape_string($_POST['searchList']);
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT zona, total_1_a_1000, total_1001_a_2000, total_2001_a_3000, total_3001_a_4000, total_4001_a_5000, total_5001_a_7000,
											total_20st_40nor FROM tbl_rate_lcl_transport_imo 
								WHERE zona LIKE '%".$search."%'
								ORDER BY zona ASC";
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
$ratelcltransport = new list_zonasrateLCLTransport_imo();
echo $ratelcltransport->list();