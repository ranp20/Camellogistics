<?php 
require_once '../../models/db/connection.php';
class Regulators extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_regulators ORDER BY id DESC";

			if(isset($_POST['searchList'])){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT * FROM tbl_regulators 
								WHERE id LIKE '%".$search."%' OR
											name LIKE '%".$search."%'
								ORDER BY id DESC";
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

$banks = new Regulators();
echo $banks->list();