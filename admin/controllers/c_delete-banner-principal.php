<?php 
require_once '../../models/db/connection.php';
class Delete_Banner_Principal extends Connection{
	function delete(){
		$id = $_POST['id'];

		try{
			$sql = "DELETE FROM tbl_banner_principal WHERE id = :id";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":id", $id);
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$banner_p = new Delete_Banner_Principal();
echo $banner_p->delete();