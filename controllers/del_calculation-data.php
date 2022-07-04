<?php 
require_once '../models/db/connection.php';
class Delete extends Connection{
	function Del_Calculation_data(){
		$id = $_POST['id'];
		try{
			$sql = "DELETE FROM tbl_calculation_data WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";
		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$delete = new Delete();
echo $delete->Del_Calculation_data();