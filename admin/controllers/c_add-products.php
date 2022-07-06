<?php 
require_once '../../models/db/connection.php';
class Add_Products extends Connection{	
	function add(){
		$arr_product = [
			"name" => $_POST['name'],
			"sel_regulated" => $_POST['sel_regulated'],
			"sel_taxadditional" => $_POST['sel_taxadditional'],
			"sel_fichatecycertconform" => $_POST['sel_fichatecycertconform'],
			"id_regulator" => (isset($_POST['id_regulatorone'])) ? $_POST['id_regulatorone'] : 0,
			"id_regulator_two" => (isset($_POST['id_regulatortwo'])) ? $_POST['id_regulatortwo'] : 0,
			"ad_valoren" => (isset($_POST['ad_valoren']) && $_POST['ad_valoren'] != "" && $_POST['ad_valoren'] != "undefined") ? $_POST['ad_valoren'] : 0,
			"impuesto_selectivo" => (isset($_POST['impuesto_selectivo']) && $_POST['impuesto_selectivo'] != "" && $_POST['impuesto_selectivo'] != "undefined") ? $_POST['impuesto_selectivo'] : 0,
			"antidumping" => (isset($_POST['antidumping']) && $_POST['antidumping'] != "" && $_POST['antidumping'] != "undefined") ? $_POST['antidumping'] : 0,
			"fichacert_min" => (isset($_POST['fichacert_min']) && $_POST['fichacert_min'] != "" && $_POST['fichacert_min'] != "undefined") ? $_POST['fichacert_min'] : 0,
			"fichacert_max" => (isset($_POST['fichacert_max']) && $_POST['fichacert_max'] != "" && $_POST['fichacert_max'] != "undefined") ? $_POST['fichacert_max'] : 0,
			"fichacert_quantity" => (isset($_POST['fichacert_quantity']) && $_POST['fichacert_quantity'] != "" && $_POST['fichacert_quantity'] != "undefined") ? $_POST['fichacert_quantity'] : 0
		];
		try{
			$sql = "CALL sp_add_product(:name, :sel_regulated, :sel_taxadditional, :sel_fichatecycertconform, :id_regulator, :id_regulator_two, :ad_valoren, :impuesto_selectivo, :antidumping, :fichacert_min, :fichacert_max, :fichacert_quantity)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_product as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}
$products = new Add_Products();
echo $products->add();