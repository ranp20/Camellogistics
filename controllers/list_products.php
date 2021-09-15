<?php 
require_once '../models/db/connection.php';
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
								(SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo',
								tbp.amount_additional as 'montoadd',
								tbp.id_taxation as 'id_taxation',
								tbp.id_taxation_two as 'id_taxation_two',
								tbp.id_taxation_three as 'id_taxation_three',
								(SELECT tbtx.data_name FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation) as 'impuestoOne',
								(SELECT tbtx.data_name FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_two) as 'impuestoTwo',
								(SELECT tbtx.data_name FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_three) as 'impuestoThree',
								(SELECT tbtx.data_value FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation) as 'valtaxOne',
								(SELECT tbtx.data_value FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_two) as 'valtaxTwo',
								(SELECT tbtx.data_value FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_three) as 'valtaxThree'
							FROM tbl_products tbp
							ORDER BY tbp.id ASC";

			if(isset($_POST['searchList'])){
				$search = addslashes($_POST['searchList']);
				$sql = "SELECT
									tbp.id as 'id_prod',
									tbp.name as 'name_prod',
									tbp.regulated,
									tbp.id_regulator,
									tbp.id_regulator_two,
									(SELECT tbr.name FROM tbl_regulators tbr WHERE tbr.id = tbp.id_regulator) as 'reguladorOne',
									(SELECT tbrtwo.name FROM tbl_regulators tbrtwo WHERE tbrtwo.id = tbp.id_regulator_two) as 'reguladorTwo',
									tbp.amount_additional as 'montoadd',
									tbp.id_taxation as 'id_taxation',
									tbp.id_taxation_two as 'id_taxation_two',
									tbp.id_taxation_three as 'id_taxation_three',
									(SELECT tbtx.data_name FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation) as 'impuestoOne',
									(SELECT tbtx.data_name FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_two) as 'impuestoTwo',
									(SELECT tbtx.data_name FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_three) as 'impuestoThree',
									(SELECT tbtx.data_value FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation) as 'valtaxOne',
									(SELECT tbtx.data_value FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_two) as 'valtaxTwo',
									(SELECT tbtx.data_value FROM tbl_taxation_values tbtx WHERE tbtx.id = tbp.id_taxation_three) as 'valtaxThree'
								FROM tbl_products tbp
								WHERE tbp.name LIKE '%".$search."%' OR
											tbp.regulated LIKE '%".$search."%'
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