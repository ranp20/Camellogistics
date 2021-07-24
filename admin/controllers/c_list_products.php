<?php 
require_once '../../models/db/connection.php';
class Products extends Connection{
	function list(){

		try{
			$sql = "SELECT
								tbp.id as 'id_prod',
								tbp.name as 'name_prod',
								tbp.regulated,
								tbp.id_regulator,
								tbp.id_regulator_two,
								(SELECT tbr.name FROM tbl_regulators tbr WHERE tbr.id = tbp.id_regulator) as 'reguladorOne',
								(SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo'
							FROM tbl_products tbp
							ORDER BY tbp.id DESC";

			if(isset($_POST['searchList'])){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT
									tbp.id as 'id_prod',
									tbp.name as 'name_prod',
									tbp.regulated,
									tbp.id_regulator,
									tbp.id_regulator_two,
									(SELECT tbr.name FROM tbl_regulators tbr WHERE tbr.id = tbp.id_regulator) as 'reguladorOne',
									(SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo'
								FROM tbl_products tbp
								WHERE tbp.id LIKE '%".$search."%' OR
											tbp.name LIKE '%".$search."%' OR
											tbp.regulated LIKE '%".$search."%'
								ORDER BY tbp.id DESC";
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

$products = new Products();
echo $products->list();