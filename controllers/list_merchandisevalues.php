<?php 
require_once '../models/db/connection.php';
class list_MerchandiseValues extends Connection{
	function list(){
		try{
			$sql = "SELECT * FROM tbl_merchandise_values";
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
$merchandisevalues = new list_MerchandiseValues();
echo $merchandisevalues->list();