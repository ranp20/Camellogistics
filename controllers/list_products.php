<?php 
require_once '../models/db/connection.php';
class Products extends Connection{
	function list(){
		try{
			$sql = "SELECT
								tbp.id as 'id_prod',
								tbp.name as 'name_prod',
								tbp.sel_regulated,
								tbp.id_regulator,
								tbp.id_regulator_two,
								(SELECT tbr.name FROM tbl_regulators tbr WHERE tbr.id = tbp.id_regulator) as 'reguladorOne',
								(SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo',
								tbp.ad_valoren as 'ad_valoren',
								tbp.impuesto_selectivo as 'impuesto_selectivo',
								tbp.antidumping as 'antidumping',
								tbp.fichacert_min as 'fi_min',
								tbp.fichacert_max as 'fi_max',
								tbp.fichacert_quantity as 'fi_quantity'
							FROM tbl_products tbp
							ORDER BY tbp.id ASC";

			if(isset($_POST['searchList'])){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT
									tbp.id as 'id_prod',
									tbp.name as 'name_prod',
									tbp.sel_regulated,
									tbp.id_regulator,
									tbp.id_regulator_two,
									(SELECT tbr.name FROM tbl_regulators tbr WHERE tbr.id = tbp.id_regulator) as 'reguladorOne',
									(SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo',
									tbp.ad_valoren as 'ad_valoren',
									tbp.impuesto_selectivo as 'impuesto_selectivo',
									tbp.antidumping as 'antidumping',
									tbp.fichacert_min as 'fi_min',
									tbp.fichacert_max as 'fi_max',
									tbp.fichacert_quantity as 'fi_quantity'
								FROM tbl_products tbp
								WHERE tbp.name LIKE '%".$search."%' OR
											tbp.sel_regulated LIKE '%".$search."%'
								ORDER BY tbp.id ASC";
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