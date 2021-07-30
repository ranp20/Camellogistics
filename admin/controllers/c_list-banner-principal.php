<?php 
require_once '../../models/db/connection.php';
class Banner_Principal extends Connection{
	function list(){

		try{
			$sql = "SELECT * FROM tbl_banner_principal";
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
$banner_p = new Banner_Principal();
echo $banner_p->list();