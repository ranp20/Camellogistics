<?php 
require_once '../../models/db/connection.php';
class Update_Banner_Principal extends Connection{
	function update(){

		$arr = [
			"imagen" => strtolower($_FILES['imagen']['name']),
			"id" => $_POST['id']
		];

		$arr_without_image = [
			"id" => $_POST['id']
		];

		try{
			$sql = "";
			if(!isset($_FILES['imagen']['tmp_name'])){
				$sql = "UPDATE tbl_banner_principal SET photo = :imagen WHERE id = :id";
				
				$stm = $this->con->prepare($sql);
				foreach ($arr_without_image as $key => $value) {
					$stm->bindValue($key, $value);
				}
				$stm->execute();
				$res = $stm->rowCount() > 0 ? "true" : "false";
				return $res;

			}else{

				$file_origin = $_FILES['imagen']['name'];
				$file_lowercase = strtolower($file_origin);
				$file_temp = $_FILES['imagen']['tmp_name'];
				$file_folder = "../views/assets/img/banner_principal/";

				if(move_uploaded_file($file_temp, $file_folder . $file_lowercase)){					
					$sql = "UPDATE tbl_banner_principal SET photo = :imagen WHERE id = :id";
					
					$stm = $this->con->prepare($sql);
					foreach ($arr as $key => $value) {
						$stm->bindValue($key, $value);
					}
					$stm->execute();
					$res = $stm->rowCount() > 0 ? "true" : "false";
					return $res;
					
				}else{
					echo "Error fatal";
				}
			}

			echo $res;

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}

$banner_p = new Update_Banner_Principal();
echo $banner_p->update();