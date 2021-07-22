<?php 
require_once '../../models/db/connection.php';
class Delete_Regulator extends Connection{
	function delete(){
		$id = $_POST['id'];

		try{
			$sql = "DELETE FROM tbl_regulators WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$regulator = new Delete_Regulator();
echo $regulator->delete();